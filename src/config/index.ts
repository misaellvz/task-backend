import { ConfigType, registerAs } from '@nestjs/config';

export const config = registerAs('config', () => {
  return {
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT, 10),
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
  };
});

export { default as schema } from './schema';

export const CONFIG = 'CONFIG';

export type Config = ConfigType<typeof config>;
