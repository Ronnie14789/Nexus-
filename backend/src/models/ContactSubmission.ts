import mongoose, { Document, Schema, Model } from 'mongoose';

export type ContactStatus = 'new' | 'read' | 'replied' | 'archived';
export type EmailDeliveryStatus = 'pending' | 'sent' | 'partial' | 'not-configured' | 'failed';

export interface IContactSubmission extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const contactSubmissionSchema = new Schema<IContactSubmission>(
  {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

contactSubmissionSchema.index({ status: 1, createdAt: -1 });
contactSubmissionSchema.index({ email: 1, createdAt: -1 });
contactSubmissionSchema.index({ ipHash: 1, createdAt: -1 });

const ContactSubmission: Model<IContactSubmission> = mongoose.model(
  'ContactSubmission',
  contactSubmissionSchema
);

export default ContactSubmission;
