const express = require("express");
const loadPathsIntoRouter = require("@/utils/loadPathsIntoRouter");
const api = require("./api");

const routes = [
    ["/api", api],
    ["/", express.static("public")]
];


module.exports = loadPathsIntoRouter(routes);