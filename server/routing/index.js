import express from 'express';

import loadPathsIntoRouter from '../utils/loadPathsIntoRouter.js';
import api from './api/index.js';

const routes = [
  ['/api', api],
  ['/', express.static('public')],
];

export default loadPathsIntoRouter(routes);
