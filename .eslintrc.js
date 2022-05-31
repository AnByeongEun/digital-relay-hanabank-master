module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: 'eslint:recommended',
  // extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    semi: ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    indent: ['error', 2, {
      SwitchCase: 1,
      VariableDeclarator: 1,
      outerIIFEBody: 1,
      // MemberExpression: null,
      FunctionDeclaration: {
        parameters: 1,
        body: 1,
      },
      FunctionExpression: {
        parameters: 1,
        body: 1,
      },
      CallExpression: {
        arguments: 1,
      },
      ArrayExpression: 1,
      ObjectExpression: 1,
      ImportDeclaration: 1,
      flatTernaryExpressions: false,
      // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
      ignoredNodes: ['JSXElement', 'JSXElement > *', 'JSXAttribute', 'JSXIdentifier', 'JSXNamespacedName', 'JSXMemberExpression', 'JSXSpreadAttribute', 'JSXExpressionContainer', 'JSXOpeningElement', 'JSXClosingElement', 'JSXFragment', 'JSXOpeningFragment', 'JSXClosingFragment', 'JSXText', 'JSXEmptyExpression', 'JSXSpreadChild'],
      ignoreComments: false,
    }],
    'max-len': ['error', 120, 2, {
      ignoreUrls: true,
      ignoreComments: false,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }],

    'array-bracket-newline': ['off', 'consistent'],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { before: false, after: true }],
    'comma-style': ['error', 'last'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { allowSingleLine: true }],
    'func-call-spacing': ['error', 'never'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
    'keyword-spacing': ['error', {
      before: true,
      after: true,
      overrides: {
        return: { after: true },
        throw: { after: true },
        case: { after: true },
      },
    }],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: false }],
    'padded-blocks': ['error', {
      blocks: 'never',
      classes: 'never',
      switches: 'never',
    }, {
      allowSingleLineBlocks: true,
    }],
    'space-infix-ops': 'error',
    'nonblock-statement-body-position': ['error', 'beside', { overrides: {} }],
    'object-curly-spacing': ['error', 'always'],
    'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],
    'semi-spacing': ['error', { before: false, after: true }],
    'space-before-blocks': 'error',
    'space-in-parens': ['error', 'never'],
    'spaced-comment': ['error', 'always', {
      line: {
        exceptions: ['-', '+'],
        markers: ['=', '!', '/'], // space here to support sprockets directives, slash for TS /// comments
      },
      block: {
        exceptions: ['-', '+'],
        markers: ['=', '!', ':', '::'], // space here to support sprockets directives and flow comment types
        balanced: true,
      },
    }],
    'space-unary-ops': ['error', {
      words: true,
      nonwords: false,
      overrides: {
      },
    }],
    'switch-colon-spacing': ['error', { after: true, before: false }],
    'one-var': ['error', 'never'],
    'prefer-template': 'error',
    'template-curly-spacing': ['error', 'never'],

    // 'no-plusplus': 'error',
    'no-trailing-spaces': ['error', {
      skipBlankLines: false,
      ignoreComments: false,
    }],
    'no-whitespace-before-property': 'error',
    'no-array-constructor': 'error',
    'no-new-object': 'error',
    'no-mixed-spaces-and-tabs': 'error',
    'no-multi-assign': ['error'],
    'no-multi-spaces': ['error', {
      ignoreEOLComments: false,
    }],
    'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
    'no-param-reassign': 'error',
    'no-eval': 'error',
    'no-unused-vars': ['off'],
    'no-useless-escape': 'error',
    'no-console': 'off',
  },
};
