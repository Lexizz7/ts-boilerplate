import pino from 'pino';
import { env } from '../env.js';

const baseOpts: pino.LoggerOptions = {
  level: env.log.LOG_LEVEL,
};

if (env.NODE_ENV === 'dev') {
  baseOpts.transport = {
    target: 'pino-pretty',
    options: { colorize: true },
  };
}

const logger = pino(baseOpts);

export function getLogger(name: string): pino.Logger {
  return logger.child({ name });
}
