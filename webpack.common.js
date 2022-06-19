const package = require('./package.json')

const path = require('path')
// const webpack = require('webpack')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = {
//   externals: [
//     { jquery: 'jQuery', },
//     {
//       lodash: {
//         commonjs: 'lodash',
//         commonjs2: 'lodash',
//         amd: 'lodash',
//         root: '_',
//       },
//     }
//   ],
  target: ['web', 'es5'],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
    //   {
    //     test: /\.(png|svg|jpg|jpeg|gif)$/i,
    //     type: 'asset',
    //     parser: {
    //       dataUrlCondition: {
    //         maxSize: 3 * 1024,
    //       }
    //     }
    //   },
    //   {
    //     test: /\.(woff|woff2|eot|ttf|otf)$/i,
    //     type: 'asset/resource',
    //     generator: { filename: 'fonts/[hash][ext][query]', }
    //   },
    ]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: 'jquery',
    //   jQuery: 'jquery',
    //   'window.jQuery': 'jquery',
    //   'window.$': 'jquery',
    // }),
    // new webpack.DefinePlugin({
    //     'process.env.SDK_VERSION': JSON.stringify(package.version),
    //     'process.env.WITH_DEBUG': JSON.stringify(process.env.WITH_DEBUG),
    // }),
    // new LodashModuleReplacementPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@canvas': path.resolve(__dirname, 'src/canvas'),
    },
  },
};
