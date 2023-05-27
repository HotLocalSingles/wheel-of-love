const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const SRC_DIR = path.join(__dirname, '/client/src');
const DIST_DIR = path.join(__dirname, '/client/dist');

module.exports = {
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
  },
  mode: 'development',
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: DIST_DIR,
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Wheel of Love',
    templateContent: `
    <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Wheel of Love</title>
    <meta name="referrer" content="no-referrer" />
  <meta name="viewport" content="width=device-width, initial-scale=1"></head>
  <body>
  <div id="root"></div>
  </body>
</html>
    `
  }),
  new Dotenv({
    path: './.env'
  })],
  module: {
    rules: [
      {
        test: /\.jsx|js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

    ],
  },
};
