import express from 'express';

export const loadPathsIntoRouter = (routes) => {
	const router = express.Router();
	for (const route of routes) {
		router.use(...route);
	}

	return router;
};
