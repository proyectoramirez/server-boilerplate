import express from 'express';

import { environmentName } from '../utils/environment.js';

import {
	commonMiddleware,
	environmentSpecificMiddlewares,
} from './middleware-list.js';

const environmentSpecificMiddleware =
	environmentSpecificMiddlewares[environmentName] ?? [];

const middleware = new express.Router();
middleware.use(commonMiddleware, environmentSpecificMiddleware);

export { middleware };
