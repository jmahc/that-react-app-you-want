import merge from 'webpack-merge'
import path from 'path'
import webpack from 'webpack'
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import isVendor from './isVendor.babel'
import PATHS from './paths.babel'
import stats from './stats.babel'
import {
  devServer,
  loadCss,
  setFreeVariable
} from './webpack.config.parts.babel'

const isProduction = process.env.NODE_ENV === 'production'
const PORT_NUMBER = process.env.PORT_NUMBER

const developmentConfig = merge([
  devServer({
    port: PORT_NUMBER,
    publicPath: PATHS.publicPath,
    stats
  }),
  loadCss({
    include: PATHS.app,
    exclude: /node_modules/,
    options: {
      config: {
        path: PATHS.postCSS
      }
    }
  }),
  setFreeVariable(
    'process.env.NODE_ENV',
    'development'
  ),
  {
    // This is where `name` comes into play within the
    // `webpack.config.vendor.babel.js` file.
    // dependencies: ['vendor'],
    devtool: '#cheap-module-eval-source-map',
    output: {
      chunkFilename: '[id].chunk.js',
      filename: '[name].js',
      path: PATHS.build,
      pathinfo: true,
      publicPath: PATHS.publicPath
    },
    plugins: [
      // The .gitignore file hides the `dll` folder when using
      // `Atom` (https://atom.io) - so don't be alarmed.
      // Also, don't forget to run:
      // `yarn run dev:dll` or `npm run dev:dll`
      new webpack.DllReferencePlugin({
        context: PATHS.root,
        manifest: PATHS.vendorManifest
      }),
      new AddAssetHtmlPlugin({
        filepath: PATHS.vendorFilepath,
        includeSourceMap: true
      }),
      new CaseSensitivePathsPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin()
      // OPTIONAL - use this with:
      // https://github.com/FormidableLabs/electron-webpack-dashboard
      // Uncomment the import (top of this file) and ignore the
      // `this.input.charCodeAt` error.
      // , new DashboardPlugin()
    ],
    performance: {
      hints: false
    }
  }
])

export default developmentConfig
