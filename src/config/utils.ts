import { existsSync } from 'fs';
import { join, resolve } from 'path';

const ENV = process.env.NODE_ENV;

export function getEnvPath(fileName: string): string {
  if (ENV === 'prod') {
    return '.env.prod';
  }
  const dest = join(__dirname, '..', '..');
  const filePath = resolve(`${dest}/${fileName}`);
  if (!existsSync(filePath)) {
    throw new Error('.env file not found');
  }
  return filePath;
}
