var webpack = require('webpack');
var pkg     = require('./package.json');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
	template: __dirname + '/src/index.html',
	filename: 'index.html',
	inject: 'body'
});


module.exports = {
  entry: {
    app: './src/app.js',
    vendor: Object.keys(pkg.dependencies),
  },
  output: {
    path: './',
    filename: 'app.bundle.js'
  },
  module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a valid name to reference
          query: {
            presets: ['es2015']
          }
        },
        {
          test: /\.scss$/,
          loaders: ["style", "css", "sass"]
        },
        {
          test: /\.json$/,
          loader: 'json',
        },
        {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            loader: 'file?name=public/fonts/[name].[ext]'
        }
      ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.min-[hash:6].js'),
    HtmlWebpackPluginConfig,
  ]
};
