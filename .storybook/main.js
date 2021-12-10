const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-controls',
    '@storybook/addon-links',
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.resolve.modules.push(path.join(__dirname, '../src'));

    config.module.rules.find(
        rule => rule.test.toString() === '/\\.css$/',
      ).exclude = /\.module\.css$/;

    config.module.rules.push(
      {
        test: /\.module\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            },
          },
        ],
        include: /\.module\.css$/,
      }
    );

    // Return the altered config
    return config;
  },
};
