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
        test: /.js/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'es2017'],
          plugins: [
            'transform-runtime',
            'transform-es2015-destructuring',
            'transform-object-rest-spread',
            'transform-async-to-generator'
          ],
        },
      },
    ],
  },
  plugins: [],
}
