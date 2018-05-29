const {resolve} = require('path')

module.exports = {
  context: resolve(__dirname, 'lib_src'),
  entry: {
    app: './mainsite.js',
  },
  output: {
    filename: 'waw-mainsite_Lib.bundle.js',
    path: resolve(__dirname, 'lib_dist'),
    library: 'waw.mainsite',
    libraryTarget:'umd'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
        },
      },
    ]
  },
}