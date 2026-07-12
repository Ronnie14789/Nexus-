import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, '..');

const sourceDir = path.join(rootDir, 'frontend', 'dist');
const outputDir = path.join(rootDir, 'dist');

if (!fs.existsSync(sourceDir)) {
  console.error(`Frontend build directory was not found: ${sourceDir}`);
  process.exit(1);
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.mkdirSync(outputDir, { recursive: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

console.log(`Deployment output prepared at: ${outputDir}`);
