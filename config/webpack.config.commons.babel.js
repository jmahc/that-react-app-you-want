import merge from 'webpack-merge'
import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import { lintJavaScript, loadJavaScript } from './webpack.config.parts.babel'
import PATHS from './paths.babel'
import stats from './stats.babel'

const isProduction = process.env.NODE_ENV === 'production'

const commonsConfig = merge([
  {
    bail: true,
    context: PATHS.app,
    entry: {
      app: [isProduction ? PATHS.polyfills : 'react-hot-loader/patch', PATHS.app]
    },
    module: {
      rules: [
        {
          exclude: [
            /\.html$/,
            /\.(js|jsx)$/,
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
          description: 'This is a description of the website.',
          image: 'http://my-website.lol/og-image.jpg',
          title: 'that-react-app-you-want',
          twitter_handle: '@myTwitterHandle',
          url: 'http://my-website.lol/'
        },
        template: PATHS.indexHtml,
        title: 'That react app you want'
      }),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
      alias: {
        '@': PATHS.app
      },
      aliasFields: ['browser'],
      descriptionFiles: ['package.json'],
      enforceExtension: false,
      enforceModuleExtension: false,
      extensions: ['.js', '.jsx', '.json'],
      mainFields: ['browser', 'module', 'main'],
      mainFiles: ['index'],
      modules: [PATHS.app, 'node_modules'],
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
  },
  lintJavaScript({
    include: PATHS.app,
    exclude: PATHS.nodeModules,
    options: {
      failOnError: false,
      failOnWarning: false,
      quiet: false
    }
  }),
  loadJavaScript({
    include: PATHS.app,
    exclude: /node_modules/,
    query: PATHS.babelConfig
  })
])

export default commonsConfig
