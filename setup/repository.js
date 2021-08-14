import fs from 'fs';
import { genExec } from './helpers/genExec.js';

const GIT_FOLDER = './.git';

export const genHasRepo = async () => {
  try {
    await fs.promises.access(GIT_FOLDER, fs.constants.F_OK);

    return true;
  } catch {
    return false;
  }
};

export const genRemoveRepository = () =>
  fs.promises.rm(GIT_FOLDER, {
    force: true,
    recursive: true,
  });

export const genCreateRepository = () =>
  genExec('git init && git add . && git commit -m "Initial commit"');
