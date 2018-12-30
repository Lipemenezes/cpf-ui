'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3001',
    'webpack/hot/only-dev-server',
    path.join(__dirname, 'src', 'index')
  ],

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          path.join(process.cwd(), 'node_modules')
        ],
        include: /src/,
        loader: 'standard-loader'
      },
      {
        test: /\.js$/,
        exclude: [
          path.join(process.cwd(), 'node_modules')
        ],
        include: /src/,
        loader: 'babel-loader'
      }
    ]
  }
}
