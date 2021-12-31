import express from 'express';

import loadPathsIntoRouter from '../utils/loadPathsIntoRouter.js';

import { routes as apiRoutes } from './api/api.js';

const routeList = [
	['/api', apiRoutes],
	['/', express.static('public')],
];

export const routes = loadPathsIntoRouter(routeList);
