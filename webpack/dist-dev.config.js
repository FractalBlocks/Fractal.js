var webpack = require('webpack')

module.exports = {
  entry: {
    fractalEngine: "./lib/index.js",
  },
  output: {
      path: './dist',
      filename: 'fractal.js',
      libraryTarget: 'umd',
      library: 'fractal',
      umdNamedDefine: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        query: {
          env: {
            development: {
              plugins: [
                "typecheck",
                "closure-elimination",
              ],
            },
          },
          stage: 0,
        },
      },
    ],
  },
  plugins: [],
}
