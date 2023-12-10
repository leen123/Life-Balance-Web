const { override, fixBabelImports, addLessLoader } = require('customize-cra');

module.exports = override(
  function(webpackConfig, env) {
    if (!webpackConfig.plugins) {
      config.plugins = [];
    }
    return webpackConfig;
  },

  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'true',
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      '@primary-color': '#6562FC',
    },
  }),
);
