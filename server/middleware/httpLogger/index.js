import { isDev } from '../../utils/env.js';
import logger from '../../utils/logger.js';

const logRequest = (req) => {
  logger.info(`${req.method} to ${req.originalUrl} by ${req.ip}`);
};

const logResponse = (res) => {
  if (res.finished) {
    logger.info(
      `${res.statusCode} ${res.statusMessage}, ${
        res.get('Content-Length') || 0
      }b sent`
    );
  } else {
    logger.info('Aborted by the client.');
    logger.info(
      `Had status ${res.statusCode} ${res.statusMessage}, ${
        res.get('Content-Length') || 0
      }b`
    );
  }
};

const logError = (err) => {
  logger.error(err);
};

const middleware = (callback) => {
  return (req, res, next) => {
    function runCallback(err) {
      callback(req, res, err);
      cleanupCallback();
    }

    function log(err) {
      if (err) {
        logError(err);
      } else {
        logResponse(res);
      }

      console.log();
      cleanupLogging();
    }

    function cleanupCallback() {
      res.off('finish', runCallback);
      res.off('close', runCallback);
      res.off('error', runCallback);
    }

    function cleanupLogging() {
      res.off('finish', log);
      res.off('close', log);
      res.off('error', log);
    }

    if (isDev) {
      logger.timestamp();
      logRequest(req);
      res.on('finish', log);
      res.on('close', log);
      res.on('error', log);
    }

    if (callback) {
      res.on('finish', runCallback);
      res.on('close', runCallback);
      res.on('error', runCallback);
    }

    next();
  };
};

export default middleware;
