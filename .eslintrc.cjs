module.exports = {
  root: true,
  env: { 
    browser: true, 
    commonjs: true, 
    es2020: true 
  },
  extends: [    
    'standard',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    "airbnb-base",
    "prettier",
  ],
  overrides: [
    {
        env: {
          browser: true,
          node: true,
        },
        files: ['.eslintrc.{js,cjs}'],
        parserOptions: {
            sourceType: 'script',
        },
    },
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}
