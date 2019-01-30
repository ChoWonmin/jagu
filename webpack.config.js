const path = require('path');

module.exports = {
  context: __dirname,
  entry: './src/jagu.js',
  output: {
    path: path.resolve(__dirname, 'js'),
    filename: 'jagu.min.js'
  },
  module: {
  }
};
