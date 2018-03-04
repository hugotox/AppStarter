require('dotenv').config();
const webpack = require('webpack');
const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: false,
  webpack: (config, { dev }) => {
    // override devtool if you want
    // if(dev) {
    //   config.devtool = 'cheap-eval-source-map'
    // }

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js');
      }

      return entries;
    };

    const env = Object.keys(process.env).reduce((acc, curr) => {
      acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
      return acc
    }, {})

    config.plugins.push(new webpack.DefinePlugin(env))

    return config;
  }
});
