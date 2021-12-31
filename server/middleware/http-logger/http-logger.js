import { isDev as isDevelopment } from '../../utils/env.js';
import logger from '../../utils/logger.js';

const logRequest = (request) => {
	logger.info(`${request.method} to ${request.originalUrl} by ${request.ip}`);
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

const logError = (error) => {
	logger.error(error);
};

const middleware = (callback) => {
	return (request, res, next) => {
		function runCallback(error) {
			callback(request, res, error);
			cleanupCallback();
		}

		function log(error) {
			if (error) {
				logError(error);
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

		if (isDevelopment) {
			logger.timestamp();
			logRequest(request);
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
