const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: './src/server.ts',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'development',
  target: 'node',
  externals: [nodeExternals({ modulesFromFile: true })],
  node: {
    __dirname: false,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
}
