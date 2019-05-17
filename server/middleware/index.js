const express = require("express");
const { isDev } = require("@/utils/env");

const router = express.Router();

loadCommonMiddleware();

if (isDev) {
    loadDevMiddleware();
} else {
    loadProdMiddleware();
}

module.exports = router;

function loadCommonMiddleware() {

}

function loadDevMiddleware() {
    const httpLogger = require("./httpLogger");

    router.use(httpLogger());
}

function loadProdMiddleware() {

}