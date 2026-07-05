import { spawn } from 'node:child_process';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');
const frontendDir = path.join(rootDir, 'frontend', 'dist');
const backendEntry = path.join(rootDir, 'backend', 'dist', 'server.js');
const contactDataFile = path.join(rootDir, 'backend', 'data', 'contact-submissions.json');

if (!fs.existsSync(frontendDir) || !fs.existsSync(backendEntry)) {
  console.error('Production files are missing. Run "npm run build" first.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(contactDataFile), { recursive: true });

const port = process.env.PORT || '3001';
const localSecret = crypto.randomBytes(48).toString('hex');
const env = {
  ...process.env,
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: port,
  STATIC_FRONTEND_DIR: frontendDir,
  DATABASE_REQUIRED: process.env.DATABASE_REQUIRED || 'false',
  CONTACT_FALLBACK_FILE: process.env.CONTACT_FALLBACK_FILE || contactDataFile,
  ALLOWED_ORIGINS:
    process.env.ALLOWED_ORIGINS || `http://localhost:${port},http://127.0.0.1:${port}`,
  FRONTEND_URL: process.env.FRONTEND_URL || `http://localhost:${port}`,
  JWT_SECRET: process.env.JWT_SECRET || localSecret,
  IP_HASH_SALT: process.env.IP_HASH_SALT || localSecret,
};

console.log(`\nEcatu Ronald Portfolio: http://localhost:${port}`);
console.log(`Admin login:             http://localhost:${port}/admin/login`);
console.log('Contact messages will use MongoDB when connected, otherwise backend/data/contact-submissions.json.');
console.log('Press Ctrl+C to stop the server.\n');

const child = spawn(process.execPath, [backendEntry], {
  cwd: path.join(rootDir, 'backend'),
  env,
  stdio: 'inherit',
});

const stop = (signal) => {
  if (!child.killed) child.kill(signal);
};

process.on('SIGINT', () => stop('SIGINT'));
process.on('SIGTERM', () => stop('SIGTERM'));

child.on('exit', (code, signal) => {
  if (signal) process.exit(0);
  process.exit(code ?? 1);
});
