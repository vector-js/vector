const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'production',
  entry: './source/index.webpack.ts',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vector.min.js',
    library: 'Vector',
    libraryTarget: 'umd',
    // libraryExport: 'default',
    // globalObject: "(typeof self !== 'undefined' ? self : this)",
    globalObject: "this",
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
    new MiniCssExtractPlugin({
      filename: 'vector.min.css',
      chunkFilename: '[id].css',
    }),
  ]
};
