import mongoose from 'mongoose';

import { config } from '../config/config.js';

export const genSetupInitialDatabaseConnection = async () => {
	await mongoose.connect(config.connectionStrings.db, {
		useNewUrlParser: true,
	});
};

// Mongoose.connection.on("connecting", () => logger.info("Connecting to database..."));
// Mongoose.connection.on("connected", () => logger.info("Database connected"));
// Mongoose.connection.on("disconnected", () => logger.info("Connection to database lost"));
// Mongoose.connection.on("reconnected", () => logger.info("Recovered database connection"));
