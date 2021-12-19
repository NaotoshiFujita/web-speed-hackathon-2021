const path = require('path');

const HtmlWebpackPlugin    = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin   = require( 'css-minimizer-webpack-plugin' );
const BrotliPlugin         = require( 'brotli-webpack-plugin' );
const LoadablePlugin       = require( '@loadable/webpack-plugin' );
const webpack              = require( 'webpack' );

const SRC_PATH    = path.resolve( __dirname, './src' );
const PUBLIC_PATH = path.resolve( __dirname, '../public' );
const UPLOAD_PATH = path.resolve( __dirname, '../upload' );
const DIST_PATH   = path.resolve( __dirname, '../dist' );
const __prod__    = process.env.NODE_ENV === 'production';



/** @type {import('webpack').Configuration} */
const config = {
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: __prod__ ? 8090 : 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: [ PUBLIC_PATH, UPLOAD_PATH ],
  },
  devtool: ! __prod__ && 'inline-source-map',
  entry: {
    main: [
      path.resolve( SRC_PATH, './index.css' ),
      path.resolve( SRC_PATH, './buildinfo.js' ),
      path.resolve( SRC_PATH, './index.jsx' ),
    ],
    webfont: [
      path.resolve( SRC_PATH, './styles/webfont.css' ),
    ],
  },
  mode: 'none',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test   : /\.jsx?$/,
        use    : [ { loader: 'babel-loader' } ],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
    ],
  },
  output: {
    filename     : 'scripts/[name].[fullhash].js',
    path         : DIST_PATH,
    publicPath   : '/',
    chunkFilename: 'chunks/[name].[fullhash].js',
    iife         : false,
  },
  plugins: [
    new webpack.EnvironmentPlugin( {
      BUILD_DATE : new Date().toISOString(),
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV   : process.env.NODE_ENV,
    } ),
    new MiniCssExtractPlugin( {
      filename: 'styles/[name].css',
    } ),
    new HtmlWebpackPlugin( {
      inject  : true,
      template: path.resolve( SRC_PATH, './index.html' ),
    } ),
    new BrotliPlugin( {
      asset: '[file].br',
      test : /\.(js|css)$/,
    } ),
    new LoadablePlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
    alias: {
      'react'               : 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom'           : 'preact/compat',
      'react/jsx-runtime'   : 'preact/jsx-runtime',
    },
  },
  optimization: {
    minimize : __prod__,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = config;
