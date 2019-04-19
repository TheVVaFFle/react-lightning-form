const webpack = require("webpack"),
  path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: {
    bundle: path.resolve(__dirname, "src/index.tsx")
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, 
        use: 'babel-loader?cacheDirectory', 
        exclude: [/node_modules/]
      },
      {
        test: /\.(ts|tsx)?$/, 
        loader: 'ts-loader',
        exclude: [/node_modules/]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.scss$/, 
        use: [
          {loader: 'style-loader'}, 
          {loader: 'css-loader'}, 
          {loader: 'sass-loader'}
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: path.resolve(__dirname, 'src/index.html'), filename: './index.html'})
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  devServer: {
    port: 8081,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false
      }
    }
  }
}

module.exports = config;