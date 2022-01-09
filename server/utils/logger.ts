/* eslint-disable no-console */
import chalk from 'chalk';
import ip from 'ip';

const { green, red, yellow, gray, bold, magenta, blue, italic } = chalk;

const DIVIDER_LENGTH = 15;
const DIVIDER = gray('-'.repeat(DIVIDER_LENGTH));

export const logger = {
	appStarted(port: string, host: string) {
		const messageToLog = `Server started! ${green('✓')}
		${bold('Access URLs:')}
		${DIVIDER}
		Localhost: ${magenta(`http://${host}:${port}`)}
		LAN: ${magenta(`http://${ip.address()}:${port}`)}
		${DIVIDER}
		${blue(`Press ${italic('CTRL-C')} to stop`)}`;

		console.log(messageToLog);
	},
	error(errorMessage: string) {
		console.error(red(errorMessage));
	},
	info(message: string) {
		console.log(yellow(message));
	},
	timestamp() {
		const date = new Date();
		const timestampValue = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`;
		console.log(bold(timestampValue));
	},
};
