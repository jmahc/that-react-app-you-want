import merge from 'webpack-merge'
import commonsConfig from './config/webpack.config.commons.babel'

const myWebpackConfig = env =>
  env === 'production'
    ? merge(commonsConfig, import('./config/webpack.config.production.babel'))
    : merge(commonsConfig, import('./config/webpack.config.development.babel'))

export default myWebpackConfig
