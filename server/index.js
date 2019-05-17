//Sets up require aliases
require('module-alias/register');

const express = require("express");
const logger = require("./utils/logger");
const config = require("./config");
const db = require("./database");
const middleware = require("./middleware");
const routes = require("./routes");

const app = express();

app.use(middleware);
app.use(routes);

db.createConnection().then(startApp);

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