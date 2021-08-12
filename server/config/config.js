import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import deepFreeze from 'deep-freeze';
import argv from '../utils/argv.js';
import { envName as environmentName } from '../utils/env.js';
import requireOrDefault from '../utils/requireOrDefault.js';
import base from './config.base.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const resolvedPath = path.resolve(__dirname, `./config.${environmentName}.js`);

const overrides = await requireOrDefault(pathToFileURL(resolvedPath).href);

const final = { ...base, ...overrides };

for (const field in final) {
  if (typeof final[field] === 'string' || final[field] instanceof String) {
    final[field] =
      argv[field] || process.env[field.toUpperCase()] || final[field];
  }
}

const frozen = deepFreeze(final);

export default frozen;

// TO START MONGO
// "D:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\mongo\db"
