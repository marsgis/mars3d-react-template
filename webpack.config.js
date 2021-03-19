"use strict";

const path = require("path");

const webpack = require("webpack");
const HtmlPlugin = require("html-webpack-plugin");

const CopyWebpackPlugin = require("copy-webpack-plugin"); //打包时复制文件
const cesiumSource = 'node_modules/mars3d-cesium/Build/Cesium/'

module.exports = (env, args) => {
  const prod = args.mode === "production";
  return {
    context: __dirname,
    devServer: {
      hot: true,
      port: 3002,
      open: true,
    },
    amd: { // test
      toUrlUndefined: true
    },
    devtool: !prod ? void 0 : "eval-source-map",
    entry: "./src",
    externals: {
      cesium: "Cesium",
    },
    mode: prod ? "production" : "development",
    module: {
      unknownContextCritical: false,
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|gif|jpg|jpeg|svg|xml|json)$/,
          use: ["url-loader"],
        },
        {
          test: /\.js$/,
          enforce: "pre",
          include: path.resolve(__dirname, cesiumSource),
          use: [
            {
              loader: "strip-pragma-loader",
              options: {
                pragmas: {
                  debug: false
                }
              }
            },
          ]
        }
      ],
    },
    output: {
      path: path.join(__dirname, "dist"),
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: "Copyright by MarsGIS",
      }),
      new HtmlPlugin({
        template: __dirname + "/public/index.html", //将指定的html页面内容覆盖到输出文件夹中的html里,并且会自动引入出口bundle.js以及分离出来的css文件
        favicon: __dirname + "/public/favicon.ico", //添加网站的图标
      }),
      ...(prod ? [] : [new webpack.HotModuleReplacementPlugin()]),

      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("cesium"),
      }),
      new CopyWebpackPlugin([
        {
          from: `node_modules/mars3d-cesium/Build/Cesium`,
          to: "cesium",
        },
      ]),
      new CopyWebpackPlugin([
        {
          from: __dirname + "/public",
          to: "",
        }
      ])
    ],
    resolve: {
      alias: {cesium: path.resolve(__dirname, cesiumSource)} ,
    }
  };
};
