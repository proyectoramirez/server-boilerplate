import minimist from 'minimist';

const ARGUMENTS_TO_SKIP = 2;

export const argv = minimist(process.argv.slice(ARGUMENTS_TO_SKIP));
