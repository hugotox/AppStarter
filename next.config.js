const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  cssModules: false,
  webpack: (config, { dev }) => {
    // override devtool if you want
    // if(dev) {
    //   config.devtool = 'cheap-eval-source-map'
    // }

    // include polyfills.js
    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();

      if (entries['main.js']) {
        entries['main.js'].unshift('./polyfills.js');
      }

      return entries;
    };

    return config;
  }
});
