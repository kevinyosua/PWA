const copyWebpackPlugin = require("copy-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.config.js")
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  plugins: [
    new copyWebpackPlugin({
        patterns: [
            {
                from: "public",
                to: "./public"
            },
            {
                from: "*.png",
                to: "."
            },
            {
                from: "manifest.json",
                to: "."
            },
            {
                from: "favicon.ico",
                to: '.'
            }
        ]
    }),
    new WorkboxPlugin.InjectManifest({
      swSrc: './src/sw.js',
      swDest: 'sw.js',
    })
  ],
});
