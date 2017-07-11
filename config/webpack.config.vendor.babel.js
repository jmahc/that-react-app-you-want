import path from 'path'
import webpack from 'webpack'
import BabiliPlugin from 'babili-webpack-plugin'

import PATHS from './paths.babel'

const vendorConfig = {
  context: process.cwd(),
  devtool: '#source-map',
  entry: [
    'react',
    'react-dom',
    'prop-types',
    'promise'
  ],
  output: {
    filename: 'vendors.dll.js',
    library: 'vendors_lib',
    path: path.resolve(process.cwd(), 'dll')
  },
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DllPlugin({
      name: 'vendors_lib',
      path: path.resolve(process.cwd(), 'dll/vendors-manifest.json')
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
