import compareVersions from 'compare-versions';
import process from 'node:process';
import { genExec } from './helpers/genExec.js';

const MINIMUM_NODE_VERSION = '8.10.0';
const MINIMUM_NPM_VERSION = '5.0.0';
const NPM_VERSION_COMMAND = 'npm --version';

const isVersionLower = (currentVersion, referenceVersion) =>
  compareVersions.compare(currentVersion, referenceVersion, '<');

const assertValidNodeVersion = () => {
  const nodeVersion = process.version;

  if (isVersionLower(nodeVersion, MINIMUM_NODE_VERSION)) {
    throw new Error(
      `[ERROR] You need Node.js v${MINIMUM_NODE_VERSION} or above but you have ${nodeVersion}`
    );
  }
};

const genAssertValidNpmVersion = async () => {
  const { stdout: npmVersion } = await genExec(NPM_VERSION_COMMAND);

  if (isVersionLower(npmVersion, MINIMUM_NPM_VERSION)) {
    throw new Error(
      `[ERROR] You need npm v${MINIMUM_NPM_VERSION} or above but you have v${npmVersion}`
    );
  }
};

const genAssertValidToolsVersion = async () => {
  assertValidNodeVersion();
  await genAssertValidNpmVersion();
};

export const genInstallDependencies = async () => {
  await genAssertValidToolsVersion();
  await genExec('npm install');
};
