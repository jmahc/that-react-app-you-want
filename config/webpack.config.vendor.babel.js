import webpack from 'webpack'

import PATHS from './paths.babel'

const vendorFileName = 'vendors.dll.js'
// NOTE: The library and the plugin's filename MUST match.
const vendorLibraryName = 'vendors_lib'

const vendorConfig = {
  context: PATHS.root,
  devtool: '#source-map',
  entry: [
    // React
    'react',
    'react-dom',
    'prop-types',

    // Libraries
    'promise'
  ],
  output: {
    filename: vendorFileName,
    library: vendorLibraryName,
    path: PATHS.dll
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllPlugin({
      name: vendorLibraryName,
      path: PATHS.vendorManifest
    })
  ],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  target: 'web'
}

export default vendorConfig
