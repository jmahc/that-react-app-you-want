import fs from 'fs'
import glob from 'glob'
import path from 'path'

const currentDir = process.cwd()

// Ensure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(currentDir)
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
  // Uncomment this for `favicons-webpack-plugin`
  // image: resolvePath('src/shared/assets/images/spy_kid.png'),
  indexHtml: resolvePath('public/index.ejs'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('config/polyfills'),
  postCssConfig: resolvePath('config/postcss.config.js'),
  public: resolvePath('public'),
  publicPath: isProduction ? './' : '/',
  purifyCssPaths: glob.sync(`${resolvePath('src')}/**/*.js`), // glob.sync(`${PATHS.app}/**/*.js`),
  root: currentDir,
  shared: resolvePath('src/shared'),
  styles: resolvePath('src/shared/styles'),
  vendorFilepath: resolvePath('dll/vendors.dll.js'),
  vendorManifest: resolvePath('dll/vendors-manifest.json'),
  yarnLockFile: resolvePath('yarn.lock')
}

export default PATHS
