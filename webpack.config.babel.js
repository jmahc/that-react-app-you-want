import merge from 'webpack-merge'

import commonsConfig from './config/webpack.config.commons.babel'

export default async function webpackConfig(env) {
  return env === 'production'
    ? merge(
        commonsConfig,
        await require('./config/webpack.config.production.babel').default
      )
    : merge(
        commonsConfig,
        await require('./config/webpack.config.development.babel').default
      )
}
