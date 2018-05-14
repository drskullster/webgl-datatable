const path = require('path');

module.exports = env => {
  const inProd = env.production;
  return {
    mode: inProd ? "production" : "development",
    entry: './src/app.js',
    devtool: 'source-map',
    devServer: {
      contentBase: './dist',
      host: '0.0.0.0',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    }
  };
};
