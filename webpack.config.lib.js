const webpack = require("webpack"),
  path = require("path");

const config = {
  entry: {
    styles: path.resolve(__dirname, "src/components/app/app.scss")
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
        test: /\.scss$/, 
        use: [
          {loader: 'style-loader'}, 
          {loader: 'css-loader'}, 
          {loader: 'sass-loader'}
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  }
}

module.exports = config;