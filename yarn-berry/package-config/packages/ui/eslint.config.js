import {
  baseConfig,
  importConfig,
  reactConfig,
  turboConfig,
//   jestConfig,
//   mdxConfig,
//   playwrightConfig,
//   reactQueryConfig,
//   reactTestingLibraryConfig,
//   storybookConfig,
//   tailwindConfig,
//   vitestConfig,
  prettierConfig,
} from '@repo/eslint-config';

/** @type {import("eslint").Linter.Config} */
export default [
  ...baseConfig,
  ...importConfig,
  ...turboConfig,
  ...reactConfig,
//   ...jestConfig,
//   ...mdxConfig,
//   ...playwrightConfig,
//   ...reactQueryConfig,
//   ...reactTestingLibraryConfig,
//   ...storybookConfig,
//   ...tailwindConfig,
//   ...vitestConfig,
  ...prettierConfig,
];
