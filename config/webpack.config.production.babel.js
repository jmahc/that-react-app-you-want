import glob from 'glob'
import merge from 'webpack-merge'
import webpack from 'webpack'

import InlineChunkManifestHtmlWebpackPlugin from 'inline-chunk-manifest-html-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import PreloadWebpackPlugin from 'preload-webpack-plugin'
import PurifyCSSPlugin from 'purifycss-webpack'
import WebpackChunkHash from 'webpack-chunk-hash'

import isVendor from './isVendor.babel'
import PATHS from './paths.babel'
import { extractCss, setFreeVariable } from './webpack.config.parts.babel'

const productionConfig = merge([
  extractCss({
    include: PATHS.app,
    exclude: /node_modules/,
    options: {
      config: {
        path: PATHS.postCSS
      }
    }
  }),
  setFreeVariable('process.env.NODE_ENV', 'production'),
  {
    devtool: 'source-map',
    output: {
      chunkFilename: '[name].[chunkhash].js',
      filename: '[name].[chunkhash].js',
      path: PATHS.build,
      publicPath: PATHS.publicPath
    },
    performance: {
      hints: 'warning',
      maxAssetSize: 100000,
      maxEntrypointSize: 100000
    },
    plugins: [
      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script',
        include: 'asyncChunks'
      }),
      new webpack.optimize.ModuleConcatenationPlugin(),
      // Remove unused CSS.
      new PurifyCSSPlugin({
        minimize: false,
        moduleExtensions: ['.html'],
        paths: glob.sync(`${PATHS.app}/**/*.jsx`),
        purifyOptions: {
          info: true,
          minify: true,
          output: false,
          rejected: true
          // Using a third-party library?
          // Whitelist it here if all the classnames
          // start with the same prefix
          // , whitelist: ['*thirdPartyPrefix*']
        },
        styleExtensions: ['.css']
      }),
      // Further CSS optimizations.
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      // Identify the application's "chunks".
      new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        name: 'app'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: isVendor
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['app', 'vendor']
      }),
      // JavaScript minification
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
          screw_ie8: true,
          unused: true,
          dead_code: true, // discard unreachable code
          drop_debugger: true, // discard debugger statements
          warnings: false // warn about potentially dangerous optimizations/code
        },
        sourceMap: true,
        comments: false
      }),
      // Keeps the same [chunkhashes] for vendor and manifest files...
      new webpack.HashedModuleIdsPlugin(),
      // Specify the chunk/hashing algorithm with 'md5' as the default.
      new WebpackChunkHash({
        algorithm: 'md5'
      }),
      // Inline the chunk manifest alongside 'html-webpack-plugin'.
      new InlineChunkManifestHtmlWebpackPlugin({
        filename: 'manifest.json',
        manifestVariable: 'webpackManifest',
        chunkManifestVariable: 'webpackChunkManifest',
        dropAsset: false
      }),
      // Gzip files.
      new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.(js|css|html)$/,
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  }
])

export default productionConfig
