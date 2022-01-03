import { lstatSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export const getDirectories = (source) => {
	return readdirSync(source).filter((item) => {
		return lstatSync(join(source, item)).isDirectory();
	});
};
