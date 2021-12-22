const { resolve }   = require( 'path' );
const webpack       = require( 'webpack' );
const nodeExternals = require( 'webpack-node-externals' );

const SRC_PATH         = resolve( __dirname, './src' );
const DIST_PATH        = resolve( __dirname, './dist' );
const CLIENT_DIST_PATH = resolve( __dirname, '../dist' );
const PUBLIC_PATH      = resolve( __dirname, './public' );


const config = {
  entry  : resolve( SRC_PATH, './index.js' ),
  context: SRC_PATH,
  target : 'node',
  module : {
    rules: [
      {
        exclude: /node_modules/,
        test   : /\.jsx?$/,
        use    : [ { loader: 'babel-loader' } ],
      },
      {
        include: resolve( CLIENT_DIST_PATH, './styles/main.css' ),
        test   : /\.css$/,
        loader : 'css-loader',
        options: {
          url: false,
        },
      },
      {
        test  : /\.svg$/,
        loader: 'svg-inline-loader',
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
    extensions    : [ '.js', '.jsx', '.css' ],
    preferAbsolute: true,
    roots         : [ SRC_PATH ],
    alias         : {
      'react'               : 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom'           : 'preact/compat',
      'react/jsx-runtime'   : 'preact/jsx-runtime',

      [ resolve( CLIENT_DIST_PATH, './styles/webfont.css' ) ]: false,
    },
  },
  externals: [
    nodeExternals( {
      modulesFromFile: true,
    } ),
  ],
  plugins: [
    new webpack.IgnorePlugin( {
      resourceRegExp: /\.(html|br)$/,
    } ),
  ],
  optimization: {
    minimize: true,
  },
};

module.exports = config;
