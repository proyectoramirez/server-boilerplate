import express from 'express';

export default (routes) => {
  const router = express.Router();
  routes.forEach((route) => router.use(...route));
  
return router;
};
