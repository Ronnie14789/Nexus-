import 'dotenv/config';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser';

const run = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!mongoUri) throw new Error('MONGODB_URI is required');
  if (!username || username.length < 3) throw new Error('ADMIN_USERNAME must contain at least 3 characters');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('ADMIN_EMAIL must be a valid email address');
  if (!password || password.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters');

  await mongoose.connect(mongoUri);

  const existing = await AdminUser.findOne({ $or: [{ username }, { email }] }).select('+password');
  if (existing) {
    existing.username = username;
    existing.email = email;
    existing.password = password;
    existing.role = 'superadmin';
    existing.isActive = true;
    await existing.save();
    console.log(`Updated administrator account: ${username}`);
  } else {
    await AdminUser.create({ username, email, password, role: 'superadmin' });
    console.log(`Created administrator account: ${username}`);
  }

  await mongoose.disconnect();
};

run().catch(async (error) => {
  console.error(error instanceof Error ? error.message : error);
  await mongoose.disconnect().catch(() => undefined);
  process.exit(1);
});
