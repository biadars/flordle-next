import * as pino from 'pino';

export const logger = pino.pino({
    name: 'flordle',
    level: 'info'
});