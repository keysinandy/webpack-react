const path = require('path')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const webpack = require('webpack')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    open: true,
    port: 3131,
    compress: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

})
