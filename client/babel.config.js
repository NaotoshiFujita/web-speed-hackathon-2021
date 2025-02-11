module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        loose: true,
        modules: false,
      }
    ],
    '@babel/preset-react',
  ],
  plugins: [
    '@loadable/babel-plugin',
  ]
};
