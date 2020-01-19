const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: path.resolve(__dirname, '../index.ts'),
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'index.js',
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
              },
            },
          },
        ],
      },
    ],
  },
}
