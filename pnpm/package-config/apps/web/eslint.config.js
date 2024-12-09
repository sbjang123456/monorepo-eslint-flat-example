import {
    baseConfig,
    importConfig,
    nextJsConfig,
    reactConfig,
    turboConfig,
    prettierConfig,
  } from '@repo/eslint-config';
  
  /** @type {import("eslint").Linter.Config} */
  export default [
    ...baseConfig,
    ...importConfig,
    ...turboConfig,
    ...reactConfig,
    ...nextJsConfig,
    ...prettierConfig,
  ];
  