import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import Dotenv from 'dotenv-webpack'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'

import { alias, PATHS } from './shared'
import { devServerConfig, stats } from './options'

export default function developmentWebpack() {
  return {
    bail: true,
    context: PATHS.appSrc,
    devtool: '#cheap-module-eval-source-map',
    target: 'web',
    mode: 'development',
    entry: {
      app: ['react-hot-loader/patch', PATHS.entry],
    },
    output: {
      chunkFilename: '[id].chunk.js',
      filename: '[name].js',
      path: PATHS.build,
      pathinfo: true,
      publicPath: PATHS.publicPath,
    },
    devServer: devServerConfig,
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
          test: /\.js?$/,
          include: [PATHS.appSrc],
          exclude: [
            /node_modules\/(?!@vaco_dev\/components)/,
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
          },
        },
      ],
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.EnvironmentPlugin(['API_URL', 'APP_PORT']),
      new webpack.DllReferencePlugin({
        context: __dirname,
        manifest: PATHS.vendors.manifest,
      }),
      new FriendlyErrorsPlugin(),
      new CaseSensitivePathsPlugin(),
      new Dotenv({
        path: PATHS.dotenv.main,
        safe: false,
      }),
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
          useShortDoctype: true,
        },
        seo: {
          description:
            'This is that React app that you have been searching day and night for - enjoy.',
          image: 'https://avatars3.githubusercontent.com/u/5778136?s=460&v=4',
          title: 'that-react-app-you-want',
          twitter_handle: '@j_mahc',
          url: 'https://github.com/jmahc',
        },
        template: PATHS.indexHtml,
        title: 'That react app you want and just now found.',
      }),
      new AddAssetHtmlPlugin({
        filepath: PATHS.vendors.filepath,
        includeSourceMap: true,
      }),
    ],
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
    stats,
    performance: {
      hints: false,
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
