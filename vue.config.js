const path = require('path')
// const webpack = require('webpack')
const outputDir = path.resolve(process.cwd(), './dist')
const srcDir = path.resolve(process.cwd(), './src')
const configDir = path.resolve(process.cwd(), './config')
const myConfig = require(configDir)
module.exports = {
  outputDir: outputDir,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        srcDir: JSON.stringify(srcDir),
        config: JSON.stringify(myConfig)
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
