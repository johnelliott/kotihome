var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './lib/control-panel/App'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  devServer: {
    // progress: true,
    hot: true,
    inline: true,
    // https: true,
    host: 'localhost',
    port: 3501, // +1 port number from express-app.js
    contentBase: path.resolve(__dirname, 'public'),
    proxy: {
      // https://github.com/nodejitsu/node-http-proxy#options
      // proxy anything that's not a static asset
      '!/**/*{.css,bundle.js,.hot-update.json}': {
        target: 'http://localhost:3500', // port number from express-app.js
        secure: false
        // changeOrigin: false,
        // hostRewrite: true,
        // autoRewrite: true,
        // localAddress: CURRENT_IP
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      'stage': 0,
      include: path.join(__dirname, 'lib/control-panel'),
      "env": {
        "development": {
          "plugins": ["react-transform"],
          "extra": {
            "react-transform": {
              "transforms": [{
                "transform": "react-transform-hmr",
                "imports": ["react"],
                "locals": ["module"]
              }, {
                "transform": "react-transform-catch-errors",
                "imports": ["react", "redbox-react"]
              }]
            }
          }
        }
      }
    }]
  }
};
