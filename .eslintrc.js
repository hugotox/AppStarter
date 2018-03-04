module.exports = {
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb'
  ],
  'env': {
    'jest': true
  },
  'rules': {
    'max-len': ["error", { "code": 120 }],
    'no-plusplus': 0,
    'no-console': 0,
    'import/prefer-default-export': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'prefer-template': 0,
    'prefer-destructuring': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/jsx-filename-extension': 0,
    'react/self-closing-comp': 0,
    'react/forbid-prop-types': 0,
    'react/prefer-stateless-function': 0,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'no-nested-ternary': 0,
    'comma-dangle': 0,
    'arrow-parens': 0,
    'function-paren-newline': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/label-has-for': [2, {
      'components': ['Label'],
      'required': {
        'some': ['nesting', 'id']
      },
      'allowChildren': false,
    }]
  }
};
