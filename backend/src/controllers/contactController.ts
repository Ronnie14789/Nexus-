import crypto from 'crypto';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { emailService } from '../services/emailService';
import { contactStore } from '../services/contactStore';
import { ContactStatus, EmailDeliveryStatus } from '../models/ContactSubmission';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { logger } from '../utils/logger';
import { sanitizeOptionalString, sanitizeString } from '../utils/sanitize';

const VALID_STATUSES: ContactStatus[] = ['new', 'read', 'replied', 'archived'];

const hashIpAddress = (ipAddress?: string): string | undefined => {
  if (!ipAddress) return undefined;
  const salt = process.env.IP_HASH_SALT || process.env.JWT_SECRET || 'portfolio-contact';
  return crypto.createHash('sha256').update(`${salt}:${ipAddress}`).digest('hex');
};

const looksLikeBot = (companyWebsite: unknown, startedAt: unknown): boolean => {
  if (typeof companyWebsite === 'string' && companyWebsite.trim().length > 0) return true;
  if (typeof startedAt !== 'number' || !Number.isFinite(startedAt)) return true;
  const elapsed = Date.now() - startedAt;
  return elapsed < 1800 || elapsed < 0;
};

export const submitContact = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    sendError(res, 'Please review the highlighted form fields.', 422, JSON.stringify(errors.array()));
    return;
  }

  // Return a normal-looking success to automated spam without storing anything.
  if (looksLikeBot(req.body.companyWebsite, req.body.startedAt)) {
    logger.info('Contact submission filtered by anti-spam checks');
    sendSuccess(res, { received: true }, 'Your message has been received.', 201);
    return;
  }

  try {
    const name = sanitizeString(req.body.name);
    const email = sanitizeString(req.body.email).toLowerCase();
    const phone = sanitizeOptionalString(req.body.phone);
    const enquiryType = sanitizeString(req.body.enquiryType);
    const subject = sanitizeString(req.body.subject);
    const message = sanitizeString(req.body.message);
    const userAgent = sanitizeOptionalString(req.get('User-Agent'))?.slice(0, 500);

    const submission = await contactStore.create({
      name,
      email,
      phone,
      enquiryType,
      subject,
      message,
      consentAt: new Date(),
      ipHash: hashIpAddress(req.ip),
      userAgent,
    });

    Promise.allSettled([
      emailService.sendContactConfirmation({ name, email, enquiryType, subject, message }),
      emailService.sendAdminNotification({ name, email, phone, enquiryType, subject, message }),
    ]).then(async ([confirmResult, adminResult]) => {
      const confirmationSent = confirmResult.status === 'fulfilled' && confirmResult.value.success;
      const adminSent = adminResult.status === 'fulfilled' && adminResult.value.success;
      const anyNotConfigured = [confirmResult, adminResult].some(
        (result) => result.status === 'fulfilled' && result.value.error === 'Email service not configured'
      );

      let emailStatus: EmailDeliveryStatus = 'failed';
      if (confirmationSent && adminSent) emailStatus = 'sent';
      else if (confirmationSent || adminSent) emailStatus = 'partial';
      else if (anyNotConfigured) emailStatus = 'not-configured';

      await contactStore
        .updateEmailStatus(submission._id.toString(), confirmationSent || adminSent, emailStatus)
        .catch((error) => logger.warn('Could not update contact email status', { error }));

      if (!adminSent) {
        logger.warn('Admin notification email was not delivered', {
          submissionId: submission._id,
          emailStatus,
        });
      }
    }).catch((error) => logger.error('Contact email workflow failed', { error }));

    sendSuccess(
      res,
      {
        id: submission._id,
        storage: contactStore.storageMode(),
      },
      'Your message was received by the portfolio server. I will respond as soon as possible.',
      201
    );
  } catch (error) {
    logger.error('Contact submission error:', error);
    sendError(res, 'The server could not save your message. Please try again or contact me directly.', 500);
  }
};

export const listContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt((req.query['page'] as string) || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt((req.query['limit'] as string) || '20', 10)));
    const requestedStatus = req.query['status'] as string | undefined;
    const status = requestedStatus && VALID_STATUSES.includes(requestedStatus as ContactStatus)
      ? requestedStatus as ContactStatus
      : undefined;

    const { contacts, total } = await contactStore.list({ page, limit, status });

    sendSuccess(res, contacts, 'Contacts retrieved', 200, {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      storage: contactStore.storageMode(),
    });
  } catch (error) {
    logger.error('List contacts error:', error);
    sendError(res, 'Failed to retrieve contacts', 500);
  }
};

export const updateContactStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const status = req.body.status as ContactStatus;

    if (!VALID_STATUSES.includes(status)) {
      sendError(res, 'Invalid status', 400);
      return;
    }

    const contact = await contactStore.updateStatus(id, status);

    if (!contact) {
      sendError(res, 'Contact not found', 404);
      return;
    }

    sendSuccess(res, contact, 'Status updated');
  } catch (error) {
    logger.error('Update contact status error:', error);
    sendError(res, 'Failed to update status', 500);
  }
};
