const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './source/index.webpack.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vector.min.js',
    libraryTarget: 'umd',
    library: 'Vector',
    globalObject: 'this'
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".js"]
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  plugins: [
    new UnminifiedWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'vector.min.css',
      chunkFilename: '[id].css',
    }),
  ]
};
