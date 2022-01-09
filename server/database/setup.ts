import mongoose from 'mongoose';
import config from 'config';

const connectionString = config.get<string>('database.connectionString');

export const genSetupInitialDatabaseConnection = async () => {
	await mongoose.connect(connectionString);
};

// Mongoose.connection.on("connecting", () => logger.info("Connecting to database..."));
// Mongoose.connection.on("connected", () => logger.info("Database connected"));
// Mongoose.connection.on("disconnected", () => logger.info("Connection to database lost"));
// Mongoose.connection.on("reconnected", () => logger.info("Recovered database connection"));
