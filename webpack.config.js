const path = require('path');
const copyFiles = require('copy-webpack-plugin');

module.exports = {
  entry: './src/Web.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new copyFiles({
      patterns: [
        { from: 'dist/bundle.js', to: 'webui/bundle.js' },
      ],
    }),
  ]
};