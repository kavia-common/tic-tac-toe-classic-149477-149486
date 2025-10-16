import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  // Apply to JS/JSX files
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  // Base language options and globals for browser and tests
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
      globals: {
        document: true,
        window: true,
        test: true,
        expect: true,
        JSX: true,
      },
    },
    rules: {
      // Do not ignore 'App' or other variables; enforce unused vars
      "no-unused-vars": ["error", { args: "after-used", argsIgnorePattern: "^_", varsIgnorePattern: "^_$" }],
    },
  },
  // Recommended JS rules
  pluginJs.configs.recommended,
  // React plugin and rules
  {
    plugins: { react: pluginReact },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      // New JSX transform (no need to import React in scope)
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      // Ensure keys on lists
      "react/jsx-key": "warn",
    },
  },
];
