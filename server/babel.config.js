module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    [
      'transform-react-jsx',
      // {
      //   pragma: 'h',
      // },
    ],
  ],
};
