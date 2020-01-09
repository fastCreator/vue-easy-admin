const path = require('path')
// const webpack = require('webpack')
const outputDir = path.resolve(process.cwd(), './dist')
const src_dir = path.resolve(process.cwd(), './src')
module.exports = {
  outputDir: outputDir,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        src_dir: JSON.stringify(src_dir)
      })
      return definitions
    })
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.configFile = path.resolve(__dirname, '.eslintrc.js')
        return options
      })
  }
}
