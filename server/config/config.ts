import { env } from 'node:process';

import deepFreeze from 'deep-freeze';

import { argv } from '../utils/argv.js';
import { currentEnvironment, Environment } from '../environment.js';

import { developmentConfiguration } from './environments/development.js';
import { productionConfiguration } from './environments/production.js';
import { baseConfiguration } from './environments/base.js';

export type Configuration = {
	connectionStrings: {
		database: string;
	};
	host: string;
	port: string;
};

const getConfigurationForEnvironment = (
	environment: Environment
): Partial<Configuration> => {
	switch (environment) {
		case Environment.Development:
			return developmentConfiguration;
		case Environment.Production:
			return productionConfiguration;
	}
};

const environmentConfiguration =
	getConfigurationForEnvironment(currentEnvironment);

const finalConfiguration: Configuration = {
	...baseConfiguration,
	...environmentConfiguration,
};

for (const field in finalConfiguration) {
	if (typeof final[field] === 'string' || final[field] instanceof String) {
		final[field] = argv[field] || env[field.toUpperCase()] || final[field];
	}
}

export const configuration = deepFreeze(finalConfiguration);

// TO START MONGO
// "D:\Program Files\MongoDB\Server\4.0\bin\mongod.exe" --dbpath="d:\mongo\db"
