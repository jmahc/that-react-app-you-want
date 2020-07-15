import path from 'path'
import webpack from 'webpack'

import CompressionPlugin from 'compression-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import PreloadWebpackPlugin from 'preload-webpack-plugin'
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'

import {
  alias,
  // devPerformanceOptions,
  // nodeOptions,
  PATHS,
  stats,
} from './options'

export default function productionWebpack() {
  return {
    bail: true,
    context: PATHS.appSrc,
    devtool: 'source-map',
    target: 'web',
    mode: 'production',
    entry: {
      app: ['babel-polyfill', PATHS.entry],
    },
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js',
      path: PATHS.build,
      publicPath: '/',
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 100000,
      maxEntrypointSize: 100000,
    },
    optimization: {
      concatenateModules: true,
      minimizer: [
        new UglifyJsPlugin({
          parallel: true,
          sourceMap: true,
          extractComments: true,
          uglifyOptions: {
            warnings: false,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            output: null,
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_fnames: false,
          },
        }),
      ],
      namedModules: true,
      namedChunks: true,
      providedExports: true,
      removeEmptyChunks: true,
      sideEffects: true,
      usedExports: true,
      splitChunks: {
        chunks: 'all', // 'all', 'async', 'initial',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            filename: '[name].bundle.js',
            priority: -10,
            reuseExistingChunk: true,
            test: /[\\/]node_modules[\\/]/,
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
        },
      },
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
            /\.ico$/,
            /\.png$/,
            // Add any "extraneous" files to this loader.
            // e.g.:  If `sass/scss` is used with `sass-loader`,
            //        be sure to add the following regex:
            //          /\.(sass|scss)$/
            //        to prevent a '.sass' file from being generated
            //        and therefore, excluded from the application.
            /\.(sass|scss)$/,
            /\.svg$/,
            /\.ejs$/,
          ],
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'file-loader',
              // options: {}
            },
            {
              loader: 'svgo-loader',
              // options: {}
            },
          ],
          include: PATHS.appSrc,
          exclude: PATHS.nodeModules,
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: '[name].[hash:8].[ext]',
          },
        },
        {
          test: /\.css$/,
          include: PATHS.appSrc,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',

              options: {
                config: {
                  path: PATHS.postCssConfig,
                },
              },
            },
          ],
        },
        {
          test: /\.js?$/,
          include: [PATHS.appSrc],
          exclude: [
            /node_modules\/(?!@cli)/,
            // Storybook.
            /.stories.js$/,
            /stories.js$/,
            // Test directories.
            /__tests__/,
            /.test.js$/,
            /.test.js.snap$/,
          ],
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(
                process.cwd(),
                'config',
                'babel.config.js',
              ),
            },
          },
        },
      ],
    },
    devServer: {
      historyApiFallback: true,
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.EnvironmentPlugin([
        'API_PORT',
        'API_URL',
        'APP_PORT',
        'APP_URL',
        'HOST_NAME',
        'OUTPUT_DIR',
      ]),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script',
        include: 'asyncChunks',
      }),
      new HtmlWebpackPlugin({
        chunksSortMode: 'auto',
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
          removeStyleLinkTypeAttributes: false,
          useShortDoctype: false,
        },
        template: PATHS.indexHtml,
        title: 'That React App You Want',
      }),
      // Keeps the same [chunkhashes] for vendor and manifest files...
      new webpack.HashedModuleIdsPlugin(),
      // Specify the chunk/hashing algorithm with 'md5' as the default.
      new WebpackChunkHash({
        algorithm: 'md5',
      }),
      // Inline the chunk manifest alongside 'html-webpack-plugin'.
      // new InlineChunkManifestHtmlWebpackPlugin({
      //   filename: 'manifest.json',
      //   manifestVariable: 'webpackManifest',
      //   chunkManifestVariable: 'webpackChunkManifest',
      //   dropAsset: false,
      // }),
      // Gzip files.
      new CompressionPlugin({
        // asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html)$/,
        threshold: 10240,
        minRatio: 0.8,
      }),
    ],
    stats,
    resolve: {
      alias,
      aliasFields: ['browser'],
      descriptionFiles: ['package.json'],
      enforceExtension: false,
      enforceModuleExtension: false,
      extensions: ['.js', '.json', '.ejs'],
      // mainFields: ['browser', 'module', 'main'],
      mainFiles: ['index'],
      modules: ['node_modules'],
      // Investigate plugins:
      // https://www.npmjs.com/package/directory-named-webpack-plugin
    },
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
      tls: 'empty',
    },
  }
}
