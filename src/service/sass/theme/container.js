const path = require('path')
const cwd = process.cwd()
const resolve = path.resolve

const themeDir = resolve(cwd, './src/theme')

module.exports = {
  chainWebpack (config) {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        themeDir: JSON.stringify(themeDir)
      })
      return definitions
    })

    let normal = config.module
      .rule('css')
      .oneOf('theme')
      .before('normal')
    normal
      .test(/[\\/]theme[\\/]/)
      .use('style-loader')
      .loader('style-loader')
      .tap((options = {}) => {
        options.injectType = 'lazyStyleTag'
        return options
      })
    normal.use('css-loader').loader('css-loader')
  }
}