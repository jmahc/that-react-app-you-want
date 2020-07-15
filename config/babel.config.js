/**
 * This file handles the babel configuration for the front-end/app directory.
 */
module.exports = {
  babelrc: false,
  comments: false,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-export-default-from',
    [
      '@babel/transform-runtime',
      {
        helpers: false,
        regenerator: true,
      },
    ],
    'dynamic-import-node',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': ['./src'],
          '%': ['./src/shared'],
          '#': ['./src/shared/styles'],
          '@constants': ['./src/constants'],
          '@helpers': ['./src/helpers'],
          '@utils': ['./src/utils'],
        },
      },
    ],
  ],
  env: {
    development: {
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
          },
        ],
        '@babel/preset-react',
      ],
      plugins: ['react-hot-loader/babel'],
    },
    production: {
      presets: [
        [
          '@babel/preset-env',
          {
            // modules: false,
            // shippedProposals: true,
            // targets: {
            //   node: 'current',
            // },
            // useBuiltIns: 'usage',
          },
        ],
        '@babel/preset-react',
      ],
    },
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            shippedProposals: true,
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/preset-react',
      ],
      plugins: [],
    },
  },
}
