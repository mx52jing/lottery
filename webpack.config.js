/*
 * @Description: 请输入....
 * @Author: Gavin
 * @Date: 2022-01-11 13:18:30
 * @LastEditTime: 2022-01-14 15:11:00
 * @LastEditors: Gavin
 */
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: path.join(__dirname, "/src/lottery/index.js"),
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "lottery.js",
    publicPath: '/lottery/'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10 * 1024,
              name: '[name].[ext]',
              outputPath: 'img/',
              esModule: false
            }
          }
        ]
      },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|m4a)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'video/[name].[ext]',
            esModule: false
          }
        },
    ]
  },
  plugins: [
    new webpack.BannerPlugin("大河财富抽奖活动"),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/index.html"),
      filename: "./index.html",
      minify: {
        // 移除空属性
        removeEmptyAttributes: true,
        // 压缩css
        minifyCSS: true,
        // 压缩JS
        minifyJS: true,
        // 移除空格
        collapseWhitespace: true
      },
      hash: true,
      inject: true,
      // favicon: path.resolve('favicon.ico')
    }),
    new CopyWebpackPlugin([
      {
        from: "./src/css",
        to: "./css"
      },
      // {
      //   from: "./src/data",
      //   to: "./data"
      // },
      {
        from: "./src/lib",
        to: "./lib"
      }
    ])
  ]
};
