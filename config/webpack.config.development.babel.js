import merge from 'webpack-merge'
import path from 'path'
import webpack from 'webpack'
import AddAssetHtmlPlugin from 'add-asset-html-webpack-plugin'
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
    // dependencies: ['vendor'],
    devtool: '#cheap-module-eval-source-map',
    output: {
      chunkFilename: '[id].chunk.js',
      filename: '[name].js',
      path: PATHS.build,
      publicPath: PATHS.publicPath
    },
    plugins: [
      // The .gitignore file hides the `dll` folder when using
      // `Atom` (https://atom.io) - so don't be alarmed.
      // Also, don't forget to run:
      // `yarn run dev:dll` or `npm run dev:dll`
      new webpack.DllReferencePlugin({
        context: PATHS.root,
        // `require` is key here!
        manifest: require.resolve('../dll/vendors-manifest.json')
      }),
      new AddAssetHtmlPlugin(
        {
          filepath: require.resolve('../dll/vendors.dll.js'),
          includeSourceMap: true
        }
      ),
      // TODO - this is causing the `babylon` errors!
      new DashboardPlugin({ port: PORT_NUMBER }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new FriendlyErrorsPlugin()
    ]
  }
])

export default developmentConfig
