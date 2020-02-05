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
    config.module
      .rule('svg')
      .exclude.add(svgDir)
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(svgDir)
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}