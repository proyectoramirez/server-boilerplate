import fs from 'node:fs';

export const genRemoveSetupFolder = () =>
  fs.promises.rm('./internal/setup', {
    force: true,
    recursive: true,
  });
