const path = require('path');

module.exports = {
  entry: [
    'babel-polyfill',
    './src/client'
  ],
  output: {
    path: path.resolve(__dirname, 'dist/assets'),
    filename: 'bundle.js',
    publicPath: '/assets/js',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/client')
        ],
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src/client')
        ],
        loader: 'babel-loader',
        options: {
          babelrc: true
        },
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
    ],
  },
  context: __dirname
}
