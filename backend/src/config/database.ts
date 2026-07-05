import mongoose from 'mongoose';
import { logger } from '../utils/logger';

const connectDB = async (): Promise<boolean> => {
  const mongoURI = process.env.MONGODB_URI;
  const databaseRequired = process.env.DATABASE_REQUIRED === 'true';

  if (!mongoURI) {
    const message = 'MONGODB_URI is not configured. Contact messages will use local server storage.';
    if (databaseRequired) throw new Error(message);
    logger.warn(message);
    return false;
  }

  try {
    await mongoose.connect(mongoURI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info('MongoDB connected successfully');
  } catch (error) {
    if (databaseRequired) {
      logger.error('MongoDB connection failed and DATABASE_REQUIRED=true', error);
      throw error;
    }
    logger.warn('MongoDB unavailable. Contact messages will use local server storage.', {
      error: error instanceof Error ? error.message : String(error),
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
