/**
 * This file handles the babel configuration for the API/server directory.
 */
module.exports = {
  comments: false,
  presets: [
    [
      '@babel/preset-env',
      {
        // "loose": true,
        // "spec": false,
        shippedProposals: true,
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
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
    test: {
      presets: [
        [
          '@babel/preset-env',
          {
            spec: false,
            targets: {
              node: 'current',
            },
            useBuiltIns: false,
          },
        ],
      ],
    },
  },
}
