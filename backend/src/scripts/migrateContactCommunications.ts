import '../config/env';
import mongoose from 'mongoose';
import connectDB from '../config/database';
import ContactSubmission, {
  DeliveryChannelStatus,
  EmailDeliveryStatus,
} from '../models/ContactSubmission';
import { createContactReference } from '../utils/contactReference';
import { logger } from '../utils/logger';

const channelStatusFromLegacy = (status: EmailDeliveryStatus): DeliveryChannelStatus => {
  if (status === 'sent') return 'sent';
  if (status === 'not-configured') return 'not-configured';
  if (status === 'failed' || status === 'partial') return 'failed';
  return 'pending';
};

const uniqueReference = async (createdAt?: Date): Promise<string> => {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const reference = createContactReference(createdAt || new Date());
    const exists = await ContactSubmission.exists({ referenceNumber: reference });
    if (!exists) return reference;
  }
  throw new Error('Could not generate a unique contact reference');
};

const migrate = async (): Promise<void> => {
  await connectDB();

  const contacts = await ContactSubmission.find({
    $or: [
      { referenceNumber: { $exists: false } },
      { referenceNumber: '' },
      { delivery: { $exists: false } },
    ],
  });

  let updated = 0;
  for (const contact of contacts) {
    if (!contact.referenceNumber) {
      contact.referenceNumber = await uniqueReference(contact.createdAt);
    }

    const legacyStatus = contact.emailStatus || 'pending';
    const channelStatus = channelStatusFromLegacy(legacyStatus);
    const attempts = channelStatus === 'pending' ? 0 : 1;

    if (!contact.delivery?.confirmation || !contact.delivery?.admin) {
      contact.delivery = {
        confirmation: { status: channelStatus, attempts },
        admin: { status: channelStatus, attempts },
      };
    }

    await contact.save();
    updated += 1;
  }

  logger.info('Contact communications migration completed', {
    scanned: contacts.length,
    updated,
  });
};

migrate()
  .catch((error) => {
    logger.error('Contact communications migration failed', { error });
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
