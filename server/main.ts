/* eslint-disable import/no-unused-modules */
import { config } from './config/config.js';
import { genSetupInitialDatabaseConnection } from './database/setup.js';
import { server } from './server.js';
import { logger } from './utils/logger.js';

const { host, port } = config;

// eslint-disable-next-line no-restricted-syntax
const genStartServer = () => {
	return new Promise<void>((resolve) => {
		server.listen(port, host, () => {
			resolve();
		});
	});
};

try {
	await genSetupInitialDatabaseConnection();
	await genStartServer();

	logger.timestamp();
	logger.appStarted(port, host);
} catch (error) {
	logger.timestamp();
	logger.error(error as string);
}
