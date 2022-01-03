import { isDevelopment } from '../../utils/environment.js';
import logger from '../../utils/logger.js';

const logRequest = (request) => {
	logger.info(`${request.method} to ${request.originalUrl} by ${request.ip}`);
};

const logResponse = (response) => {
	if (response.finished) {
		logger.info(
			`${response.statusCode} ${response.statusMessage}, ${
				response.get('Content-Length') || 0
			}b sent`
		);
	} else {
		logger.info('Aborted by the client.');
		logger.info(
			`Had status ${response.statusCode} ${response.statusMessage}, ${
				response.get('Content-Length') || 0
			}b`
		);
	}
};

const logError = (error) => {
	logger.error(error);
};

export const httpLogger = (callback) => {
	return (request, response, next) => {
		const cleanupCallback = () => {
			response.off('finish', runCallback);
			response.off('close', runCallback);
			response.off('error', runCallback);
		};

		const runCallback = (error) => {
			cleanupCallback();

			return callback(request, response, error);
		};

		const log = (error) => {
			if (error) {
				logError(error);
			} else {
				logResponse(response);
			}

			cleanupLogging();
		};

		const cleanupLogging = () => {
			response.off('finish', log);
			response.off('close', log);
			response.off('error', log);
		};

		if (isDevelopment) {
			logger.timestamp();
			logRequest(request);
			response.on('finish', log);
			response.on('close', log);
			response.on('error', log);
		}

		if (callback) {
			response.on('finish', runCallback);
			response.on('close', runCallback);
			response.on('error', runCallback);
		}

		next();
	};
};
