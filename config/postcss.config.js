module.exports = {
  // This parser (may or may not) remove inline comments (not allowed in .css): // My Comment
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
