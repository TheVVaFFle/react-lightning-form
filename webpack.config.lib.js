const webpack = require("webpack"),
  path = require("path"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
  entry: {
    styles: path.resolve(__dirname, "src/components/index.scss")
  },
  output: {
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2'
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
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },

    ]
  },
  plugins: [    
    new MiniCssExtractPlugin({
      filename: "index.css",
      chunkFilename: "[id].css"
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}

module.exports = config;