module.exports = {
  /**
   * This allows you to use ES6 syntax with webpack,
   * as long as you prepend `.babel.js` in lieu of
   * the regular `.js` extension.
   */
  babelrc: false,
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
        useBuiltins: false // 'usage'
      }
    ],
    'stage-2',
    'react'
  ],
  comments: false,
  plugins: ['transform-react-constant-elements'],
  env: {
    development: {
      plugins: ['react-hot-loader/babel']
    }
  }
}
