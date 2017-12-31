import fs from 'fs'
import path from 'path'

const currentDir = process.cwd()

const appDirectory = fs.realpathSync(currentDir)
const resolvePath = relativePath => path.resolve(appDirectory, relativePath)

const isProduction = process.env.NODE_ENV === 'production'

const PATHS = {
  app: resolvePath('src'),
  babelConfig: require(resolvePath('config/babel.config.js')),
  build: resolvePath('dist'),
  dll: resolvePath('dll'),
  favicon: resolvePath('public/favicon.ico'),
  // Uncomment this for `favicons-webpack-plugin`
  // image: resolvePath('public/my-image.png'),
  indexHtml: resolvePath('public/index.ejs'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('config/polyfills'),
  postCSS: resolvePath('config/postcss.config.js'),
  publicPath: isProduction ? './' : '/',
  root: currentDir,
  vendorFilepath: resolvePath('dll/vendors.dll.js'),
  vendorManifest: resolvePath('dll/vendors-manifest.json')
}

export default PATHS
