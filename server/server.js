import express from 'express';

import { middleware } from './middleware/middleware.js';
import { routes } from './routing/routes.js';

const server = express();

server.use(middleware);
server.use(routes);

export { server };
