import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginCssImport from "eslint-plugin-css-import-order";
import pluginImport from "eslint-plugin-import";
import turboPlugin from "eslint-plugin-turbo";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginReact from "eslint-plugin-react";
import pluginNext from "@next/eslint-plugin-next";
import pluginTailwindcss from "eslint-plugin-tailwindcss";
import eslintPluginQuery from "@tanstack/eslint-plugin-query";
import vitest from "@vitest/eslint-plugin";
import eslintPluginTestingLibrary from "eslint-plugin-testing-library";
import playwright from "eslint-plugin-playwright";
import * as pluginMdx from "eslint-plugin-mdx";

/** @type {import("eslint").Linter.Config} */
export default tseslint.config(
  { ignores: ["dist"] },
  {
    // files: ['**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    ...pluginImport.flatConfigs.recommended,
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {},
  },
  {
    plugins: {
      "css-import-order": pluginCssImport,
    },
    rules: {
      ...pluginCssImport.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    ...pluginReact.configs.flat.recommended,
    languageOptions: {
      ...pluginReact.configs.flat.recommended.languageOptions,
      globals: {
        ...globals.serviceworker,
        ...globals.browser,
      },
    },
  },
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "react-hooks": pluginReactHooks,
    },
    settings: { react: { version: "detect" } },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      // React scope no longer necessary with new JSX transform.
      "react/react-in-jsx-scope": "off",
    },
  },
  {
    plugins: {
      "@next/next": pluginNext,
    },
    rules: {
      ...pluginNext.configs.recommended.rules,
      ...pluginNext.configs["core-web-vitals"].rules,
    },
  },
  {
    files: ["packages/**/*.{tsx,jsx,ts,js}"],
    rules: {
      "@next/next/no-html-link-for-pages": "off",
    }
  },
  ...pluginTailwindcss.configs["flat/recommended"],
  {
    files: ["**/*.{tsx,jsx}"],
    rules: {
      "tailwindcss/no-custom-classname": "off",
    },
  },
  ...eslintPluginQuery.configs["flat/recommended"],
  {
    files: ["**/?(*.)+(test|spec).{js,jsx,ts,tsx}"],
    plugins: {
      vitest,
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
      "import/namespace": "off",
    },
  },
  {
    files: ["**/?(*.)+(test|spec).{js,jsx,ts,tsx}"],
    ...eslintPluginTestingLibrary.configs["flat/react"],
  },
  {
    ...playwright.configs["flat/recommended"],
    files: ["**/e2e/**/*.test.{js,ts}"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      // Customize Playwright rules
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-object-literal-type-assertion": "off",
    },
  },
  {
    ...pluginMdx.flat,
    extends: [tseslint.configs.disableTypeChecked],
    rules: {
      "@typescript-eslint/consistent-type-exports": "off",
    },
    processor: pluginMdx.createRemarkProcessor({
      lintCodeBlocks: true,
      // optional, if you want to disable language mapper, set it to `false`
      // if you want to override the default language mapper inside, you can provide your own
      languageMapper: {},
    }),
  },
  {
    ...pluginMdx.flatCodeBlocks,
    rules: {
      ...pluginMdx.flatCodeBlocks.rules,
      // if you want to override some rules for code blocks
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  eslintConfigPrettier,
  {
    rules: {
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },
);
