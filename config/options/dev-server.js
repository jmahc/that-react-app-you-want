import { stats } from './stats'
import { PATHS } from './paths'

export const devServerConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production'

  return {
    // Show compile warnings and errors with this setting
    // clientLogLevel: 'trace', // 'none',
    // Enable gzip compression of generated files
    compress: isProduction,
    contentBase: PATHS.appPublic,
    historyApiFallback: true,
    hot: !isProduction,
    hotOnly: true,
    inline: !isProduction,
    // host: process.env.HOST_NAME || '0.0.0.0',
    // https: process.env.HTTPS === 'true' ? 'https' : 'http' === 'https',
    open: !isProduction,
    overlay: {
      errors: true,
      warnings: true,
    },
    port: process.env.APP_PORT || 3000,
    publicPath: PATHS.publicPath,
    quiet: false,
    stats,
    // By default files from `contentBase` will not trigger a page reload.
    watchContentBase: true,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000,
    },
  }
}
