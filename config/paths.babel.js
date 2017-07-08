import fs from 'fs'
import path from 'path'

const appDirectory = fs.realpathSync(process.cwd())
const resolvePath = relativePath => path.resolve(appDirectory, relativePath)

const isProduction = process.env.NODE_ENV === 'production'

const PATHS = {
  app: resolvePath('src'),
  babelConfig: require(resolvePath('config/babel.config.js')),
  build: resolvePath('dist'),
  dll: resolvePath('dll'),
  dllManifest: resolvePath('dll/manifest.json'),
  favicon: resolvePath('public/favicon.ico'),
  indexHtml: resolvePath('public/index.html'),
  nodeModules: resolvePath('node_modules'),
  polyfills: resolvePath('config/polyfills'),
  postCSS: resolvePath('config/postcss.config.js'),
  // This should be `/` if deploying to a website.
  // It is like this now for viewing the production build locally.
  publicPath: isProduction ? './' : '/'
}

export default PATHS
