import HtmlWebpackPlugin from 'html-webpack-plugin'
import merge from 'webpack-merge'
import webpack from 'webpack'

import alias from './alias.config'
import PATHS from './paths'
import seo from './seo.config'
import stats from './stats'
import {
  lintJavaScript,
  loadJavaScript,
  setFreeVariable
} from './webpack.config.parts.babel'

const isProduction = process.env.NODE_ENV === 'production'

const commonsConfig = [
  /**
   *  Sets a "free" variable to be used across the application.
   */
  setFreeVariable(
    'process.env.NODE_ENV',
    isProduction ? 'production' : 'development'
  ),
  /**
   *  The JavaScript loader that utilizes the `babel.config.js`
   *  file located in the `config` directory.
   */
  loadJavaScript({
    include: PATHS.app,
    exclude: /node_modules/,
    query: PATHS.babelConfig
  }),
  {
    bail: true,
    context: PATHS.app,
    devtool: isProduction ? 'source-map' : '#cheap-module-eval-source-map',
    entry: {
      app: [
        isProduction ? PATHS.polyfills : 'react-hot-loader/patch',
        PATHS.app
      ]
    },
    module: {
      rules: [
        {
          exclude: [
            /\.html$/,
            // For those who prefer `.jsx` files.
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/,
            // The `public/index.ejs` file uses this file extension.
            /\.ejs$/
            /**
             *  Add any "extraneous" files to this loader that you
             *  wish to include into your project.
             *
             *  - For example:
             *  If you are using `sass/scss` in combination with the
             *  `sass-loader`, be sure to add the following regex
             *  to prevent a '.sass' file from being generated and
             *  excluded from the application:
             *
             *  /\.(sass|scss)$/
             *
             */
          ],
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]'
          }
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:8].[ext]'
          }
        }
      ]
    },
    plugins: [
      /**
       *  These libraries are commonly found as dependencies
       *  of other libraries. Ignore these specifically
       *  to lighten the load of the bundle.
       */
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new HtmlWebpackPlugin({
        chunksSortMode: 'dependency',
        favicon: PATHS.favicon,
        filename: 'index.html',
        inject: true,
        minify: {
          collapseWhitespace: true,
          keepClosingSlash: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeRedundantAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        seo,
        template: PATHS.indexHtml,
        title: 'Update me in `config/webpack.config.commons.babel.js`.'
      }),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
      alias,
      aliasFields: ['browser'],
      descriptionFiles: ['package.json'],
      enforceExtension: false,
      enforceModuleExtension: false,
      // `.jsx` is optional here.
      extensions: ['.js', '.jsx', '.json', '.ejs'],
      mainFields: ['browser', 'module', 'main'],
      mainFiles: ['index'],
      modules: ['node_modules', PATHS.app, 'containers', 'components'],
      symlinks: true
      /**
       *  TODO
       *  Investigate plugins:
       *  - https://www.npmjs.com/package/directory-named-webpack-plugin
       */
    },
    stats,
    node: {
      console: false,
      global: true,
      process: true,
      __filename: false,
      __dirname: false,
      Buffer: false,
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    target: 'web'
  }
]

/*
 * Optional support for linting your JS before webpack builds it.
 * In the `package.json` "scripts" section, flag `ENABLE_LINTING`
 * to true/false to enable/disable the linter.
 */
if (process.env.ENABLE_LINTING) {
  // This will prepend the linter to the `commonsConfig` array.
  commonsConfig.unshift(
    lintJavaScript({
      include: PATHS.app,
      exclude: PATHS.nodeModules,
      options: {
        failOnError: false,
        failOnWarning: false,
        quiet: false
      }
    })
  )
}

export default merge(commonsConfig)
