import express from 'express';

import { middleware } from './middleware/middleware.js';
import { routes } from './routing/routes.js';

const server = express();

server.use(middleware);

for (const [path, handler] of routes) {
	server.use(path, handler);
}

export { server };
