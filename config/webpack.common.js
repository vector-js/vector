const paths = require('./paths')
const pkg = require('../package.json');

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {

  // Set the mode to development or production
  mode: 'development',

  // Where webpack looks to start building the bundle
  entry: [paths.src + '/code/index.webpack.ts'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: `js/${pkg.name}.bundle.js`,
    library: 'Vector',
    libraryTarget: 'umd',
    globalObject: 'this',
  },

  // Customize the webpack build process
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/template.html', // template file
      filename: 'index.html', // output file
    }),
  ],
  
  // Add `.ts` and `.tsx` as a resolvable extension.
  resolve: {
    extensions: [".ts", ".js"]
  },

  // Determine how modules within the project are treated
  module: {
    rules: [

      // Typescript: Use ts-loader
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },

      // JavaScript: Use Babel to transpile JavaScript files
      {test: /\.js$/, exclude: /node_modules/, use: ['babel-loader']},

      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      },

      // Images: Copy image files to build folder
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

      // Fonts and SVGs: Inline files
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
    ],
  },
}
