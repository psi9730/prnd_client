const baseConfig = require('../webpack.config')

module.exports = storybookBaseConfig =>
  Object.assign({}, storybookBaseConfig, {
    entry: Object.assign({}, {
      preview: ['babel-polyfill'].concat(storybookBaseConfig.entry.preview),
    },storybookBaseConfig.entry,),
    resolve: {
      modulesDirectories: baseConfig.resolve.modules,
    },
    module: Object.assign({}, storybookBaseConfig.module, {
      loaders: storybookBaseConfig.module.loaders.concat(baseConfig.module.rules.slice(1)),
    }),
  })
