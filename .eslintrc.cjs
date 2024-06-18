module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh','react'],
  rules: {
    
    "no-unused-vars": ["error", { "vars": "local", "args": "after-used", "ignoreRestSiblings": false }],
    "react/jsx-uses-vars": "error",
    "react/jsx-uses-react": "error",
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "react/prop-types": [<enabled/>, { ignore: <ignore/>, customValidators: <customValidator/>, skipUndeclared: <skipUndeclared/> }]
  },
}
