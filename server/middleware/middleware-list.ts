import express from 'express';

import { httpLogger } from './http-logger/http-logger.js';

export const commonMiddleware = [express.json(), express.urlencoded()];

export const environmentSpecificMiddlewares = {
	development: [httpLogger()],
};
