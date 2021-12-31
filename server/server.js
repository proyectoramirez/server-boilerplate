import express from 'express';

import { config } from './config/config.js';
import { setupDatabase } from './database/setup.js';
import { middleware } from './middleware/middleware.js';
import { routes } from './routing/routes.js';
import logger from './utils/logger.js';

const app = express();
const startServer = () => {
	const { host, port } = config;

	// Start your app.
	app.listen(port, host, (error) => {
		if (error) {
			logger.error(error);
		} else {
			logger.appStarted(port, host);
		}
	});
};

app.use(middleware);
app.use(routes);

await setupDatabase();

startServer();
