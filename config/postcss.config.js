// const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  // This parser (may or may not) remove inline comments (not allowed in .css): // My Comment
  // parser: 'postcss-scss',
  // plugins: {
  //   'postcss-import': {
  //     path: ['src/shared/styles'],
  //   },
  //   'postcss-color-function': {},
  //   'postcss-cssnext': {
  //     browsers: 'last 2 versions',
  //     warnForDuplicates: false,
  //   },
  //   cssnano: {},
  // },
  plugins: [
    //
    require('precss'),
    require('autoprefixer'),
    require('postcss-color-function'),
    require('postcss-import'),
    require('postcss-strip-inline-comments'),
    require('postcss-preset-env')({
      autoprefixer: { grid: true },
      browsers: 'last 2 versions',
      // importFrom: 'path/to/file.css',
      /* use stage 3 features + css color-mod (warning on unresolved) */
      stage: 3,
      features: {
        'color-mod-function': { unresolved: 'warn' },
      },
    }),
  ],
}
