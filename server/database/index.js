import mongoose from 'mongoose';
import config from '../config/index.js';
import logger from '../utils/logger.js';

function setupDB() {
  return mongoose
    .connect(config.connectionStrings.db, { useNewUrlParser: true })
    .then(() => {
      console.log();
      logger.timestamp();
      logger.info();
    })
    .catch((error) => {
      console.log();
      logger.timestamp();
      logger.error(`${error}\n`);
      throw error;
    });
}

// Mongoose.connection.on("connecting", () => logger.info("Connecting to database..."));
// Mongoose.connection.on("connected", () => logger.info("Database connected"));
// Mongoose.connection.on("disconnected", () => logger.info("Connection to database lost"));
// Mongoose.connection.on("reconnected", () => logger.info("Recovered database connection"));

export default setupDB;
