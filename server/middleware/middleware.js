import express from 'express';

import { isDev as isDevelopment } from '../utils/env.js';

import { middlewareBase } from './middleware-base.js';

const specificMiddleware = await import(
	isDevelopment ? './middleware-development.js' : './middleware-production.js'
);

const middleware = express.Router();
middleware.use(middlewareBase, specificMiddleware.default);

export { middleware };
