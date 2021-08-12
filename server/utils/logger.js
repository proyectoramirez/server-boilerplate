/* eslint-disable no-console */
import chalk from 'chalk';
import ip from 'ip';

const divider = chalk.gray('\n-----------------------------------');

export const info = (message) => {
  console.log(chalk.yellow(message));
};

export const error = (error_) => {
  console.error(chalk.red(error_));
};

export const timestamp = () => {
  const date = new Date();
  const timestamp = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`;
  console.log(chalk.bold(timestamp));
};

export const appStarted = (port, host) => {
  console.log(`Server started ! ${chalk.green('✓')}`);
  console.log(
    `${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}\n`
  );
};

export default { appStarted, error, info, timestamp };
