import merge from 'webpack-merge'

import commonsConfig from './config/webpack.config.commons.babel'
import developmentConfig from './config/webpack.config.development.babel'
import productionConfig from './config/webpack.config.production.babel'

const mainConfig = env =>
  env === 'production'
    ? merge(commonsConfig, productionConfig)
    : merge(commonsConfig, developmentConfig)

export default mainConfig
