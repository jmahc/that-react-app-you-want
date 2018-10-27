import fs from 'fs'
import path from 'path'

const currentDir = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

// Ensure any symlinks in the project folder are resolved:
const appDirectory = fs.realpathSync(currentDir)
const resolvePath = relativePath => path.resolve(appDirectory, relativePath)

export const PATHS = {
  appPublic: resolvePath('public'),
  appSrc: resolvePath('src'),
  assets: resolvePath('src/shared/assets'),
  build: resolvePath('dist'),
  devtoolModule: function(info) {
    return path.resolve(info.absoluteResourcePath)
  },
  dll: resolvePath('dll'),
  dotenv: resolvePath('.env'),
  entry: resolvePath('src/index.js'),
  favicon: resolvePath('public/favicon.ico'),
  indexHtml: resolvePath('public/index.ejs'),
  nodeModules: resolvePath('node_modules'),
  packageJson: resolvePath('package.json'),
  polyfills: resolvePath('config/polyfills'),
  publicPath: isProduction ? './' : '/',
  root: currentDir,
  sharedDir: resolvePath('src/shared'),
  stories: resolvePath('.storybook'),
  vendors: {
    filepath: resolvePath(
      'node_modules/@that-react-app-you-want/dll/vendors.dll.js',
    ),
    manifest: resolvePath(
      'node_modules/@that-react-app-you-want/dll/vendors-manifest.json',
    ),
  },
}
