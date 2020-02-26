module.exports = {
  chainWebpack (config) {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        title: JSON.stringify('标题')
      })
      return definitions
    })
  },
  configureWebpack: {},
  other: {
    publicPath: './'
  }
}
