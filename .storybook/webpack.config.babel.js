import path from 'path'
import webpack from 'webpack'
import CircularDependencyPlugin from 'circular-dependency-plugin'

export default function startStorybook(
  storybookBaseConfig,
  configType,
  defaultConfig,
) {
  const basePath = process.cwd()

  defaultConfig.cache = true
  defaultConfig.context = basePath

  console.log(`__dirname: ${__dirname}`)

  defaultConfig.module.rules = defaultConfig.module.rules.concat([
    {
      test: /\.svg$/,
      use: ['file-loader', 'svgo-loader'],

      include: [
        path.join(basePath, 'packages', 'components', 'src'),
        path.join(basePath, 'packages', 'vision', 'src'),
      ],
      exclude: path.join(basePath, 'node_modules'),
    },
    {
      test: /\.js$/,
      use: ['source-map-loader'],
      enforce: 'pre',
    },
  ])

  defaultConfig.plugins = defaultConfig.plugins.concat([
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require.resolve(
        '../node_modules/@vaco_dev/dll/vendors-manifest.json',
      ),
    }),
    new webpack.NamedModulesPlugin(),
    new CircularDependencyPlugin({
      // exclude detection of files based on a RegExp
      exclude: /a\.js|node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // set the current working directory for displaying module paths
      cwd: process.cwd(),
    }),
  ])

  defaultConfig.resolve.alias = Object.assign(defaultConfig.resolve.alias, {
    settings: path.resolve(basePath, 'packages/vision/src/shared/styles'),
  })

  return defaultConfig
}
