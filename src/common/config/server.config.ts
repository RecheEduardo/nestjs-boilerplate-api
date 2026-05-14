import { registerAs } from '@nestjs/config';
import { SERVER_CONFIG } from '../constants';
import { ServerConfigInterface } from '../interfaces';

export const ServerConfig = registerAs(
  SERVER_CONFIG,
  (): ServerConfigInterface => ({
    environment: process?.env?.NODE_ENV || 'development',
    port:
      'string' === typeof process?.env?.PORT
        ? parseInt(process.env.PORT, 10)
        : 3000,
    cors: {
      origin: process?.env?.CORS_ORIGIN || 'http://localhost:3000',
    },
  }),
);
