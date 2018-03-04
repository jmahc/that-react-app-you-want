/**
 * A PostCSS configuration file for Webpack.
 * You will find this configuration object used by `postcss-loader`.
 */
module.exports = {
  /**
   * TODO
   * This parser (may or may not) remove inline comments (not allowed in .css).
   * Work in progress as of 03/04/2018 - Jordan McArdle.
   */
  parser: 'postcss-scss',
  plugins: {
    'postcss-import': {
      path: ['src/shared/styles']
    },
    'postcss-color-function': {},
    'postcss-cssnext': {
      browsers: 'last 2 versions',
      warnForDuplicates: false
    },
    cssnano: {}
  }
}
