import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

const frontendDir = path.join(rootDir, 'frontend', 'dist');
const backendEntry = path.join(rootDir, 'backend', 'dist', 'server.js');
const contactDataFile = path.join(
  rootDir,
  'backend',
  'data',
  'contact-submissions.json',
);

if (!fs.existsSync(frontendDir) || !fs.existsSync(backendEntry)) {
  console.error('Production files are missing. Run "npm run build" first.');
  process.exit(1);
}

fs.mkdirSync(path.dirname(contactDataFile), { recursive: true });

const port = process.env.PORT || '3001';
const localSecret = crypto.randomBytes(48).toString('hex');

process.env.NODE_ENV ||= 'production';
process.env.PORT = port;
process.env.STATIC_FRONTEND_DIR = frontendDir;
process.env.DATABASE_REQUIRED ||= 'false';
process.env.CONTACT_FALLBACK_FILE ||= contactDataFile;
process.env.ALLOWED_ORIGINS ||=
  `http://localhost:${port},http://127.0.0.1:${port}`;
process.env.FRONTEND_URL ||= `http://localhost:${port}`;
process.env.JWT_SECRET ||= localSecret;
process.env.IP_HASH_SALT ||= localSecret;

console.log(`Ecatu Ronald Portfolio: http://localhost:${port}`);
console.log(`Admin login: http://localhost:${port}/admin/login`);
console.log(`Static frontend: ${frontendDir}`);

/*
 * Import the backend in this same Node process.
 * Hostinger must observe app.listen() from the configured entry process.
 */
await import(pathToFileURL(backendEntry).href);
