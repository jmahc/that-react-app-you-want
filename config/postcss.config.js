module.exports = {
  plugins: [
    require('stylelint')({
      /* your options */
    }),
    require('precss'),
    require('autoprefixer'),
    require('postcss-color-function'),
    require('postcss-import')({
      path: ['src/shared/styles'],
    }),
    require('postcss-strip-inline-comments'),
    require('postcss-preset-env')({
      autoprefixer: { grid: true },
      browsers: 'last 2 versions',
      /* use stage 3 features + css color-mod (warning on unresolved) */
      stage: 3,
      features: {
        'color-mod-function': { unresolved: 'warn' },
      },
    }),
  ],
}
