// craco.config.js

module.exports = {
    style: {
      postcss: {
        plugins: [
          require('postcss-rtl'), // Add this line for right-to-left (RTL) support
        ],
      },
    },
    webpack: {
      configure: (webpackConfig) => {
        // Add your custom Webpack configurations here
        return webpackConfig;
      },
    },
  };
  