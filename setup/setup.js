import process from 'process';
import { genRemoveSetupFolder } from './cleanup.js';
import { genInstallDependencies } from './dependencies.js';
import { genAsk, checkMark, animateProgress } from './helpers/script.js';
import {
  genCreateRepository,
  genHasRepo,
  genRemoveRepository,
} from './repository.js';

// const ORIGIN_REGEX = /proyectoramirez\/server-boilerplate\.git/;

const genMaybeClearRepositoryProcedure = async () => {
  const hasRepo = await genHasRepo();

  if (!hasRepo) {
    return false;
  }

  const shouldClearRepo = await genAsk('Do you want to clear old repository?');

  if (!shouldClearRepo) {
    checkMark('Leaving your repository untouched\n\n');

    return false;
  }

  const interval = animateProgress('Removing old repository');

  await genRemoveRepository();

  clearInterval(interval);
  process.stdout.write('\n');
  checkMark('Removed old repository\n\n');

  return true;
};

const genInstallDependenciesProcedure = async () => {
  const interval = animateProgress(
    'Installing dependencies (This might take a while)'
  );

  try {
    await genInstallDependencies();
  } finally {
    clearInterval(interval);
  }

  process.stdout.write('\n');
  checkMark('Dependencies installed\n\n');
};

const genCreateRepositoryProcedure = async () => {
  const interval = animateProgress('Initialising new repository');

  await genCreateRepository();

  clearInterval(interval);
  process.stdout.write('\n');
  checkMark('New repository initialized\n\n');
};

const genCleanupProcedure = async () => {
  const interval = animateProgress('Removing setup files');

  await genRemoveSetupFolder();

  clearInterval(interval);
  process.stdout.write('\n');
  checkMark('Setup files removed\n\n');
};

process.stdin.setEncoding('utf8');

const wasRepositoryRemoved = await genMaybeClearRepositoryProcedure();

await genInstallDependenciesProcedure();

if (wasRepositoryRemoved) {
  await genCreateRepositoryProcedure();
}

await genCleanupProcedure();

process.stdout.write('Done!');
