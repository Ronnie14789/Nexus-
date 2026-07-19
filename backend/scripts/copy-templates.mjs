import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Handlebars from 'handlebars';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(scriptDir, '..');
const sourceDir = path.join(backendDir, 'src', 'templates');
const outputDir = path.join(backendDir, 'dist', 'templates');
const requiredTemplates = [
  'contact-confirmation.hbs',
  'contact-confirmation.txt.hbs',
  'admin-notification.hbs',
  'admin-notification.txt.hbs',
  'newsletter-subscription.hbs',
  'newsletter-subscription.txt.hbs',
  'blog-notification.hbs',
  'blog-notification.txt.hbs',
];

const sampleData = {
  referenceNumber: 'ER-20260719-SAMPLE',
  name: 'Sample Contact',
  email: 'contact@example.com',
  phone: '+256 700 000000',
  enquiryType: 'Professional collaboration',
  subject: 'Systems engineering enquiry',
  message: 'Representative message content for template verification.',
  submittedAt: '19 July 2026 at 21:30',
  replyUrl: 'mailto:contact@example.com',
  adminUrl: 'https://ecaturonald.tech/admin/contacts',
  siteUrl: 'https://ecaturonald.tech',
  submissionId: 'sample-submission',
  year: 2026,
  unsubscribeUrl: 'https://ecaturonald.tech/unsubscribe?token=sample',
  postTitle: 'Evidence-led diagnostics',
  postExcerpt: 'A representative technical publication summary.',
  postUrl: 'https://ecaturonald.tech/blog/evidence-led-diagnostics',
  featuredImage: '',
};

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

for (const name of requiredTemplates) {
  const source = fs.readFileSync(path.join(sourceDir, name), 'utf8');
  let rendered;
  try {
    rendered = Handlebars.compile(source, { strict: true })(sampleData);
  } catch (error) {
    console.error(`Email template compilation failed for ${name}: ${error.message}`);
    process.exit(1);
  }

  if (!rendered.trim() || /{{[^}]+}}/.test(rendered)) {
    console.error(`Email template render verification failed for ${name}`);
    process.exit(1);
  }

  if (name.endsWith('.hbs') && !name.endsWith('.txt.hbs')) {
    const hasEmailStructure = /<!doctype html>/i.test(rendered)
      && /role="presentation"/i.test(rendered)
      && /max-width:/i.test(rendered);
    if (!hasEmailStructure) {
      console.error(`HTML email compatibility structure is missing from ${name}`);
      process.exit(1);
    }
  }
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
console.log(`Compiled, copied and verified ${copied.length} email template files in ${outputDir}`);
