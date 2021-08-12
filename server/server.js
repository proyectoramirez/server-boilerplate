import express from 'express';
import config from './config/index.js';
import setupDB from './database/index.js';
import middleware from './middleware/index.js';
import routing from './routing/index.js';
import logger from './utils/logger.js';

const app = express();

app.use(middleware);
app.use(routing);

setupDB()
  .catch(() => {})
  .finally(startServer);

function startServer() {
  const { host } = config;
  const { port } = config;

  // Start your app.
  app.listen(port, host, (error) => {
    if (error) {
      return logger.error(error);
    }
    logger.appStarted(port, host);
  });
}
