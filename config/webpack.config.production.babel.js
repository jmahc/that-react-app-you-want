import glob from 'glob'
import merge from 'webpack-merge'
import webpack from 'webpack'

import BabiliPlugin from 'babili-webpack-plugin'
// import BundleBuddyWebpackPlugin from 'bundle-buddy-webpack-plugin'
// import ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'
import InlineManifestWebpackPlugin from 'inline-manifest-webpack-plugin'
import OptimizeCSSPlugin from 'optimize-css-assets-webpack-plugin'
import PreloadWebpackPlugin from 'preload-webpack-plugin'
import PurifyCSSPlugin from 'purifycss-webpack'
import WebpackChunkHash from 'webpack-chunk-hash'

import isVendor from './isVendor.babel'
import PATHS from './paths.babel'
import {
  extractCSS,
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
      // TODO - Contains an issue with `extract-text-webpack-plugin`
      // however, separate.  With it commented out, it "builds", but the
      // `extract-text-webpack-plugin` error is still thrown.
      // new BundleBuddyWebpackPlugin({
      //   sam: true,
      //   warnings: true
      // }),
      new PreloadWebpackPlugin({
        rel: 'preload',
        as: 'script',
        include: 'asyncChunks'
      }),
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

      // JavaScript minification
      new BabiliPlugin(),

      // Keeps the same [chunkhashes] for vendor and manifest files...
      new webpack.HashedModuleIdsPlugin(),
      new WebpackChunkHash(),
      new InlineManifestWebpackPlugin({
        name: 'webpackManifest'
      })
    ]
  },
  setFreeVariable('process.env.NODE_ENV', 'production')
])

export default productionConfig
