const isProduction = process.env.NODE_ENV === 'production'

// This let's you use es6 with webpack...
module.exports = {
  babelrc: false,
  presets: [
    [
      'es2015',
      {
        loose: true,
        modules: false
      }
    ],
    [
      'env',
      {
        browsers: 'last 1 Chrome version',
        loose: true,
        modules: false
      }
    ],
    'stage-0',
    'react'
  ],
  comments: false,
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
}
