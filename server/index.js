const express = require("express");
const config = require("./config");
const db = require("./database");

const isDev = process.env.NODE_ENV !== "production";
const app = express();

loadMiddleware();
loadRoutes();

db.createConnection().then(startApp);

//---------------------------------------------------------------

function loadMiddleware() {
    const httpLogger = require("./utils/middleware/httpLogger");

    app.use(httpLogger());
}

function loadRoutes() {
    const api = require("./api");

    app.use("/", express.static("public"));
    app.use("/api", api);
}

function startApp() {
    const logger = require("./utils/logger");

    const host = config.host;
    const port = config.port;

    // Start your app.
    app.listen(port, host, async err => {
        if (err) {
            return logger.error(err.message);
        }
        logger.appStarted(port, host);
    });
}