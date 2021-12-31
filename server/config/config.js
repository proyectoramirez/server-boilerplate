import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { env } from 'node:process';

import deepFreeze from 'deep-freeze';

import argv from '../utils/argv.js';
import { envName as environmentName } from '../utils/env.js';
import requireOrDefault from '../utils/requireOrDefault.js';

import base from './config-base.js';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const resolvedPath = path.resolve(dirname, `./config-${environmentName}.js`);

const overrides = await requireOrDefault(pathToFileURL(resolvedPath).href);

const final = { ...base, ...overrides };

for (const field in final) {
	if (typeof final[field] === 'string' || final[field] instanceof String) {
		final[field] = argv[field] || env[field.toUpperCase()] || final[field];
	}
}

export const config = deepFreeze(final);

// TO START MONGO
// "D:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\mongo\db"
