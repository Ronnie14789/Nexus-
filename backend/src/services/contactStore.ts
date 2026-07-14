import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import mongoose from 'mongoose';
import ContactSubmission, {
  ContactStatus,
  DeliveryChannel,
  DeliveryChannelStatus,
  EmailDeliveryStatus,
  IEmailChannelDelivery,
  IEmailDelivery,
} from '../models/ContactSubmission';
import { logger } from '../utils/logger';

export interface ContactCreateInput {
  referenceNumber: string;
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  subject: string;
  message: string;
  consentAt: Date;
  ipHash?: string;
  userAgent?: string;
}

export interface ContactRecord extends ContactCreateInput {
  _id: string;
  status: ContactStatus;
  emailSent: boolean;
  emailStatus: EmailDeliveryStatus;
  delivery?: IEmailDelivery;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ContactListOptions {
  page: number;
  limit: number;
  status?: ContactStatus;
  enquiryType?: string;
  search?: string;
  emailStatus?: EmailDeliveryStatus;
}

export interface ContactListResult {
  contacts: ContactRecord[];
  total: number;
}

export interface ContactStats {
  total: number;
  new: number;
  read: number;
  replied: number;
  archived: number;
  deliveryIssues: number;
}

export interface DeliveryResultUpdate {
  status: DeliveryChannelStatus;
  attempts: number;
  messageId?: string;
  sentAt?: Date;
  lastAttemptAt?: Date;
  lastError?: string;
}

const fallbackFile = process.env.CONTACT_FALLBACK_FILE
  ? path.resolve(process.env.CONTACT_FALLBACK_FILE)
  : path.join(process.cwd(), 'data', 'contact-submissions.json');

let fileOperation: Promise<unknown> = Promise.resolve();

const databaseReady = (): boolean => mongoose.connection.readyState === 1;

const defaultChannel = (): IEmailChannelDelivery => ({
  status: 'pending',
  attempts: 0,
});

const normalizeDelivery = (delivery?: Partial<IEmailDelivery>): IEmailDelivery => ({
  confirmation: {
    ...defaultChannel(),
    ...(delivery?.confirmation ?? {}),
  },
  admin: {
    ...defaultChannel(),
    ...(delivery?.admin ?? {}),
  },
});

const aggregateDeliveryStatus = (delivery: IEmailDelivery): EmailDeliveryStatus => {
  const statuses = [delivery.confirmation.status, delivery.admin.status];
  const sentCount = statuses.filter((status) => status === 'sent').length;

  if (sentCount === 2) return 'sent';
  if (sentCount === 1) return 'partial';
  if (statuses.every((status) => status === 'pending')) return 'pending';
  if (statuses.every((status) => status === 'not-configured')) return 'not-configured';
  return 'failed';
};

const readFallback = async (): Promise<ContactRecord[]> => {
  try {
    const content = await fs.readFile(fallbackFile, 'utf8');
    const parsed = JSON.parse(content) as ContactRecord[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    const nodeError = error as NodeJS.ErrnoException;
    if (nodeError.code === 'ENOENT') return [];
    throw error;
  }
};

const writeFallback = async (records: ContactRecord[]): Promise<void> => {
  await fs.mkdir(path.dirname(fallbackFile), { recursive: true });
  const temporaryFile = `${fallbackFile}.tmp`;
  await fs.writeFile(temporaryFile, JSON.stringify(records, null, 2), 'utf8');
  await fs.rename(temporaryFile, fallbackFile);
};

const runExclusive = async <T>(operation: () => Promise<T>): Promise<T> => {
  const previous = fileOperation;
  let release!: () => void;
  fileOperation = new Promise<void>((resolve) => {
    release = resolve;
  });
  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
};

const escapeRegex = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const matchesSearch = (record: ContactRecord, search: string): boolean => {
  const needle = search.toLowerCase();
  return [record.referenceNumber, record.name, record.email, record.subject, record.message]
    .filter(Boolean)
    .some((value) => value.toLowerCase().includes(needle));
};

const toContactRecord = (value: unknown): ContactRecord => value as ContactRecord;

export const contactStore = {
  async create(input: ContactCreateInput): Promise<ContactRecord> {
    if (databaseReady()) {
      const document = await ContactSubmission.create(input);
      return toContactRecord(document.toObject());
    }

    return runExclusive(async () => {
      const records = await readFallback();
      const now = new Date().toISOString();
      const record: ContactRecord = {
        ...input,
        _id: crypto.randomUUID(),
        status: 'new',
        emailSent: false,
        emailStatus: 'pending',
        delivery: normalizeDelivery(),
        createdAt: now,
        updatedAt: now,
      };
      records.unshift(record);
      await writeFallback(records);
      logger.info('Contact saved using server fallback storage', {
        id: record._id,
        referenceNumber: record.referenceNumber,
        file: fallbackFile,
      });
      return record;
    });
  },

  async getById(id: string): Promise<ContactRecord | null> {
    if (databaseReady()) {
      const contact = await ContactSubmission.findById(id).lean();
      return contact ? toContactRecord(contact) : null;
    }

    const records = await readFallback();
    return records.find((record) => record._id === id) ?? null;
  },

  async updateDeliveryResults(
    id: string,
    updates: Partial<Record<DeliveryChannel, DeliveryResultUpdate>>
  ): Promise<ContactRecord | null> {
    if (databaseReady()) {
      const existing = await ContactSubmission.findById(id).lean();
      if (!existing) return null;

      const delivery = normalizeDelivery(existing.delivery as IEmailDelivery | undefined);
      (Object.entries(updates) as Array<[DeliveryChannel, DeliveryResultUpdate]>).forEach(
        ([channel, result]) => {
          delivery[channel] = {
            ...delivery[channel],
            ...result,
          };
        }
      );

      const emailStatus = aggregateDeliveryStatus(delivery);
      const emailSent = emailStatus === 'sent' || emailStatus === 'partial';

      const updated = await ContactSubmission.findByIdAndUpdate(
        id,
        {
          $set: {
            delivery,
            emailStatus,
            emailSent,
          },
        },
        { new: true }
      ).lean();

      return updated ? toContactRecord(updated) : null;
    }

    return runExclusive(async () => {
      const records = await readFallback();
      const record = records.find((item) => item._id === id);
      if (!record) return null;

      const delivery = normalizeDelivery(record.delivery);
      (Object.entries(updates) as Array<[DeliveryChannel, DeliveryResultUpdate]>).forEach(
        ([channel, result]) => {
          delivery[channel] = {
            ...delivery[channel],
            ...result,
          };
        }
      );

      record.delivery = delivery;
      record.emailStatus = aggregateDeliveryStatus(delivery);
      record.emailSent = record.emailStatus === 'sent' || record.emailStatus === 'partial';
      record.updatedAt = new Date().toISOString();
      await writeFallback(records);
      return record;
    });
  },

  async list(options: ContactListOptions): Promise<ContactListResult> {
    if (databaseReady()) {
      const filter: Record<string, unknown> = {};
      if (options.status) filter.status = options.status;
      if (options.enquiryType) filter.enquiryType = options.enquiryType;
      if (options.emailStatus) filter.emailStatus = options.emailStatus;
      if (options.search) {
        const expression = new RegExp(escapeRegex(options.search), 'i');
        filter.$or = [
          { referenceNumber: expression },
          { name: expression },
          { email: expression },
          { subject: expression },
          { message: expression },
        ];
      }

      const [contacts, total] = await Promise.all([
        ContactSubmission.find(filter)
          .sort({ createdAt: -1 })
          .skip((options.page - 1) * options.limit)
          .limit(options.limit)
          .lean(),
        ContactSubmission.countDocuments(filter),
      ]);

      return {
        contacts: contacts.map(toContactRecord),
        total,
      };
    }

    const records = await readFallback();
    const filtered = records.filter((record) => {
      if (options.status && record.status !== options.status) return false;
      if (options.enquiryType && record.enquiryType !== options.enquiryType) return false;
      if (options.emailStatus && record.emailStatus !== options.emailStatus) return false;
      if (options.search && !matchesSearch(record, options.search)) return false;
      return true;
    });

    const start = (options.page - 1) * options.limit;
    return {
      contacts: filtered.slice(start, start + options.limit),
      total: filtered.length,
    };
  },

  async stats(): Promise<ContactStats> {
    if (databaseReady()) {
      const [total, newCount, read, replied, archived, deliveryIssues] = await Promise.all([
        ContactSubmission.countDocuments(),
        ContactSubmission.countDocuments({ status: 'new' }),
        ContactSubmission.countDocuments({ status: 'read' }),
        ContactSubmission.countDocuments({ status: 'replied' }),
        ContactSubmission.countDocuments({ status: 'archived' }),
        ContactSubmission.countDocuments({
          emailStatus: { $in: ['partial', 'not-configured', 'failed'] },
        }),
      ]);

      return {
        total,
        new: newCount,
        read,
        replied,
        archived,
        deliveryIssues,
      };
    }

    const records = await readFallback();
    return {
      total: records.length,
      new: records.filter((record) => record.status === 'new').length,
      read: records.filter((record) => record.status === 'read').length,
      replied: records.filter((record) => record.status === 'replied').length,
      archived: records.filter((record) => record.status === 'archived').length,
      deliveryIssues: records.filter((record) =>
        ['partial', 'not-configured', 'failed'].includes(record.emailStatus)
      ).length,
    };
  },

  async updateStatus(id: string, status: ContactStatus): Promise<ContactRecord | null> {
    if (databaseReady()) {
      const updated = await ContactSubmission.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      ).lean();
      return updated ? toContactRecord(updated) : null;
    }

    return runExclusive(async () => {
      const records = await readFallback();
      const record = records.find((item) => item._id === id);
      if (!record) return null;
      record.status = status;
      record.updatedAt = new Date().toISOString();
      await writeFallback(records);
      return record;
    });
  },

  storageMode(): 'mongodb' | 'file' {
    return databaseReady() ? 'mongodb' : 'file';
  },
};
