import chalk from 'chalk';
import process from 'node:process';
import readline from 'node:readline';

export const checkMark = (message) => {
  const greenCheckMark = chalk.green('✓');

  process.stdout.write(`${greenCheckMark} ${message}`);
};

export const genAsk = async (question) =>
  new Promise((resolve) => {
    process.stdout.write(`${question} [Y/n] `);
    process.stdin.resume();
    process.stdin.once('data', (pData) => {
      const value = pData.toString().trim();
      const isValueYes = value === 'y' || value === 'Y' || value === '';
      process.stdin.pause();
      resolve(isValueYes);
    });
  });

export const animateProgress = (message, amountOfDots = 3) => {
  let index = 0;
  process.stdout.write(message);

  return setInterval(() => {
    readline.clearLine(process.stdout);
    readline.cursorTo(process.stdout, 0);

    index = (index + 1) % (amountOfDots + 1);
    const dots = '.'.repeat(index);
    process.stdout.write(message + dots);
  }, 500);
};
