const path = require('path');

const HtmlWebpackPlugin          = require( 'html-webpack-plugin' );
const MiniCssExtractPlugin       = require( 'mini-css-extract-plugin' );
const CssMinimizerPlugin         = require( 'css-minimizer-webpack-plugin' );
const BrotliPlugin               = require( 'brotli-webpack-plugin' );
const webpack                    = require( 'webpack' );

const SRC_PATH    = path.resolve( __dirname, './src' );
const PUBLIC_PATH = path.resolve( __dirname, '../public' );
const UPLOAD_PATH = path.resolve( __dirname, '../upload' );
const DIST_PATH   = path.resolve( __dirname, '../dist' );
const __prod__    = process.env.NODE_ENV === 'production';



/** @type {import('webpack').Configuration} */
const config = {
  // todo
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: __prod__ ? 8001 : 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: [ PUBLIC_PATH, UPLOAD_PATH ],
  },
  devtool: ! __prod__ && 'inline-source-map',
  entry: {
    main: [
      'regenerator-runtime/runtime',
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
    filename: 'scripts/[name].js',
    path: DIST_PATH,
  },
  plugins: [
    new webpack.ProvidePlugin( {
      Buffer: [ 'buffer', 'Buffer' ],
    } ),
    new webpack.EnvironmentPlugin( {
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV   : __prod__ ? 'production' : 'development',
    } ),
    new MiniCssExtractPlugin( {
      filename: 'styles/[name].css',
    } ),
    new HtmlWebpackPlugin( {
      inject  : false,
      template: path.resolve( SRC_PATH, './index.html' ),
      minify: {
        collapseWhitespace           : true,
        removeComments               : true,
        removeRedundantAttributes    : true,
        removeScriptTypeAttributes   : true,
        removeStyleLinkTypeAttributes: true,
      }
    } ),
    new BrotliPlugin( {
      asset: '[file].br',
      test : /\.(js|css)$/,
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
    minimize : __prod__,
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = config;
