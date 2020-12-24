module.exports = {
    root: true,
    env: {
      node: false
    },
    'extends': [
      'plugin:vue/essential',
      'eslint:recommended'
    ],
    parserOptions: {
      parser: 'babel-eslint'
    },
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-unused-vars': 'off',
      'no-prototype-builtins': 'off',
      'no-cond-assign': 'off',
      'no-useless-escape': 'off',
      'no-undef': 'off'
    }
  }
  