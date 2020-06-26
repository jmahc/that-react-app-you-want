import { initializeEnv } from './config/helpers'

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  initializeEnv()
}

export default async function startWebpack(env) {
  console.log('startWebpack... Env is: ', env)
  const configs = {
    development: async function startDevelopmentWebpack() {
      console.log('Starting `development` webpack.')
      return await require('./config/development.webpack.config.babel').default()
    },
    production: async function startProductionWebpack() {
      console.log('Starting `production` webpack.')
      return await require('./config/production.webpack.config.babel').default()
    },
    vendors: async function startVendorsWebpack() {
      console.log('Starting `vendors` webpack.')
      return await require('./config/vendors.webpack.config.babel').default()
    },
  }

  return configs[env] ? configs[env]() : configs['development']()
}
