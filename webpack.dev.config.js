const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
   mode: 'development',
   entry: {
      vendor: './src/js/vendor.js',
      main: './src/js/index.js'
   },
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
   },
   module: {
      rules: [
         {
            test: /\.html$/,
            use: ['html-loader']
         },

         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.(scss|sass)$/,
            use: ['style-loader', 'css-loader', 'sass-loader']
         },
         {
            test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
            use: 'file-loader?name=[name].[hash].[ext]&outputPath=./assets/img'
         }
      ]
   },
   plugins: [
      new HtmlWebpackPlugin({
         template: './src/index.html'
      })
   ],
   devServer: {
      inline: true,
      port: 3000
   }
};
