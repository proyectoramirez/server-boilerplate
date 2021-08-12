import express from 'express';
import { isDev as isDevelopment } from '../utils/env.js';
import commonMiddleware from './middleware.js';

const specificMiddleware = await import(
  isDevelopment ? './middleware.development.js' : './middleware.production.js'
);

const router = express.Router();
router.use(commonMiddleware, specificMiddleware.default);

export default router;
