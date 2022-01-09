import config from 'config';

export const environmentName = config.util.getEnv('NODE_ENV');

export const isDevelopment = () => {
	return environmentName === 'development';
};
