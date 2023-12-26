const path = require('path');

module.exports = {
  entry: './src/main.mjs',
  output: {
    filename: 'output.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode:'development'
};