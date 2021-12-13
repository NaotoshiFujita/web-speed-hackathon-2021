const path    = require( 'path' );
const webpack = require( 'webpack' );

const SRC_PATH  = path.resolve( __dirname, './src' );
const DIST_PATH = path.resolve( __dirname, '../dist' );


const config = {
  entry: {
    app: [
      path.resolve( SRC_PATH, './containers/AppContainer/index.js' ),
    ],
  },
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
    filename    : 'modules/[name].js',
    path        : DIST_PATH,
    publicPath  : '/',
    globalObject: 'this',
    library : {
      type: 'commonjs2',
    },
    chunkFilename: ( pathData, assetInfo ) => {
      return `modules/chunks/${ pathData.chunk.name || pathData.chunk.id }.js`;
    },
  },
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
    minimize : true,
  },
  // todo
  externals: [
    {
      react             : 'react',
      'react-dom'       : 'react-dom',
      'react-router-dom': 'react-router-dom',
      'react-query'     : 'react-query',
    },
    '@loadable/component',
  ],
};

module.exports = config;
