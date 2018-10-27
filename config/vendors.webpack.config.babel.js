import path from 'path'
import webpack from 'webpack'
/**
 * NOTE: If there are any errors regarding webpack's entry
 * configuration, check the `config/options/dependencies.js` file
 * for instructions on resolving the errors by excluding the
 * vendor dependency that is throwing an error.
 */
import { vendorEntries } from './options'

export default function vendorsWebpack() {
  const basePath = process.cwd()

  return {
    bail: true,
    devtool: '#source-map',
    target: 'web',
    mode: 'development',
    entry: {
      vendors: vendorEntries,
    },
    output: {
      path: path.join(basePath, 'node_modules', '@that-react-app-you-want/dll'),
      filename: '[name].dll.js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DllPlugin({
        context: __dirname,
        path: path.resolve(
          basePath,
          'node_modules/@that-react-app-you-want/dll',
          '[name]-manifest.json',
        ),
        name: '[name]_[hash]',
      }),
    ],
    optimization: {
      minimize: false,
    },
    performance: {
      hints: false,
    },
  }
}
