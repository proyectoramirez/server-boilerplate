const express = require("express");
const api = require("./api");

const router = express.Router();

router.use("/api", api);
router.use("/", express.static("public"));

module.exports = router;