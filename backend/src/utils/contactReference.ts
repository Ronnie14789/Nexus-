import crypto from 'crypto';

const pad = (value: number): string => value.toString().padStart(2, '0');

export const createContactReference = (date = new Date()): string => {
  const datePart = [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
  ].join('');

  const randomPart = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `ER-${datePart}-${randomPart}`;
};

export default createContactReference;
