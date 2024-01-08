import {pathsToModuleNameMapper} from 'ts-jest';
import {readFile} from 'fs/promises';
import {existsSync} from 'fs';

const tsConfig = existsSync(`tsconfig.tests.json`)
? JSON.parse(await readFile(`./tsconfig.tests.json`, `utf-8`))
: JSON.parse(await readFile(`./tests/tsconfig.json`, `utf-8`));

/** @type {import('jest').Config} */
export default {
  testEnvironment: `node`,
  transform: {
    "^.+\\.(t|j)sx?$": `@swc/jest`
  },
  coveragePathIgnorePatterns: [`/node_modules/`, `/dist/`, `/tests/`],
  collectCoverageFrom: [`./src/**/*.ts`],
  coverageReporters: [`text`, `html`],
  modulePathIgnorePatterns: [`dist`],
  moduleNameMapper: pathsToModuleNameMapper(
    tsConfig.compilerOptions.paths,
    { prefix: `<rootDir>/../` }
  )
};
