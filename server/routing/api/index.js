const express = require("express");
const loadPathsIntoRouter = require("@/utils/loadPathsIntoRouter");
const routes = require("./routes");

const router = express.Router();
loadPathsIntoRouter(router, routes);

module.exports = router;