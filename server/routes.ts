import express from 'express';

import { routes as apiRoutes } from './api/api.js';

export const routes = [
	['/api', apiRoutes],
	['/', express.static('public')],
];
