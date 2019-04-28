/*
* Configuration file for webpack-cli.
* https://webpack.js.org/configuration/
*
* Kurt Bruns
* Feb 04, 2019
*/

var path = require('path');

module.exports = {
  mode: 'development',
  target: 'web',
  devtool:"source-map",
  entry: './source/Library.ts',
  output: {
    path: path.resolve(__dirname, "./"),
    filename: 'dist/library.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};
