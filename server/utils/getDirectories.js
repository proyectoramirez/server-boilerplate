import { lstatSync, readdirSync } from 'fs';
import { join } from 'path';

function getDirectories(source) {
  return readdirSync(source).filter((item) =>
    lstatSync(join(source, item)).isDirectory()
  );
}

export default getDirectories;
