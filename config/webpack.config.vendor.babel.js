import webpack from 'webpack'
/**
 * NOTE: If there are any errors regarding webpack's entry
 * configuration, check the `config/dependencies.babel.js` file
 * for instructions on resolving the errors by excluding the
 * vendor dependency that is throwing an error.
 */
import entries from './dependencies.babel'
import PATHS from './paths.babel'

// NOTE: The library and the plugin's filename MUST match.
const vendorLibraryName = 'vendors_lib'

const vendorConfig = {
  context: PATHS.root,
  devtool: '#source-map',
  entry: entries,
  output: {
    filename: 'vendors.dll.js',
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
