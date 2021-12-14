const { resolve }   = require( 'path' );
const webpack       = require( 'webpack' );
const nodeExternals = require( 'webpack-node-externals' );

const SRC_PATH    = resolve( __dirname, './src' );
const DIST_PATH   = resolve( __dirname, './dist' );
const PUBLIC_PATH = resolve( __dirname, './public' );


const config = {
  entry: resolve( SRC_PATH, './index.js' ),
  context: SRC_PATH,
  target: 'node',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test   : /\.jsx?$/,
        use    : [ { loader: 'babel-loader' } ],
      },
    ],
  },
  output: {
    path      : DIST_PATH,
    filename  : 'index.js',
    publicPath: PUBLIC_PATH,
    library   : {
      type: 'commonjs2',
    },
  },
  resolve: {
    extensions    : [ '.js', '.jsx' ],
    preferAbsolute: true,
    roots         : [ SRC_PATH ],
    alias: {
      'react'               : 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom'           : 'preact/compat',
      'react/jsx-runtime'   : 'preact/jsx-runtime',
    },
  },
  externals: [
    nodeExternals( {
      modulesFromFile: true,
    } ),
  ],
  plugins: [
    new webpack.IgnorePlugin( {
      resourceRegExp: /\.(css|html|br)$/,
    } ),
  ],
  optimization: {
    minimize: false,
  }
};

module.exports = config;
