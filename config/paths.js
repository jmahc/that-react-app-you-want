const fs = require('fs')
const glob = require('glob')
const path = require('path')

const currentDir = process.cwd()

// Ensure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(currentDir)
/**
 * Gets the path of the provided string (assuming it exists),
 * relative the project's current working directory via `process.cwd()`.
 *
 * @param {string} relativePath The directory or filepath.
 * @returns {string} The resolved path to a directory or file.
 */
const resolvePath = relativePath => path.resolve(appDirectory, relativePath)

const isProduction = process.env.NODE_ENV === 'production'

const PATHS = {
  app: resolvePath('src'),
  assets: resolvePath('src/shared/assets'),
  babelConfig: require(resolvePath('config/babel.config.js')),
  build: resolvePath('dist'),
  devtoolModule: function(info) {
    return path.resolve(info.absoluteResourcePath)
  },
  dll: resolvePath('dll'),
  dotenv: resolvePath('.env'),
  favicon: resolvePath('src/shared/assets/favicon/favicon.ico'),
  indexHtml: resolvePath('public/index.ejs'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('config/polyfills'),
  postCssConfig: resolvePath('config/postcss.config.js'),
  public: resolvePath('public'),
  publicPath: isProduction ? './' : '/',
  purifyCssPaths: glob.sync(`${resolvePath('src')}/**/*.js`),
  root: currentDir,
  shared: resolvePath('src/shared'),
  styles: resolvePath('src/shared/styles'),
  vendorFilepath: resolvePath('dll/vendors.dll.js'),
  vendorManifest: resolvePath('dll/vendors-manifest.json'),
  yarnLockFile: resolvePath('yarn.lock')
}

module.exports = PATHS
