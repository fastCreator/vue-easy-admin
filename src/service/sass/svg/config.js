const path = require('path')
const cwd = process.cwd()
const resolve = path.resolve

const svgDir = resolve(cwd, './src/svg')

module.exports = {
  chainWebpack (config) {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        svgDir: JSON.stringify(svgDir)
      })
      return definitions
    })
    // set svg-sprite-loader
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  }
}
