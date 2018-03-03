import merge from 'webpack-merge'
import webpack from 'webpack'

import HtmlWebpackPlugin from 'html-webpack-plugin'

import alias from './alias.config'
import PATHS from './paths'
import stats from './stats.babel'
import {
  lintJavaScript,
  loadJavaScript,
  setFreeVariable
} from './webpack.config.parts.babel'

const isProduction = process.env.NODE_ENV === 'production'

const commonsConfig = merge([
  setFreeVariable(
    'process.env.NODE_ENV',
    isProduction ? 'production' : 'development'
  ),
  /*
   * Optional support for linting your JS before webpack builds it.
  */
  // lintJavaScript({
  //   include: PATHS.app,
  //   exclude: PATHS.nodeModules,
  //   options: {
  //     failOnError: false,
  //     failOnWarning: false,
  //     quiet: false
  //   }
  // }),
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
            /\.(js|jsx)$/, // For those who enjoy `.jsx` files.
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/,
            // Add any "extraneous" files to this loader.
            // e.g.:  If `sass/scss` is used with `sass-loader`,
            //        be sure to add the following regex:
            //          /\.(sass|scss)$/
            //        to prevent a '.sass' file from being generated
            //        and therefore, excluded from the application.
            /\.ejs$/
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
        seo: {
          description:
            'This is that React app that you have been searching day and night for - enjoy.',
          image: 'https://avatars3.githubusercontent.com/u/5778136?s=460&v=4',
          title: 'that-react-app-you-want',
          twitter_handle: '@j_mahc',
          url: 'https://github.com/jmahc'
        },
        template: PATHS.indexHtml,
        title: 'That react app you want and just now found.'
      }),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
      alias,
      aliasFields: ['browser'],
      descriptionFiles: ['package.json'],
      enforceExtension: false,
      enforceModuleExtension: false,
      extensions: ['.js', '.json', '.ejs'], // `.jsx` is optional.
      mainFields: ['browser', 'module', 'main'],
      mainFiles: ['index'],
      modules: ['node_modules', PATHS.app, 'containers', 'components'],
      symlinks: true
      // Investigate plugins:
      // https://www.npmjs.com/package/directory-named-webpack-plugin
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
])

export default commonsConfig
