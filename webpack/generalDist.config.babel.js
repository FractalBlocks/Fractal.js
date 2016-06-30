let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')


let vendorModules = /(node_modules|bower_components)/

import CompressionPlugin from 'compression-webpack-plugin'
import CleanPlugin from 'clean-webpack-plugin'


let option = process.env.OPTION
let path = process.env.OPTION_PATH


export default {
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
        test: /\.js$/,
        exclude: vendorModules,
        loader: "babel",
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      { test: /\.jpg$/, loader: "url-loader?mimetype=image/jpg" },
      { test: /\.bmp$/, loader: "url-loader?mimetype=image/bmp" },
      { test: /\.png$/, loader: "url-loader?mimetype=image/png" },
      { test: /\.scss$/, loaders: ["style", "css", "sass"] },
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
