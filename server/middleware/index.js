import express from 'express';

import { isDev } from '../utils/env.js';
import commonMiddleware from './middleware.js';

const specificMiddleware = await import(
  isDev ? './middleware.development.js' : './middleware.production.js'
);

const router = express.Router();
router.use(commonMiddleware, specificMiddleware.default);

export default router;
