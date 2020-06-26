import path from 'path'
import webpack from 'webpack'

/**
 * NOTE: If there are any errors regarding webpack's entry
 * configuration, check the `config/options/dependencies.js` file
 * for instructions on resolving the errors by excluding the
 * vendor dependency that is throwing an error.
 */
import { vendorEntries } from './dependencies.babel'

const dllPrefix = '@jmahc/dll'

export default function vendorsWebpack() {
  const basePath = process.cwd()

  return {
    bail: true,
    devtool: '#source-map',
    target: 'web',
    mode: 'development',
    entry: { vendors: vendorEntries },
    output: {
      path: path.join(basePath, 'node_modules', dllPrefix),
      filename: '[name].dll.js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.DllPlugin({
        context: __dirname,
        format: true,
        name: '[name]_[hash]',
        path: path.resolve(
          basePath,
          'node_modules/' + dllPrefix,
          '[name]-manifest.json',
        ),
      }),
    ],
    optimization: { minimize: false },
    performance: { hints: false },
  }
}
