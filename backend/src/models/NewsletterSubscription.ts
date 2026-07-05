import mongoose, { Document, Schema, Model } from 'mongoose';
import { randomUUID } from 'crypto';

export interface INewsletterSubscription extends Document {
  email: string;
  name?: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  unsubscribeToken: string;
  confirmedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const newsletterSubscriptionSchema = new Schema<INewsletterSubscription>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Invalid email address'],
    },
    name: { type: String, trim: true, maxlength: 100 },
    status: {
      type: String,
      enum: ['active', 'unsubscribed', 'bounced'],
      default: 'active',
    },
    unsubscribeToken: {
      type: String,
      default: () => randomUUID(),
      unique: true,
    },
    confirmedAt: { type: Date },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

newsletterSubscriptionSchema.index({ email: 1 });
newsletterSubscriptionSchema.index({ status: 1 });

const NewsletterSubscription: Model<INewsletterSubscription> = mongoose.model(
  'NewsletterSubscription',
  newsletterSubscriptionSchema
);
export default NewsletterSubscription;
