import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettier from 'eslint-config-prettier';
import pluginPrettier from 'eslint-plugin-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: {
      js,
      prettier: pluginPrettier,
    },
    extends: ['js/recommended'],
    languageOptions: { globals: globals.browser },
    rules: {
      'prettier/prettier': 'error',
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.js', '.jsx', '.tsx'],
        },
      },
    },
  },
  tseslint.configs.recommended,
  prettier,
]);
