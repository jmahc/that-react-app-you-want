import merge from 'webpack-merge'
import webpack from 'webpack'
import DashboardPlugin from 'webpack-dashboard/plugin'
import FriendlyErrorsPlugin from 'friendly-errors-webpack-plugin'

import isVendor from './isVendor.babel'
import PATHS from './paths.babel'
import stats from './stats.babel'
import { devServer, loadCSS } from './webpack.config.parts.babel'

const PORT_NUMBER = process.env.PORT_NUMBER

const developmentConfig = merge([
  devServer({
    port: PORT_NUMBER,
    publicPath: PATHS.publicPath,
    stats
  }),
  loadCSS({
    include: PATHS.app,
    exclude: /node_modules/,
    options: {
      config: {
        path: PATHS.postCSS
      }
    }
  }),
  {
    // This is where `name` comes into play within the
    // `webpack.config.vendor.babel.js` file.
    dependencies: ['vendor'],
    devtool: '#cheap-module-eval-source-map',
    output: {
      chunkFilename: '[id].chunk.js',
      filename: '[name].js',
      path: PATHS.build,
      publicPath: PATHS.publicPath
    },
    plugins: [
      new webpack.DllReferencePlugin({
        manifest: PATHS.dllManifest
      }),
      new DashboardPlugin({ port: PORT_NUMBER }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin()
    ]
  }
])

export default developmentConfig
