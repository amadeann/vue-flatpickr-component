'use strict';

const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: __dirname,
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.resolve(__dirname, 'examples'),
      'node_modules'
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.jsx', '.json', '.vue'],
  },
  entry: {
    app: './examples/index.js',
    vendor: ['vue', 'flatpickr', 'jquery', 'bootstrap']
  },
  output: {
    path: path.resolve(__dirname, 'docs'),// where to store build files
    publicPath: '',// to be used in index.html
    filename: "js/[name].[hash].js" // build file name
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        loader: 'file-loader?name=[name].[hash].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loader: 'file-loader?name=[name].[ext]?[hash]',
      }

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      template: './examples/index.html',
      minify: {
        removeComments: false,
        collapseWhitespace: false,
        removeAttributeQuotes: false,
        minifyJS: false,
        minifyCSS: false,
        minifyURLs: false
        // More options here
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
    new webpack.ProvidePlugin({
      Vue: 'vue',
      'window.Vue': 'vue',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor'),
    // Required when devServer.hot = true
    new webpack.HotModuleReplacementPlugin()
  ],
  // Dev server related configs
  devServer: {
    contentBase: path.resolve(__dirname, 'examples'),
    port: 8080,
    host: 'localhost',
    open: true,
    inline: true,
    hot: true,
    noInfo: false,
    quiet: false,
    stats: 'errors-only'
  },
  devtool: '#cheap-module-eval-source-map',
  target: 'web'
};


