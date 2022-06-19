const package = require('./package.json')
const base = require('./webpack.common.js')

const path = require('path')
// const webpack = require('webpack')
const { merge } = require('webpack-merge')
// const TerserPlugin = require('terser-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")

module.exports = merge(base, {
  mode: 'production',
  entry: {
    zfk: './src/index.ts',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'images/[hash][ext][query]',
    library: {
        name: 'zfk',
        type: 'assign-properties', // 'window' | 'this' | 'global' | 'assign-properties'
        export: 'default',
    },
    libraryTarget: 'umd',
    auxiliaryComment: 'fe kit',
    clean: true,
  },
  module: {
    // rules: [
    //   {
    //     test: /\.(sa|sc|c)ss$/,
    //     use: [
    //       { loader: MiniCssExtractPlugin.loader, options: { esModule: false } },
    //       { loader: 'css-loader', options: { sourceMap: true, importLoaders: 2, } },
    //       { loader: 'postcss-loader', options: { sourceMap: true } },
    //       { loader: 'sass-loader', options: { sourceMap: true } },
    //     ],
    //   },
    // ]
  },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
    minimizer: [
    //   new CssMinimizerPlugin(),
    //   new TerserPlugin({
    //     parallel: true,
    //     extractComments: true,
    //     terserOptions: {
    //       output: {
    //         comments: /@license|@copyright/i,
    //       },
    //     }
    //   }),
    ],
  },
  plugins: [],
});
