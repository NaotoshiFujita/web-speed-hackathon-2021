const { resolve }   = require( 'path' );
const webpack       = require( 'webpack' );
const nodeExternals = require( 'webpack-node-externals' );

const SRC_PATH  = resolve( __dirname, './src' );
const DIST_PATH = resolve( __dirname, './dist' );


const config = {
  entry: resolve( SRC_PATH, './index.js' ),
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
    path    : DIST_PATH,
    filename: 'index.js',
    library : {
      type: 'commonjs2',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      'react'            : 'preact/compat',
      'react-dom'        : 'preact/compat',
      'react/jsx-runtime': 'preact/jsx-runtime',
    },
  },
  externals: [ nodeExternals() ],
  plugins: [
    new webpack.IgnorePlugin( {
      resourceRegExp: /\.(css|html|br)$/,
    } ),
  ],
  optimization: {
    minimize: true,
  }
};

module.exports = config;
