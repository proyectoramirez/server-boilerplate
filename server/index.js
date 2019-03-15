const express = require("express");
const logger = require("./utils/logger");
const config = require("./config");
const db = require("./database");

const isDev = process.env.NODE_ENV !== "production";
const app = express();

loadMiddleware();
loadRoutes();

db.createConnection().then(startApp).catch(err => logger.error(err));;

//---------------------------------------------------------------

function loadMiddleware() {
    const httpLogger = require("./middleware/httpLogger");

    app.use(httpLogger());
}

function loadRoutes() {
    const api = require("./api");

    app.use("/", express.static("public"));
    app.use("/api", api);
}

function startApp() {
    const host = config.host;
    const port = config.port;

    // Start your app.
    app.listen(port, host, async err => {
        if (err) {
            return logger.error(err);
        }
        logger.appStarted(port, host);
    });
}