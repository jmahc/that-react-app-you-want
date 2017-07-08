import webpack from 'webpack'
import BabiliPlugin from 'babili-webpack-plugin'

import PATHS from './paths.babel'

const vendorConfig = {
  context: process.cwd(),
  name: 'vendor',
  entry: ['react', 'react-dom'],
  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  output: {
    path: PATHS.dll,
    filename: 'vendor.dll.js',
    library: 'vendor_lib_[hash]'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new BabiliPlugin(),
    new webpack.DllPlugin({
      name: 'vendor_lib_[hash]',
      path: PATHS.dllManifest
    })
  ],
  target: 'web'
}

export default vendorConfig
