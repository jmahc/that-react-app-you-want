import path from 'path'
import webpack from 'webpack'

import PATHS from './paths.babel'

const vendorConfig = {
  context: process.cwd(),
  devtool: '#source-map',
  entry: [
    // React
    'react',
    'react-dom',
    'prop-types',

    // Redux
    'redux',
    'redux-immutable',
    'redux-api-middleware',

    // Libraries
    'promise'
  ],
  output: {
    filename: 'vendors.dll.js',
    library: 'vendors_lib',
    path: path.resolve(PATHS.root, 'dll')
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllPlugin({
      name: 'vendors_lib',
      path: path.resolve(PATHS.root, 'dll/vendors-manifest.json')
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
