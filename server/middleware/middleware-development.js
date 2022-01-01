import httpLogger from './http-logger/http-logger.js';

export const middleware = [httpLogger()];
