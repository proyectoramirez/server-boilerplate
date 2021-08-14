import fs from 'node:fs';

export const genRemoveSetupFolder = () =>
  fs.promises.rm('./setup', {
    force: true,
    recursive: true,
  });
