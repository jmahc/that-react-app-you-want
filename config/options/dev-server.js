import { stats } from './stats'
import { PATHS } from '../shared'

export const devServerConfig = {
  // Show compile warnings and errors with this setting
  clientLogLevel: 'none',
  // Enable gzip compression of generated files
  compress: true,
  contentBase: PATHS.appPublic,
  historyApiFallback: true,
  hot: true,
  hotOnly: true,
  host: process.env.HOST_NAME || '0.0.0.0',
  https: process.env.HTTPS === 'true' ? 'https' : 'http' === 'https',
  open: true,
  overlay: {
    errors: true,
    warnings: false,
  },
  port: process.env.APP_PORT || 8080,
  publicPath: PATHS.publicPath,
  quiet: true,
  stats,
  // By default files from `contentBase` will not trigger a page reload.
  watchContentBase: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 1000,
  },
}
