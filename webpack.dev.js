const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
    entry: {
      'canvas-path-line-1': './example/canvas/path/line/1.js',
    },
    target: 'web',
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        allowedHosts: 'auto',
        hot: true,
        host: '0.0.0.0',
        static: {
            directory: path.join(__dirname, 'example'),
            // publicPath: '/',
        },
    },
    module: {
        // rules: [
        //     {
        //         test: /\.(sa|sc|c)ss$/,
        //         use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
        //     },
        // ],
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        //     // publicPath: package.cdnUrl,
        //     filename: 'index.html',
        //     template: 'public/index.html',
        //     minify: false,
        //     chunks: ['common','app'],
        //     inject: 'head',
        // }),
    ],
});
