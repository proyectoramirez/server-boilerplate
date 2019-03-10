const chalk = require("chalk");
const ip = require("ip");

const divider = chalk.gray('\n-----------------------------------');

const info = msg => {
    console.log(chalk.yellow(msg));
}

const error = err => {
    console.error(chalk.red(err));
}

const timestamp = () => {
    let date = new Date();
    let timestamp = `[${date.toLocaleDateString()} ${date.toLocaleTimeString()}]`
    console.log(chalk.bold(timestamp));
}

const appStarted = (port, host) => {
    console.log(`Server started ! ${chalk.green('✓')}`);
    console.log(
        `${chalk.bold('Access URLs:')}${divider}
Localhost: ${chalk.magenta(`http://${host}:${port}`)}
LAN: ${chalk.magenta(`http://${ip.address()}:${port}`)}${divider}
${chalk.blue(`Press ${chalk.italic('CTRL-C')} to stop`)}\n`
    );
}

module.exports = { info, error, appStarted, timestamp };