const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const config = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "build")
  },

  devServer: {
    contentBase: './build',
    historyApiFallback: {
      disableDotRule: true
    },
    port: 3000
  },

  devtool: "source-map",

  resolve: {
    modules: [path.resolve(__dirname, './src'), './node_modules'],
    extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, loader: "file-loader" },
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }],
      },
      {
        test: /\.s(c|a)ss$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./build']
    }),
    new HtmlWebpackPlugin({
      inject: true,
      favicon: "./src/static/favicon.ico",
      template: "./public/index.html"
    })
  ]
};

module.exports = config;