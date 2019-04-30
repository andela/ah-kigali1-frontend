const path = require("path");
const HtmlPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const dotenv = require("dotenv-webpack");

module.exports = {
  entry: path.join(__dirname, "./src/index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "index.js"
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: "babel-loader" },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: "style-loader" },
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" },
          { loader: "resolve-url-loader" },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        loader: "url-loader?limit=100000",
        options: {
          outputPath: "assets",
          name: "[name].[ext]",
          limit: 100000
        }
      }
    ]
  },
  mode: "development",
  resolve: {
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  plugins: [
    new dotenv(),
    new HtmlPackPlugin({ template: "./public/index.html" }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  devServer: {
    historyApiFallback: true,
    port: 8000
  },
  node: {
    fs: "empty"
  }
};
