import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import mongoose from 'mongoose';
import ContactSubmission, {
  ContactStatus,
  EmailDeliveryStatus,
} from '../models/ContactSubmission';
import { logger } from '../utils/logger';

export interface ContactCreateInput {
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
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface ContactListOptions {
  page: number;
  limit: number;
  status?: ContactStatus;
}

interface ContactListResult {
  contacts: ContactRecord[];
  total: number;
}

const fallbackFile = process.env.CONTACT_FALLBACK_FILE
  ? path.resolve(process.env.CONTACT_FALLBACK_FILE)
  : path.join(process.cwd(), 'data', 'contact-submissions.json');

let fileOperation: Promise<unknown> = Promise.resolve();

const databaseReady = (): boolean => mongoose.connection.readyState === 1;

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

export const contactStore = {
  async create(input: ContactCreateInput): Promise<ContactRecord> {
    if (databaseReady()) {
      const document = await ContactSubmission.create(input);
      return document.toObject() as unknown as ContactRecord;
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
        createdAt: now,
        updatedAt: now,
      };
      records.unshift(record);
      await writeFallback(records);
      logger.info('Contact saved using server fallback storage', {
        id: record._id,
        file: fallbackFile,
      });
      return record;
    });
  },

  async updateEmailStatus(
    id: string,
    emailSent: boolean,
    emailStatus: EmailDeliveryStatus
  ): Promise<void> {
    if (databaseReady()) {
      await ContactSubmission.findByIdAndUpdate(id, { $set: { emailSent, emailStatus } });
      return;
    }

    await runExclusive(async () => {
      const records = await readFallback();
      const record = records.find((item) => item._id === id);
      if (!record) return;
      record.emailSent = emailSent;
      record.emailStatus = emailStatus;
      record.updatedAt = new Date().toISOString();
      await writeFallback(records);
    });
  },

  async list(options: ContactListOptions): Promise<ContactListResult> {
    if (databaseReady()) {
      const filter: Record<string, unknown> = options.status ? { status: options.status } : {};
      const [contacts, total] = await Promise.all([
        ContactSubmission.find(filter)
          .sort({ createdAt: -1 })
          .skip((options.page - 1) * options.limit)
          .limit(options.limit)
          .lean(),
        ContactSubmission.countDocuments(filter),
      ]);
      return { contacts: contacts as unknown as ContactRecord[], total };
    }

    const records = await readFallback();
    const filtered = options.status
      ? records.filter((record) => record.status === options.status)
      : records;
    const start = (options.page - 1) * options.limit;
    return {
      contacts: filtered.slice(start, start + options.limit),
      total: filtered.length,
    };
  },

  async updateStatus(id: string, status: ContactStatus): Promise<ContactRecord | null> {
    if (databaseReady()) {
      return ContactSubmission.findByIdAndUpdate(
        id,
        { $set: { status } },
        { new: true }
      ).lean() as unknown as ContactRecord | null;
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
