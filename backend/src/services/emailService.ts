import nodemailer, { SendMailOptions, Transporter } from 'nodemailer';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { logger } from '../utils/logger';

interface EmailOptions {
  to: string | string[];
  subject: string;
  templateName: string;
  templateData: Record<string, unknown>;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: SendMailOptions['attachments'];
  replyTo?: string;
}

export interface EmailResult {
  success: boolean;
  status: 'sent' | 'failed' | 'not-configured';
  attempts: number;
  messageId?: string;
  sentAt?: Date;
  error?: string;
}


const positiveInteger = (value: string | undefined, fallback: number): number => {
  const parsed = Number.parseInt(value || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
};

export interface EmailHealthStatus {
  configured: boolean;
  connected: boolean;
  status: 'connected' | 'unavailable' | 'not-configured';
  checkedAt: string;
}

class EmailService {
  private transporter: Transporter | null = null;
  private readonly maxRetries = positiveInteger(process.env.EMAIL_MAX_ATTEMPTS, 3);
  private readonly retryDelay = positiveInteger(process.env.EMAIL_RETRY_DELAY_MS, 1200);
  private healthCache: { expiresAt: number; value: EmailHealthStatus } | null = null;

  isConfigured(): boolean {
    return Boolean(process.env.SMTP_USER && process.env.SMTP_PASS);
  }

  private getTransporter(): Transporter {
    if (!this.transporter) {
      const host = process.env.SMTP_HOST || 'smtp.gmail.com';
      const port = positiveInteger(process.env.SMTP_PORT, 587);
      const secure = process.env.SMTP_SECURE === 'true';

      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user: process.env.SMTP_USER || '',
          pass: process.env.SMTP_PASS || '',
        },
        pool: true,
        maxConnections: 3,
        maxMessages: 75,
        connectionTimeout: 15000,
        greetingTimeout: 10000,
        socketTimeout: 30000,
        disableFileAccess: true,
        disableUrlAccess: true,
      });
    }
    return this.transporter;
  }

  private templateDirectories(): string[] {
    return [
      path.join(__dirname, '../templates'),
      path.join(process.cwd(), 'backend', 'dist', 'templates'),
      path.join(process.cwd(), 'backend', 'src', 'templates'),
      path.join(process.cwd(), 'dist', 'templates'),
      path.join(process.cwd(), 'src', 'templates'),
      path.join(process.cwd(), 'templates'),
    ];
  }

  private loadTemplate(templateName: string): { html: string; text: string } {
    const candidates = this.templateDirectories();
    const templatesDir = candidates.find((candidate) => fs.existsSync(candidate));

    if (!templatesDir) {
      logger.error('Email templates directory was not found', { templateName, candidates });
      return { html: '', text: '' };
    }

    const htmlPath = path.join(templatesDir, `${templateName}.hbs`);
    const textPath = path.join(templatesDir, `${templateName}.txt.hbs`);

    return {
      html: fs.existsSync(htmlPath) ? fs.readFileSync(htmlPath, 'utf-8') : '',
      text: fs.existsSync(textPath) ? fs.readFileSync(textPath, 'utf-8') : '',
    };
  }

  private renderTemplate(template: string, data: Record<string, unknown>): string {
    return Handlebars.compile(template, { noEscape: false })(data);
  }

  private safeError(error: unknown): string {
    const raw = error instanceof Error ? error.message : String(error);
    const smtpPass = process.env.SMTP_PASS;
    const smtpUser = process.env.SMTP_USER;
    let sanitized = raw;
    if (smtpPass) sanitized = sanitized.split(smtpPass).join('[redacted]');
    if (smtpUser) sanitized = sanitized.split(smtpUser).join('[smtp-user]');
    return sanitized.slice(0, 900);
  }

  async sendEmail(options: EmailOptions): Promise<EmailResult> {
    if (!this.isConfigured()) {
      logger.warn('Email service not configured - SMTP credentials missing');
      return {
        success: false,
        status: 'not-configured',
        attempts: 0,
        error: 'Email service not configured',
      };
    }

    const { html: htmlTemplate, text: textTemplate } = this.loadTemplate(options.templateName);
    if (!htmlTemplate && !textTemplate) {
      const error = `Email template not found: ${options.templateName}`;
      logger.error(error);
      return { success: false, status: 'failed', attempts: 0, error };
    }

    const htmlBody = htmlTemplate
      ? this.renderTemplate(htmlTemplate, options.templateData)
      : undefined;
    const textBody = textTemplate
      ? this.renderTemplate(textTemplate, options.templateData)
      : undefined;

    const mailOptions: SendMailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Ecatu Ronald Portfolio'}" <${process.env.SMTP_USER}>`,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: htmlBody,
      text: textBody,
      cc: options.cc,
      bcc: options.bcc,
      attachments: options.attachments,
      replyTo: options.replyTo,
      headers: {
        'X-Entity-Ref-ID': `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      },
    };

    let lastError = 'Unknown email delivery error';

    for (let attempt = 1; attempt <= this.maxRetries; attempt += 1) {
      try {
        const info = await this.getTransporter().sendMail(mailOptions);
        const sentAt = new Date();
        logger.info('Email sent successfully', {
          messageId: info.messageId,
          to: options.to,
          subject: options.subject,
          attempt,
        });
        this.healthCache = null;
        return {
          success: true,
          status: 'sent',
          attempts: attempt,
          messageId: String(info.messageId),
          sentAt,
        };
      } catch (error) {
        lastError = this.safeError(error);
        logger.warn('Email delivery attempt failed', {
          attempt,
          maxRetries: this.maxRetries,
          to: options.to,
          subject: options.subject,
          error: lastError,
        });

        if (attempt < this.maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, this.retryDelay * attempt));
        }
      }
    }

    this.healthCache = null;
    logger.error('Email send failed after retries', {
      to: options.to,
      subject: options.subject,
      attempts: this.maxRetries,
      error: lastError,
    });

    return {
      success: false,
      status: 'failed',
      attempts: this.maxRetries,
      error: lastError,
    };
  }

  async sendContactConfirmation(data: {
    referenceNumber: string;
    name: string;
    email: string;
    enquiryType: string;
    subject: string;
    message: string;
    submittedAt: Date | string;
  }): Promise<EmailResult> {
    return this.sendEmail({
      to: data.email,
      subject: `Message received · ${data.referenceNumber} · ${data.subject}`,
      templateName: 'contact-confirmation',
      templateData: {
        ...data,
        submittedAt: new Date(data.submittedAt).toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Africa/Kampala',
        }),
        year: new Date().getFullYear(),
        siteUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
      },
      replyTo: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
    });
  }

  async sendAdminNotification(data: {
    submissionId: string;
    referenceNumber: string;
    name: string;
    email: string;
    phone?: string;
    enquiryType: string;
    subject: string;
    message: string;
    submittedAt: Date | string;
  }): Promise<EmailResult> {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER || '';
    const siteUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const encodedSubject = encodeURIComponent(`Re: ${data.subject} [${data.referenceNumber}]`);

    return this.sendEmail({
      to: adminEmail,
      subject: `New enquiry · ${data.referenceNumber} · ${data.subject}`,
      templateName: 'admin-notification',
      replyTo: data.email,
      templateData: {
        ...data,
        phone: data.phone || 'Not provided',
        submittedAt: new Date(data.submittedAt).toLocaleString('en-GB', {
          weekday: 'long',
          day: '2-digit',
          month: 'long',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Africa/Kampala',
        }),
        year: new Date().getFullYear(),
        adminUrl: `${siteUrl}/admin/contacts?contact=${encodeURIComponent(data.submissionId)}`,
        replyUrl: `mailto:${data.email}?subject=${encodedSubject}`,
        siteUrl,
      },
    });
  }

  async sendNewsletterConfirmation(data: {
    email: string;
    name?: string;
    unsubscribeToken: string;
  }): Promise<EmailResult> {
    return this.sendEmail({
      to: data.email,
      subject: 'Subscription confirmed · Ecatu Ronald engineering field notes',
      templateName: 'newsletter-subscription',
      templateData: {
        name: data.name || 'Subscriber',
        email: data.email,
        unsubscribeUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?token=${data.unsubscribeToken}`,
        year: new Date().getFullYear(),
        siteUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
      },
    });
  }

  async sendBlogNotification(data: {
    post: { title: string; slug: string; excerpt: string; featuredImage?: string };
    subscribers: Array<{ email: string; name?: string; unsubscribeToken: string }>;
  }): Promise<void> {
    const results = await Promise.allSettled(
      data.subscribers.map((subscriber) =>
        this.sendEmail({
          to: subscriber.email,
          subject: `New publication · ${data.post.title}`,
          templateName: 'blog-notification',
          templateData: {
            name: subscriber.name || 'Reader',
            postTitle: data.post.title,
            postExcerpt: data.post.excerpt,
            postUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/blog/${data.post.slug}`,
            featuredImage: data.post.featuredImage,
            unsubscribeUrl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?token=${subscriber.unsubscribeToken}`,
            year: new Date().getFullYear(),
          },
        })
      )
    );

    const failed = results.filter(
      (result) => result.status === 'rejected' || !result.value.success
    ).length;
    if (failed > 0) {
      logger.warn(`Blog notification: ${failed}/${data.subscribers.length} emails failed`);
    }
  }

  async verifyConnection(force = false): Promise<EmailHealthStatus> {
    const now = Date.now();
    if (!force && this.healthCache && this.healthCache.expiresAt > now) {
      return this.healthCache.value;
    }

    if (!this.isConfigured()) {
      const value: EmailHealthStatus = {
        configured: false,
        connected: false,
        status: 'not-configured',
        checkedAt: new Date().toISOString(),
      };
      this.healthCache = { value, expiresAt: now + 60_000 };
      return value;
    }

    try {
      await this.getTransporter().verify();
      const value: EmailHealthStatus = {
        configured: true,
        connected: true,
        status: 'connected',
        checkedAt: new Date().toISOString(),
      };
      this.healthCache = { value, expiresAt: now + 300_000 };
      return value;
    } catch (error) {
      logger.warn('SMTP verification failed', { error: this.safeError(error) });
      const value: EmailHealthStatus = {
        configured: true,
        connected: false,
        status: 'unavailable',
        checkedAt: new Date().toISOString(),
      };
      this.healthCache = { value, expiresAt: now + 60_000 };
      return value;
    }
  }
}

export const emailService = new EmailService();
