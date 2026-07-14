import crypto from 'crypto';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { emailService, EmailResult } from '../services/emailService';
import {
  contactStore,
  ContactRecord,
  DeliveryResultUpdate,
} from '../services/contactStore';
import {
  ContactStatus,
  DeliveryChannel,
  EmailDeliveryStatus,
} from '../models/ContactSubmission';
import { sendSuccess, sendError } from '../utils/apiResponse';
import { logger } from '../utils/logger';
import { sanitizeOptionalString, sanitizeString } from '../utils/sanitize';
import { createContactReference } from '../utils/contactReference';

const VALID_STATUSES: ContactStatus[] = ['new', 'read', 'replied', 'archived'];
const VALID_EMAIL_STATUSES: EmailDeliveryStatus[] = [
  'pending',
  'sent',
  'partial',
  'not-configured',
  'failed',
];
const VALID_DELIVERY_CHANNELS: Array<DeliveryChannel | 'both'> = [
  'confirmation',
  'admin',
  'both',
];

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

const deliveryUpdate = (result: EmailResult): DeliveryResultUpdate => ({
  status: result.status,
  attempts: result.attempts,
  messageId: result.messageId,
  sentAt: result.sentAt,
  lastAttemptAt: new Date(),
  lastError: result.success ? undefined : result.error,
});

const sendConfirmation = (contact: ContactRecord): Promise<EmailResult> =>
  emailService.sendContactConfirmation({
    referenceNumber: contact.referenceNumber,
    name: contact.name,
    email: contact.email,
    enquiryType: contact.enquiryType,
    subject: contact.subject,
    message: contact.message,
    submittedAt: contact.createdAt,
  });

const sendAdminNotification = (contact: ContactRecord): Promise<EmailResult> =>
  emailService.sendAdminNotification({
    submissionId: contact._id,
    referenceNumber: contact.referenceNumber,
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
    enquiryType: contact.enquiryType,
    subject: contact.subject,
    message: contact.message,
    submittedAt: contact.createdAt,
  });

const processInitialEmailDelivery = async (contact: ContactRecord): Promise<void> => {
  try {
    const [confirmation, admin] = await Promise.all([
      sendConfirmation(contact),
      sendAdminNotification(contact),
    ]);

    await contactStore.updateDeliveryResults(contact._id, {
      confirmation: deliveryUpdate(confirmation),
      admin: deliveryUpdate(admin),
    });

    if (!admin.success) {
      logger.warn('Admin notification email was not delivered', {
        submissionId: contact._id,
        referenceNumber: contact.referenceNumber,
        status: admin.status,
      });
    }
  } catch (error) {
    logger.error('Contact email workflow failed', {
      submissionId: contact._id,
      referenceNumber: contact.referenceNumber,
      error,
    });
  }
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
    const referenceNumber = createContactReference();

    const submission = await contactStore.create({
      referenceNumber,
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

    // The message is stored first. Delivery runs after persistence and is tracked separately.
    void processInitialEmailDelivery(submission);

    sendSuccess(
      res,
      {
        id: submission._id,
        referenceNumber: submission.referenceNumber,
        storage: contactStore.storageMode(),
        emailDelivery: 'processing',
      },
      'Your message was received securely. Keep the reference number for follow-up.',
      201
    );
  } catch (error) {
    logger.error('Contact submission error:', error);
    sendError(res, 'The server could not save your message. Please try again or contact me directly.', 500);
  }
};

export const listContacts = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Math.max(1, parseInt((req.query.page as string) || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt((req.query.limit as string) || '20', 10)));

    const requestedStatus = req.query.status as string | undefined;
    const status = requestedStatus && VALID_STATUSES.includes(requestedStatus as ContactStatus)
      ? requestedStatus as ContactStatus
      : undefined;

    const requestedEmailStatus = req.query.emailStatus as string | undefined;
    const emailStatus = requestedEmailStatus
      && VALID_EMAIL_STATUSES.includes(requestedEmailStatus as EmailDeliveryStatus)
      ? requestedEmailStatus as EmailDeliveryStatus
      : undefined;

    const search = sanitizeOptionalString(req.query.search as string | undefined)?.slice(0, 120);
    const enquiryType = sanitizeOptionalString(req.query.enquiryType as string | undefined)?.slice(0, 80);

    const { contacts, total } = await contactStore.list({
      page,
      limit,
      status,
      emailStatus,
      search,
      enquiryType,
    });

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

export const getContactStats = async (_req: Request, res: Response): Promise<void> => {
  try {
    const stats = await contactStore.stats();
    sendSuccess(res, stats, 'Contact statistics retrieved');
  } catch (error) {
    logger.error('Contact statistics error:', error);
    sendError(res, 'Failed to retrieve contact statistics', 500);
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

export const resendContactEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const requestedChannel = (req.body.channel || 'both') as DeliveryChannel | 'both';

    if (!VALID_DELIVERY_CHANNELS.includes(requestedChannel)) {
      sendError(res, 'Invalid delivery channel', 400);
      return;
    }

    const contact = await contactStore.getById(id);
    if (!contact) {
      sendError(res, 'Contact not found', 404);
      return;
    }

    const updates: Partial<Record<DeliveryChannel, DeliveryResultUpdate>> = {};
    const response: Record<string, Pick<EmailResult, 'success' | 'status' | 'attempts' | 'messageId' | 'error'>> = {};

    if (requestedChannel === 'confirmation' || requestedChannel === 'both') {
      const confirmation = await sendConfirmation(contact);
      updates.confirmation = deliveryUpdate(confirmation);
      response.confirmation = confirmation;
    }

    if (requestedChannel === 'admin' || requestedChannel === 'both') {
      const admin = await sendAdminNotification(contact);
      updates.admin = deliveryUpdate(admin);
      response.admin = admin;
    }

    const updated = await contactStore.updateDeliveryResults(id, updates);
    sendSuccess(
      res,
      {
        contact: updated,
        delivery: response,
      },
      'Email delivery attempt completed'
    );
  } catch (error) {
    logger.error('Resend contact email error:', error);
    sendError(res, 'Email delivery could not be completed', 500);
  }
};
