import webpack from 'webpack'

export const lintJavaScript = ({ include, exclude, options }) => ({
  module: {
    rules: [
      {
        test: /\.js$/, // For `.jsx` people.
        include,
        exclude,
        enforce: 'pre',

        loader: 'eslint-loader',
        options,
      },
    ],
  },
})

export const loadJavaScript = ({ include, exclude, query }) => ({
  module: {
    rules: [
      {
        test: /\.js$/,
        include,
        exclude,

        loader: 'babel-loader',
      },
    ],
  },
})

const loadSvg = ({ include, exclude }) => ({
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['file-loader', 'svgo-loader'],

        include,
        exclude,
      },
    ],
  },
})

export const setFreeVariable = (key, value) => {
  const env = {}
  env[key] = JSON.stringify(value)

  return {
    plugins: [new webpack.DefinePlugin(env)],
  }
}
