import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["src/**/*.{js,mjs,cjs,jsx}"] },
  {
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
        process: "readonly"
      },
    },
  },
  {
    settings: {
      react: {
        version: "detect", // This will detect the installed React version
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
];
