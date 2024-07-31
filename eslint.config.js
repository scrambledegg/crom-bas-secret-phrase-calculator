import globals from 'globals';
import pluginJs from '@eslint/js';
import { fixupPluginRules } from '@eslint/compat';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactJsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginReactJsxA11y.flatConfigs.recommended,
  {
    plugins: {
      'react-hooks': fixupPluginRules(pluginReactHooks),
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...pluginReactHooks.configs.recommended.rules,
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  },
];
