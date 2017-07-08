import merge from 'webpack-merge'
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
            /\.(js|jsx)$/,
            /\.css$/,
            /\.json$/,
            /\.bmp$/,
            /\.gif$/,
            /\.jpe?g$/,
            /\.png$/
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
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
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
        template: PATHS.indexHtml,
        title: 'That react app you want'
      }),
      new webpack.NamedModulesPlugin()
    ],
    resolve: {
      alias: {
        '@': PATHS.app
      },
      descriptionFiles: ['package.json'],
      enforceExtension: false,
      extensions: ['.js', '.jsx', '.json']
    },
    stats,
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
