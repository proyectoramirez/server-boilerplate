const mongoose = require("mongoose");
const config = require("../config");
const logger = require("../utils/logger");

function createConnection() {
    return mongoose.connect(`mongodb://${config.db_server}/${config.db_name}`, { useNewUrlParser: true })
        .then(() => {
            logger.timestamp();
            logger.info("Database connected\n");
        })
        .catch(err => logger.error(err.message));
}

// mongoose.connection.on("connecting", () => logger.info("Connecting to database..."));
// mongoose.connection.on("connected", () => logger.info("Database connected"));
// mongoose.connection.on("disconnected", () => logger.info("Connection to database lost"));
// mongoose.connection.on("reconnected", () => logger.info("Recovered database connection"));

module.exports = { createConnection, db: mongoose };