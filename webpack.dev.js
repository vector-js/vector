const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const PORT = 7777;

module.exports = {
  mode: 'development',
  entry: './source/index.webpack.ts',
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'vector.js',
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
    new MiniCssExtractPlugin({
      filename: 'vector.css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    contentBase: [path.join(__dirname, 'static'), path.join(__dirname, 'dist')],
    // Allow server to be accessed from anywhere, which is useful for
    // testing.  This potentially reveals the source code to the world,
    // but this should not be a concern for testing open-source software.
    disableHostCheck: true,
    host: '0.0.0.0',
    port: PORT,
    sockPort: 'location',
    stats: {
        colors: true,
    },
  },
};
