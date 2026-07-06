import '../config/env';
import mongoose from 'mongoose';
import AdminUser from '../models/AdminUser';

/**
 * Returns a human-readable Atlas hint for the most common connection errors.
 * Mirrors the hint logic in config/database.ts so the script gives the same
 * actionable guidance as the server itself.
 */
const atlasHint = (error: unknown): string => {
  const msg = error instanceof Error ? error.message : String(error);
  const lower = msg.toLowerCase();

  if (lower.includes('authentication failed') || lower.includes('auth failed') || lower.includes('bad auth')) {
    return 'Atlas hint: authentication failed — check the username and password in MONGODB_URI.';
  }
  if (lower.includes('enotfound') || lower.includes('getaddrinfo') || lower.includes('querysrv')) {
    return 'Atlas hint: hostname not found — verify the cluster address in MONGODB_URI and that your DNS resolves SRV records.';
  }
  if (lower.includes('server selection timed out') || lower.includes('connection timed out') || lower.includes('etimedout')) {
    return (
      'Atlas hint: connection timed out — your IP address may not be whitelisted. ' +
      'In Atlas → Network Access, click "Add Current IP Address" or add your specific IP.'
    );
  }
  if (lower.includes('ssl') || lower.includes('tls')) {
    return 'Atlas hint: TLS/SSL error — make sure you are using an SRV URI (mongodb+srv://) and that the cluster certificate is valid.';
  }
  return '';
};

const run = async (): Promise<void> => {
  const mongoUri = process.env.MONGODB_URI;
  const username = process.env.ADMIN_USERNAME;
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!mongoUri) throw new Error('MONGODB_URI is required. Add it to backend/.env or provide it through your host environment.');
  if (!username || username.length < 3) throw new Error('ADMIN_USERNAME must contain at least 3 characters');
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) throw new Error('ADMIN_EMAIL must be a valid email address');
  if (!password || password.length < 12) throw new Error('ADMIN_PASSWORD must contain at least 12 characters');

  // Warn early when an Atlas URI is clearly missing a database name.
  try {
    const url = new URL(mongoUri);
    if (url.hostname.endsWith('.mongodb.net') && url.pathname.length <= 1) {
      console.warn(
        'Warning: MONGODB_URI appears to be missing a database name. ' +
        'Add it after the hostname, e.g. ...mongodb.net/ecatu_portfolio?retryWrites=true&w=majority',
      );
    }
  } catch {
    // Malformed URI — mongoose will surface the error below.
  }

  try {
    await mongoose.connect(mongoUri);
  } catch (error) {
    const hint = atlasHint(error);
    const msg = error instanceof Error ? error.message : String(error);
    console.error(`MongoDB connection failed: ${msg}`);
    if (hint) console.error(hint);
    throw error;
  }

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
