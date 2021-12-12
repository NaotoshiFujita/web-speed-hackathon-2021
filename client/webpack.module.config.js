const path = require('path');

const webpack = require( 'webpack' );

const SRC_PATH    = path.resolve( __dirname, './src' );
const DIST_PATH   = path.resolve( __dirname, '../dist' );
const __prod__    = process.env.NODE_ENV === 'production';


// todo should be included to the build process
const config = {
  entry: {
    app: [
      path.resolve( SRC_PATH, './containers/AppContainer/index.js' ),
    ],
  },
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
    filename    : 'modules/[name].js',
    path        : DIST_PATH,
    publicPath  : '',
    globalObject: 'this',
    library : {
      type: 'commonjs2',
    },
  },
  plugins: [
    new webpack.ProvidePlugin( {
      Buffer: [ 'buffer', 'Buffer' ],
    } ),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
    // todo
    // alias: {
    //   'react'               : 'preact/compat',
    //   'react-dom/test-utils': 'preact/test-utils',
    //   'react-dom'           : 'preact/compat',
    //   'react/jsx-runtime'   : 'preact/jsx-runtime',
    // },
  },
  optimization: {
    minimize : false,
  },
  externals: [
    {
      react             : 'react',
      'react-dom'       : 'react-dom',
      'react-router-dom': 'react-router-dom',
      'react-query'     : 'react-query',
    },
  ],
};

module.exports = config;
