import fs from 'fs'
import path from 'path'

import { dllPrefix } from '../constants'

const currentDir = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

// Ensure any symlinks in the project folder are resolved:
const appDir = fs.realpathSync(currentDir)
export const resolvePath = (relativePath) => path.resolve(appDir, relativePath)

export const PATHS = {
  appPublic: resolvePath('src/public'),
  appSrc: resolvePath('src'),
  assets: resolvePath('src/shared/assets'),
  build: resolvePath('dist'),
  devtoolModule: (info) => path.resolve(info.absoluteResourcePath),
  dotenv: resolvePath('.env'),
  entry: resolvePath('src/index.js'),
  favicon: resolvePath('public/favicon/favicon.ico'),
  // Uncomment this for `favicons-webpack-plugin`
  // image: resolvePath('src/shared/assets/images/spy_kid.png'),
  indexHtml: resolvePath('public/index.ejs'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('config/helpers/polyfills'),
  postCssConfig: resolvePath('config/postcss.config.js'),
  publicPath: isProduction ? './' : '/',
  root: currentDir,
  sharedDir: resolvePath('src/shared'),
  stylesDir: resolvePath('src/shared/styles'),
  vendors: {
    filepath: resolvePath(`node_modules/${dllPrefix}/vendors.dll.js`),
    manifest: resolvePath(`node_modules/${dllPrefix}/vendors-manifest.json`),
  },
}
