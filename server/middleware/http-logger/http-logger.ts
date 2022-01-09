import type { Request, RequestHandler, Response } from 'express';

import { isDevelopment } from '../../utils/environment.js';
import {
	info as logInfo,
	error as logError,
	timestamp as logTimestamp,
} from '../../utils/logger.js';

const logRequest = (request: Request) => {
	logInfo(`${request.method} to ${request.originalUrl} by ${request.ip}`);
};

const logResponse = (response: Response) => {
	if (response.writableEnded) {
		logInfo(
			`${response.statusCode} ${response.statusMessage}, ${
				response.get('Content-Length') || 0
			}b sent`
		);
	} else {
		logInfo('Aborted by the client.');
		logInfo(
			`Had status ${response.statusCode} ${response.statusMessage}, ${
				response.get('Content-Length') || 0
			}b`
		);
	}
};

type Callback = (request: Request, response: Response, error?: Error ) => void;

export const httpLogger = (callback?: Callback): RequestHandler => {
	return (request, response, next) => {
		const cleanupCallback = () => {
			response.off('finish', runCallback);
			response.off('close', runCallback);
			response.off('error', runCallback);
		};

		const runCallback = (error?: Error) => {
			cleanupCallback();

			callback(request, response, error);
		};

		const log = (error?: Error) => {
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
			logTimestamp();
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
