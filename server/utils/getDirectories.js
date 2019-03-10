const { lstatSync, readdirSync } = require("fs");
const { join } = require("path");

function getDirectories(source) {
    return readdirSync(source).filter(item => lstatSync(join(source, item)).isDirectory())
}

module.exports = getDirectories;