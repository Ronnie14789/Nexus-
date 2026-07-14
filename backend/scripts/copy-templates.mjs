import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(scriptDir, '..');
const sourceDir = path.join(backendDir, 'src', 'templates');
const outputDir = path.join(backendDir, 'dist', 'templates');
const requiredTemplates = [
  'contact-confirmation.hbs',
  'contact-confirmation.txt.hbs',
  'admin-notification.hbs',
  'admin-notification.txt.hbs',
];

if (!fs.existsSync(sourceDir)) {
  console.error(`Email template source directory was not found: ${sourceDir}`);
  process.exit(1);
}

const missingSourceTemplates = requiredTemplates.filter(
  (name) => !fs.existsSync(path.join(sourceDir, name))
);
if (missingSourceTemplates.length > 0) {
  console.error(`Required email templates are missing: ${missingSourceTemplates.join(', ')}`);
  process.exit(1);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

const missingOutputTemplates = requiredTemplates.filter(
  (name) => !fs.existsSync(path.join(outputDir, name))
);
if (missingOutputTemplates.length > 0) {
  console.error(`Email template build verification failed: ${missingOutputTemplates.join(', ')}`);
  process.exit(1);
}

const copied = fs.readdirSync(outputDir).filter((name) => !name.startsWith('.'));
console.log(`Copied and verified ${copied.length} email template files in ${outputDir}`);
