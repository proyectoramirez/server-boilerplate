const express = require("express");
const api = require("./api");

module.exports = [
    ["/api", api],
    ["/", express.static("public")]
];