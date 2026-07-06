import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envFilePath = path.resolve(__dirname, '../../.env');
const envFilePresent = fs.existsSync(envFilePath);
const dotenvResult = dotenv.config({ path: envFilePath });

if (dotenvResult.error) {
  const dotenvError = dotenvResult.error as NodeJS.ErrnoException;
  if (dotenvError.code !== 'ENOENT') {
    throw dotenvResult.error;
  }
}

export interface EnvironmentStatus {
  envFilePath: string;
  envFilePresent: boolean;
  loadedFromEnvFile: boolean;
  mongoConfigured: boolean;
  databaseRequired: boolean;
}

export const getMongoUri = (): string => process.env.MONGODB_URI?.trim() ?? '';

export const getEnvironmentStatus = (): EnvironmentStatus => ({
  envFilePath,
  envFilePresent,
  loadedFromEnvFile: envFilePresent && Boolean(dotenvResult.parsed),
  mongoConfigured: getMongoUri().length > 0,
  databaseRequired: process.env.DATABASE_REQUIRED === 'true',
});
