import ExtractTextPlugin from 'extract-text-webpack-plugin'
import webpack from 'webpack'

const devServer = ({ port, publicPath, stats } = {}) => ({
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

const loadCss = ({ include, exclude, options } = {}) => ({
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

const extractCss = ({ include, exclude, options }) => {
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

const lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/, // For `.jsx` people.
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options
      }
    ]
  }
})

const loadJavaScript = ({ include, exclude, query }) => ({
  module: {
    rules: [
      {
        test: /\.js$/, // For `.jsx` people.
        include,
        exclude,

        loader: 'babel-loader',

        query
      }
    ]
  }
})

const loadSvg = ({ include, exclude }) => ({
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

const setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [new webpack.DefinePlugin(env)]
  }
}

export {
  devServer,
  extractCss,
  lintJavaScript,
  loadCss,
  loadJavaScript,
  loadSvg,
  setFreeVariable
}
