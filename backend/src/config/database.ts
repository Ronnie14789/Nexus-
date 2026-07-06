import mongoose from 'mongoose';
import { logger } from '../utils/logger';

/**
 * Returns a human-readable hint for common MongoDB Atlas connection errors.
 * Accepts the URI so the function stays pure and testable.
 */
const atlasHint = (error: unknown, mongoURI: string): string => {
  const msg = error instanceof Error ? error.message : String(error);
  const lower = msg.toLowerCase();

  if (lower.includes('authentication failed') || lower.includes('auth failed') || lower.includes('bad auth')) {
    return 'Atlas hint: authentication failed — check your username and password in MONGODB_URI.';
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
  // Check whether the URI is missing a database name (fallback hint).
  try {
    const url = new URL(mongoURI);
    const isAtlas = url.hostname.endsWith('.mongodb.net');
    const hasDbName = url.pathname.length > 1; // more than just '/'
    if (isAtlas && !hasDbName) {
      return 'Atlas hint: the URI is missing a database name. Add it after the hostname, e.g. ...mongodb.net/ecatu_portfolio?retryWrites=true&w=majority';
    }
  } catch {
    // Unparseable URI — mongoose will report the error itself.
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

  // Warn early when an Atlas URI is clearly missing a database name.
  try {
    const url = new URL(mongoURI);
    if (url.hostname.endsWith('.mongodb.net') && url.pathname.length <= 1) {
      logger.warn(
        'MONGODB_URI appears to be missing a database name. ' +
        'Add it after the hostname, e.g. ...mongodb.net/ecatu_portfolio?retryWrites=true&w=majority',
      );
    }
  } catch {
    // Invalid URI syntax — mongoose will report the detailed error.
  }

  try {
    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info('MongoDB connected successfully');
  } catch (error) {
    const hint = atlasHint(error, mongoURI);
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
