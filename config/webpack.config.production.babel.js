import glob from 'glob'
import merge from 'webpack-merge'
import webpack from 'webpack'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'
import WebpackChunkHash from 'webpack-chunk-hash'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import PurifyCSSPlugin from 'purifycss-webpack'

import isVendor from './isVendor.babel'
import PATHS from './paths.babel'
import {
  extractCSS,
  minifyJavaScript,
  setFreeVariable
} from './webpack.config.parts.babel'

const productionConfig = merge([
  extractCSS({
    include: PATHS.app,
    exclude: /node_modules/,
    options: {
      config: {
        path: PATHS.postCSS
      }
    }
  }),
  {
    devtool: 'cheap-module-source-map',
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
      new webpack.optimize.ModuleConcatenationPlugin(),
      new PurifyCSSPlugin({
        minimize: false,
        moduleExtensions: ['.html'],
        paths: glob.sync(`${PATHS.app}/**/*.jsx`),
        purifyOptions: {
          info: true,
          rejected: true
        },
        styleExtensions: ['.css']
      }),
      new OptimizeCSSPlugin({
        cssProcessorOptions: {
          safe: true
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        name: 'main'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: isVendor
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        chunks: ['main', 'vendor']
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      }),
      // Keeps the same [chunkhashes] for vendor and manifest files...
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new ChunkManifestPlugin({
        filename: 'chunk-manifest.json',
        // `html-webpack-plugin` will inject the file.
        inlineManifest: true,
        manifestVariable: 'webpackManifest'
      })
    ]
  },
  minifyJavaScript(),
  setFreeVariable('process.env.NODE_ENV', 'production')
])

export default productionConfig
