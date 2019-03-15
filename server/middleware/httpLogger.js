const logger = require("../logger");


const logRequest = (req) => {
    logger.info(`${req.method} request to ${req.originalUrl} by ${req.ip}`);
}

const logResponse = (res) => {
    if (res.finished) {
        logger.info(`${res.statusCode} ${res.statusMessage}, ${res.get('Content-Length') || 0}b sent`);
    } else {
        logger.info(`Request aborted by the client.`);
        logger.info(`Response had status ${res.statusCode} ${res.statusMessage}, ${res.get('Content-Length') || 0}b`);
    }
}

const logError = (err) => {
    logger.error(err);
}

const middleware = (callback) => {
    return (req, res, next) => {
        const cleanupCallback = () => {
            res.off("finish", runCallback);
            res.off("close", runCallback);
            res.off("error", runCallback);
        };
    
        const runCallback = (err) => {
            callback();
            cleanupCallback();
        }
    
        const cleanupLogging = () => {
            res.off("finish", log);
            res.off("close", log);
            res.off("error", log);
        };
    
        const log = (err) => {
            if (err) {
                logError(err);
            } else {
                logResponse(res);
            }

            console.log();
            cleanupLogging();
        }

        if (process.env.NODE_ENV !== 'production') {
            logger.timestamp();
            logRequest(req);
            res.on("finish", log);
            res.on("close", log);
            res.on("error", log);
        }

        if (callback) {
            res.on("finish", runCallback);
            res.on("close", runCallback);
            res.on("error", runCallback);
        }

        next();
    }
}

module.exports = middleware;