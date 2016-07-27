var webpack = require('webpack')

module.exports = {
  entry: {
    fractalEngine: "./lib/index.js",
  },
  output: {
      path: './dist',
      filename: 'fractal.min.js',
      libraryTarget: 'umd',
      library: 'fractalEngine',
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
                "object-assign",
              ],
            },
            production: {
              plugins: [
                "object-assign",
              ],
            },
          },
          stage: 0,
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        mangle: false
    }),
  ],
}
