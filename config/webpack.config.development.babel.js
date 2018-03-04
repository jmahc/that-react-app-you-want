import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'
import merge from 'webpack-merge'
import webpack from 'webpack'

import isVendor from './isVendor'
import PATHS from './paths'
import stats from './stats'
import { devServer, loadCss } from './webpack.config.parts.babel'

const isProduction = process.env.NODE_ENV === 'production'

const developmentConfig = merge([
  /**
   *  `webpack-dev-server` configuration.
   *
   *  `PORT_NUMBER` environment variable is provided in
   *  the `package.json` file's "start" script.
   */
  devServer({
    port: process.env.PORT_NUMBER,
    publicPath: PATHS.publicPath,
    stats
  }),
  /**
   *  Load the project's CSS files utilizing our
   *  PostCSS and the custom PostCSS configuration file.
   */
  loadCss({
    include: PATHS.app,
    exclude: /node_modules/,
    options: {
      config: {
        path: PATHS.postCssConfig
      }
    }
  }),
  {
    output: {
      chunkFilename: '[id].chunk.js',
      filename: '[name].js',
      path: PATHS.build,
      pathinfo: true,
      publicPath: PATHS.publicPath
    },
    plugins: [
      /**
       *  These will reference/tell where `webpack` to point to
       *  when building for "development" and referencing any
       *  dependencies/third-party libraries.
       */
      new webpack.DllReferencePlugin({
        context: PATHS.root,
        manifest: PATHS.vendorManifest
      }),
      /**
       *  Add the DLL libraries filepath to the `public/index.ejs` file.
       */
      new AddAssetHtmlPlugin({
        filepath: PATHS.vendorFilepath,
        includeSourceMap: true
      }),
      new CaseSensitivePathsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin()
    ],
    performance: {
      hints: false
    }
  }
])

export default developmentConfig
