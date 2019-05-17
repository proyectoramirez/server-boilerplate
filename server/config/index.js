const argv = require("@/utils/argv");
const { envName } = require("@/utils/env");
const requireOrDefault = require("@/utils/requireOrDefault");

const base = require("./config.json");
const overrides = requireOrDefault(`./config.${envName}.json`);

const final = { ...base, ...overrides };

for (field in final) {
    if (typeof final[field] === 'string' || myVar instanceof String) {
        final[field] = argv[field] || process.env[field.toUpperCase()] || final[field];
    }
}

module.exports = final;

//TO START MONGO
//"D:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\mongo\db"