var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'js/index.js'),
    output: {
        path: path.resolve(__dirname, 'out'),
        filename: 'index.js',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },

        {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
            exclude: /node_modules/
        },

        { test: /\.scss$/, loader:'style-loader!css-loader!sass-loader' },
      ]
    }
};