let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')


let vendorModules = /(node_modules|bower_components)/

let CompressionPlugin = require('compression-webpack-plugin')
let CleanPlugin = require('clean-webpack-plugin')


let option = process.env.OPTION
let path = process.env.OPTION_PATH


module.exports = {
  target: "web",
  entry: {
    app: "./" + path + "/" + option,
  },

  output: {
    path: './' + path + '/' + option + '/dist',
    filename: "app.js",
    pathinfo: true,
    publicPath: "",
  },

  module: {
    preLoaders: [
      // {test: /\.jsx?$/, loader: "eslint-loader", exclude: vendorModules},
    ],
    loaders: [
      {
        test: /.js/,
        exclude: vendorModules,
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
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" },
      { test: /\.bmp$/, loader: "url-loader?mimetype=image/bmp" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin("init.js"),
    new HtmlWebpackPlugin({
      title: path,
      minify: process.env.NODE_ENV === 'production' ? {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        preventAttributesEscaping: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
      } : false,
      template: './' + path + '/' + option + '/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CleanPlugin(['./' + path + '/' + option + '/dist']),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
      comments: /\@license|\@preserv/gi,
    }),
    new CompressionPlugin({
      asset: "{file}.gz",
      algorithm: "gzip",
      regExp: new RegExp("\.(js|html|css|svg)$"),
      threshold: 10240,
      minRatio: 0.8,
    })
  ],
  debug: false,
  watch: false,
}
