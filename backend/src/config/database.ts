import mongoose from 'mongoose';
import { logger } from '../utils/logger';

/**
 * Returns a human-readable hint for common MongoDB Atlas connection errors.
 */
const atlasHint = (error: unknown): string => {
  const msg = error instanceof Error ? error.message : String(error);
  const lower = msg.toLowerCase();

  if (lower.includes('authentication failed') || lower.includes('auth failed') || lower.includes('bad auth')) {
    return 'Atlas hint: authentication failed — check your username and password in MONGODB_URI.';
  }
  if (lower.includes('enotfound') || lower.includes('getaddrinfo') || lower.includes('querysrv')) {
    return 'Atlas hint: hostname not found — verify the cluster address in MONGODB_URI and that your DNS resolves SRV records.';
  }
  if (lower.includes('server selection timed out') || lower.includes('connection timed out') || lower.includes('etimedout')) {
    return 'Atlas hint: connection timed out — your IP address may not be whitelisted. In Atlas → Network Access, add your IP or temporarily allow 0.0.0.0/0 for testing.';
  }
  if (lower.includes('ssl') || lower.includes('tls')) {
    return 'Atlas hint: TLS/SSL error — make sure you are using an SRV URI (mongodb+srv://) and that the cluster certificate is valid.';
  }
  if (!process.env.MONGODB_URI?.includes('/') || process.env.MONGODB_URI.split('mongodb.net/')[1]?.startsWith('?')) {
    return 'Atlas hint: the URI may be missing a database name. Add it after the hostname, e.g. ...mongodb.net/ecatu_portfolio?retryWrites=true&w=majority';
  }
  return '';
};

const connectDB = async (): Promise<boolean> => {
  const mongoURI = process.env.MONGODB_URI;
  const databaseRequired = process.env.DATABASE_REQUIRED === 'true';

  if (!mongoURI) {
    const message =
      'MONGODB_URI is not configured. Set it in backend/.env (see backend/.env.example). Contact messages will use local server storage.';
    if (databaseRequired) throw new Error(message);
    logger.warn(message);
    return false;
  }

  // Warn early when the URI is clearly missing a database name.
  const afterHost = mongoURI.split('.net/')[1];
  if (mongoURI.includes('mongodb.net') && (!afterHost || afterHost.startsWith('?') || afterHost === '')) {
    logger.warn(
      'MONGODB_URI appears to be missing a database name. ' +
      'Add it after the hostname, e.g. ...mongodb.net/ecatu_portfolio?retryWrites=true&w=majority',
    );
  }

  try {
    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info('MongoDB connected successfully');
  } catch (error) {
    const hint = atlasHint(error);
    const errorMessage = error instanceof Error ? error.message : String(error);

    if (databaseRequired) {
      logger.error(`MongoDB connection failed and DATABASE_REQUIRED=true: ${errorMessage}`);
      if (hint) logger.error(hint);
      throw error;
    }
    logger.warn('MongoDB unavailable. Contact messages will use local server storage.', {
      error: errorMessage,
      ...(hint ? { hint } : {}),
    });
    return false;
  }

  mongoose.connection.on('error', (err) => {
    logger.error('MongoDB connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    logger.warn('MongoDB disconnected. Contact storage will fall back to the local server file.');
  });

  mongoose.connection.on('reconnected', () => {
    logger.info('MongoDB reconnected');
  });

  return true;
};

export default connectDB;
