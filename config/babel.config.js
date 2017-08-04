// This let's you use es6 with webpack...
module.exports = {
  babelrc: false,
  presets: [
    [
      'es2015',
      {
        loose: true
      }
    ],
    [
      'env',
      {
        loose: true,
        modules: false,
        spec: false,
        targets: {
          browsers: ['last 1 chrome versions']
        },
        useBuiltIns: true
      }
    ],
    'stage-0',
    'react'
  ],
  plugins: ['transform-react-constant-elements'],
  comments: false,
  env: {
    production: {
      presets: [
        [
          'env',
          {
            loose: true,
            modules: false,
            spec: false,
            targets: {
              browsers: ['> 1%', 'ie >= 9', 'last 2 versions']
            },
            useBuiltIns: true
          }
        ],
        'stage-0',
        'react'
      ]
    },
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
}
