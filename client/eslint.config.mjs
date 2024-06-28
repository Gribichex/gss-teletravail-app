import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["src/**/*.{js,mjs,cjs,jsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: {
    ...globals.browser,
    ...globals.jest,
  } } },
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
