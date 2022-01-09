import config from 'config';

const currentEnvironment = config.util.getEnv('NODE_ENV');

export const isDevelopment = () => {
	return currentEnvironment === 'development';
};
