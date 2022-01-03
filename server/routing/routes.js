import express from 'express';

import loadPathsIntoRouter from '../utils/load-paths-into-router.js';

import { routes as apiRoutes } from './api/api.js';

const routeList = [
	['/api', apiRoutes],
	['/', express.static('public')],
];

export const routes = loadPathsIntoRouter(routeList);
