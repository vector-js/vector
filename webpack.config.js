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
  entry: {
    'library' : './source/Library.ts',
    'interactive' : './source/Interactive.ts',
    'unit-circle-angle' : './source/examples/unit-circle-angle.ts',
    'unit-circle-right-triangle' : './source/examples/unit-circle-right-triangle.ts'
  },
  output: {
    path: path.resolve(__dirname, "./"),
    filename: 'dist/[name].js'
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
