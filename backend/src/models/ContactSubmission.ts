import mongoose, { Document, Model, Schema } from 'mongoose';

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';
export type EmailDeliveryStatus = 'pending' | 'sent' | 'partial' | 'not-configured' | 'failed';
export type DeliveryChannelStatus = 'pending' | 'sent' | 'not-configured' | 'failed';
export type DeliveryChannel = 'confirmation' | 'admin';

export interface IEmailChannelDelivery {
  status: DeliveryChannelStatus;
  attempts: number;
  messageId?: string;
  sentAt?: Date;
  lastAttemptAt?: Date;
  lastError?: string;
}

export interface IEmailDelivery {
  confirmation: IEmailChannelDelivery;
  admin: IEmailChannelDelivery;
}

export interface IContactSubmission extends Document {
  referenceNumber: string;
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  subject: string;
  message: string;
  consentAt: Date;
  status: ContactStatus;
  ipHash?: string;
  userAgent?: string;
  emailSent: boolean;
  emailStatus: EmailDeliveryStatus;
  delivery: IEmailDelivery;
  createdAt: Date;
  updatedAt: Date;
}

const deliveryChannelSchema = new Schema<IEmailChannelDelivery>(
  {
    status: {
      type: String,
      enum: ['pending', 'sent', 'not-configured', 'failed'],
      default: 'pending',
      required: true,
    },
    attempts: { type: Number, default: 0, min: 0, required: true },
    messageId: { type: String, trim: true, maxlength: 500 },
    sentAt: { type: Date },
    lastAttemptAt: { type: Date },
    lastError: { type: String, trim: true, maxlength: 1000 },
  },
  { _id: false }
);

const contactSubmissionSchema = new Schema<IContactSubmission>(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
      maxlength: 40,
      index: true,
    },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    phone: { type: String, trim: true, maxlength: 30 },
    enquiryType: { type: String, required: true, trim: true, maxlength: 80 },
    subject: { type: String, required: true, trim: true, maxlength: 200 },
    message: { type: String, required: true, trim: true, maxlength: 5000 },
    consentAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
    ipHash: { type: String, maxlength: 128 },
    userAgent: { type: String, maxlength: 500 },
    emailSent: { type: Boolean, default: false },
    emailStatus: {
      type: String,
      enum: ['pending', 'sent', 'partial', 'not-configured', 'failed'],
      default: 'pending',
    },
    delivery: {
      confirmation: { type: deliveryChannelSchema, default: () => ({}) },
      admin: { type: deliveryChannelSchema, default: () => ({}) },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSubmissionSchema.index({ status: 1, createdAt: -1 });
contactSubmissionSchema.index({ email: 1, createdAt: -1 });
contactSubmissionSchema.index({ ipHash: 1, createdAt: -1 });
contactSubmissionSchema.index({ enquiryType: 1, createdAt: -1 });
contactSubmissionSchema.index({ emailStatus: 1, createdAt: -1 });
contactSubmissionSchema.index({ name: 'text', email: 'text', subject: 'text', referenceNumber: 'text' });

const ContactSubmission: Model<IContactSubmission> = mongoose.model(
  'ContactSubmission',
  contactSubmissionSchema
);

export default ContactSubmission;
