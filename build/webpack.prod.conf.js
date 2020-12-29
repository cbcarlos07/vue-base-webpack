const { VueLoaderPlugin } = require("vue-loader");
const htmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack');
const autoprefixer = require("autoprefixer");
const path = require("path");
const config = require('../config')
const utils = require('./utils')
const webpack = require('webpack')
const env = require('../config/prod.env')
module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: () => [autoprefixer()],
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg|ico)$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
          outputPath: "static/img",
          esModule: false,
        },
      },
    ],
  },
  
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: utils.assetsPath("css/[name].[contenthash:8].css"),
      chunkFilename: utils.assetsPath("css/[name].[contenthash:8].css"),
    }),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "..","public", "index.html"),
      favicon: "./public/favicon.ico",
    }),
    new Dotenv({
        path: path.resolve(__dirname, "..", ".env.production"), // load this now instead of the ones in '.env'
        safe: false, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
        allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
        systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
        silent: true, // hide any errors
        defaults: false // load '.env.defaults' as the default values if empty.
    }),
    new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, '../static'),
            to: config.build.assetsSubDirectory,
            globOptions: {
              ignore: ['.*']
          }
          }
        ]
    
      })
  ],
  resolve: {
    alias: {
      vue$: "vue/dist/vue.runtime.esm.js",
    },
    extensions: ["*", ".js", ".vue", ".json"],
  },
  optimization: {
    moduleIds: "hashed",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10,
          chunks: "all",
        },
      },
    },
  },
  devServer: {
    historyApiFallback: true,
  },
};
