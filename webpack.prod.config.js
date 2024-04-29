const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
   mode: 'production',
   entry: {
      vendor: './src/js/vendor.js',
      main: './src/js/index.js'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contentHash].js'
   },
   optimization: {
      minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
   },
   module: {
      rules: [
         {
            test: /\.html$/,
            use: ['html-loader']
         },
         {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader']
         },
         {
            test: /\.(scss|sass)$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
         },

         {
            test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
            use: 'file-loader?name=[name].[hash].[ext]&outputPath=./assets/img'
         },

         {
            test: /\.(jpg|png|gif|svg)$/,
            loader: 'image-webpack-loader',
            enforce: 'pre'
         }
      ]
   },
   plugins: [
      new MiniCssExtractPlugin({
         filename: '[name].[contentHash].css',
         chunkFilename: '[id].css'
      }),
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './src/index.html',
         minify: {
            collapseWhitespace: true,
            removeComments: true
         }
      }),
      new CleanWebpackPlugin()
   ]
};
