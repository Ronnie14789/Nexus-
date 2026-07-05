import { exec } from 'node:child_process';
import process from 'node:process';

const port = process.env.PORT || '3001';
const url = `http://localhost:${port}`;
const command =
  process.platform === 'win32'
    ? `start "" "${url}"`
    : process.platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;

setTimeout(() => {
  exec(command, () => undefined);
}, 2500);
