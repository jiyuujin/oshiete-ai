import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier'
import js from '@eslint/js'
import typeScriptESLint from '@typescript-eslint/eslint-plugin'
import typeScriptESLintParser from '@typescript-eslint/parser'
import svelteParser from 'svelte-eslint-parser'
import eslintPluginSvelte from 'eslint-plugin-svelte'

const compat = new FlatCompat()

export default [
  {
    ignores: [
      'node_modules',
      'pnpm-lock.yaml',
      '**/build',
      '**/.svelte-kit',
      '**/*.js',
      '**/*.d.ts',
    ],
  },
  js.configs.recommended,
  eslintConfigPrettier,
  ...compat.extends('plugin:@typescript-eslint/eslint-recommended'),
  ...eslintPluginSvelte.configs['flat/recommended'],
  {
    files: ['**/*.svelte'],
    languageOptions: {
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: svelteParser,
      parserOptions: {
        sourceType: 'module',
        parser: typeScriptESLintParser,
      },
    },
  },
  {
    files: ['**/*.ts'],
    plugins: {
      typeScriptESLint,
    },
    languageOptions: {
      globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
      parser: typeScriptESLintParser,
      parserOptions: {
        sourceType: 'module',
      },
    },
  },
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
    },
  },
]
