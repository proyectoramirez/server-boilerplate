const express = require("express");
const getDirectories = require("../utils/getDirectories");

const router = express.Router();

getDirectories(__dirname).forEach((item) => {
    let handler = require("./" + item);
    let route = "/" + item;

    router.use(route, handler);
});

router.all("*", (req, res) => {
    res.status(404).json({ error: "No API is available on this path" });
});

module.exports = router;