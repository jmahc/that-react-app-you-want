import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'

/**
 *  devServer
 *  Configure the `webpack-dev-server` with the provided
 *  port number, public path for asset/file references and
 *  the custom `stats` configuration file.
 *
 *  @param {number} port        The port number for the development server.
 *  @param {string} publicPath  The filepath to grab and serve static assets.
 *  @param {Object} stats       The `stats` configuration object for logging, hot reloading, etc.
 */
export const devServer = ({ port, publicPath, stats } = {}) => ({
  devServer: {
    compress: true,
    historyApiFallback: true,
    hot: true,
    overlay: {
      errors: true,
      warnings: true
    },
    port,
    publicPath,
    stats,
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: 1000
    }
  }
})

/**
 *  loadCss
 *  A "development"-only loader of the project's CSS or `PostCSS` files.
 *
 *  @param {Array} include  An array of filepaths/directories to find re: CSS files.
 *  @param {Array} exclude  An array of filepaths/directories to ignore re: CSS files.
 *  @param {Object} options A `PostCSS` configuration object from the `config/postcss.config.js` file.
 */
export const loadCss = ({ include, exclude, options } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        exclude,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',

            options
          }
        ]
      }
    ]
  }
})

/**
 *  extractCss
 *  A "production"-only loader for CSS files that extracts them into their own files.
 *
 *  @param {Array} include  An array of filepaths/directories to find re: CSS files.
 *  @param {Array} exclude  An array of filepaths/directories to ignore re: CSS files.
 *  @param {Object} options A `PostCSS` configuration object from the `config/postcss.config.js` file.
 */
export const extractCss = ({ include, exclude, options }) => {
  const plugin = new ExtractTextPlugin({
    allChunks: true,
    disable: false,
    filename: '[name].[hash:8].css'
  })

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                query: {
                  importLoaders: 1
                }
              },
              {
                loader: 'postcss-loader',

                options
              }
            ]
          })
        }
      ]
    },
    plugins: [plugin]
  }
}

/**
 *  lintJavaScript
 *  Lints any Javascript files using `eslint-loader` and the ESLint configuration.
 *
 *  @param {Array} include  An array of filepaths/directories to find and lint.
 *  @param {Array} exclude  An array of filepaths/directories to ignore for linting.
 *  @param {Object} options An `ESLint` configuration object.
 */
export const lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options
      }
    ]
  }
})

/**
 *  loadJavaScript
 *  Load the JavaScript files for our project.
 *
 *  @param {Array} include  An array of filepaths/directories to find re: JavaScript.
 *  @param {Array} exclude  An array of filepaths/directories to ignore re: JavaScript.
 *  @param {Object} query   A `babel.rc` configuration object based on the `config/babel.config.js` file.
 */
export const loadJavaScript = ({ include, exclude, query }) => ({
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include,
        exclude,

        loader: 'babel-loader',

        query
      }
    ]
  }
})

/**
 *  loadSvg
 *  Load any SVG files (typically third-party dependencies) for the project.
 *
 *  @param {Array} include  An array of filepaths/directories to find re: SVG.
 *  @param {Array} exclude  An array of filepaths/directories to ignore re: SVG.
 */
export const loadSvg = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['file-loader', 'svgo-loader'],

        include,
        exclude
      }
    ]
  }
})

/**
 * setFreeVariable
 * Sets a "free" variable to be used across the application.
 *
 * @param {string} key The environment variable's key.
 * @param {string} value The environment variable's value.
 *
 * @returns A `webpack.DefinePlugin(env)` of the provided environment variable.
 * @example
 *  setFreeVariable(
 *      process.env.NODE_ENV,
 *      process.env.NODE_ENV === 'development' ? 'development' : 'production'
 *  )
 */
export const setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [new webpack.DefinePlugin(env)]
  }
}
