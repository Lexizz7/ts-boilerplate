import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prd', 'test']).default('dev'),
  log: z.object({
    LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']).default('info'),
  }),
});

function parseEnv(): z.infer<typeof envSchema> {
  const raw = process.env;
  return envSchema.parse({
    NODE_ENV: raw.NODE_ENV,
    log: {
      LOG_LEVEL: raw.LOG_LEVEL,
    },
  });
}

export const env = parseEnv();
