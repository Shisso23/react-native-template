module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true,
        jest: true
    },
    globals: {
        __DEV__: true
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    extends: [
        'react-native',
        'esnext',
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:jest/recommended',
        'prettier'
    ],
    plugins: ['babel', 'react', 'react-native', 'jest', 'prettier'],
    settings: {
        react: {
            version: '16.5.2'
        }
    },
    rules: {
        'no-invalid-this': 'warn',

        'no-use-before-define': 'off',
        'class-methods-use-this': 'off',
        'react-native/split-platform-components': 'off',
        semi: ['error', 'always'],
        'no-console': [
            'error',
            {
                allow: ['warn', 'error']
            }
        ],
        'react/jsx-handler-names': 'off',
        'import/no-namespace': 'off',
        'import/namespace': 'off',
        'import/prefer-default-export': 'off',
        'import/default': 'off',
        'react/prefer-stateless-function': 'off',
        'react/no-did-mount-set-state': 'off',
        'react/no-did-update-set-state': 'off',
        'react/jsx-curly-brace-presence': [
            'error',
            {
                props: 'never',
                children: 'ignore'
            }
        ],
        'jest/no-identical-title': 'error',
        'arrow-parens': ['error', 'always'],
        'prettier/prettier': 'error'
    },
    overrides: [
        {
            files: ['babel.config.js', 'metro.config.js', 'react-native.config.js'],
            rules: {
                'import/no-commonjs': 'off'
            }
        }
    ]
};
