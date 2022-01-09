import { argv } from './utils/argv.js';
import { logger } from './utils/logger.js';

export enum Environment {
	Development,
	Production,
}

const isValidEnvironment = (
	environment: string
): environment is keyof typeof Environment => {
	return environment in Environment;
};

const getCurrentEnvironment = (environment: string): Environment => {
	if (isValidEnvironment(environment)) {
		return Environment[environment];
	}

	if (environment.length !== 0) {
		logger.info('Invalid environment provided. Defaulting to development.');
	}

	return Environment.Development;
};

const currentEnvironmentFromArgv = argv.environment as string;
export const currentEnvironment: Environment = getCurrentEnvironment(
	currentEnvironmentFromArgv
);

export const isDevelopmentEnvironment = (): boolean => {
	return currentEnvironment === Environment.Development;
};
