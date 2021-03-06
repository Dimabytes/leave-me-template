const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
              filename: '[name][sha1].[ext]'
            }
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader,"css-loader" ]
      },

      {
        test: /\.(s[ca]ss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader, // inject CSS to page
        }, {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            }
          }
        ]
      },
      {
        test: /\.png|jpg|jpeg|gif$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: '[name]-[sha1:hash:7].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
    ],

  },
  entry: {
    'main': './src/main.js',
    'index': './src/index/index.js',
    'product': './src/product/product.js',
    'checkout': './src/checkout/checkout.js',
  },
  output: {
    filename: "[name]-[hash:7].js",
    path: path.resolve(__dirname, 'docs/'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ['index', 'main']

    }),
    new HtmlWebpackPlugin({
      template: "./src/product/product.html",
      filename: "product.html",
      chunks: ['product','main']
    }),
    new HtmlWebpackPlugin({
      template: "./src/checkout/checkout.html",
      filename: "checkout.html",
      chunks: ['checkout', 'main']

    }),
    new MiniCssExtractPlugin({
      filename: '[name]-[hash:7].css'
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    open: true,
  }

};