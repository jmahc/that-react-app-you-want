/*
  This let's you use ES6 with `webpack` by negating the `.babelrc` file.
  NOTE:
    - The `webpack` files have a "webpack.{name}.babel.js" file naming
      convention AND that this file mirrors the `.babelrc` file.
 */
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
          browsers: ['> 1%', 'ie >= 9', 'last 2 versions']
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
