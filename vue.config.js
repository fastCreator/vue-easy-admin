const path = require('path')
const fs = require('fs')
const outputDir = path.resolve(process.cwd(), './dist')
const srcDir = path.resolve(process.cwd(), './src')
const configDir = path.resolve(process.cwd(), './config.json')
let myConfig = {}
if (fs.existsSync(configDir)) {
  myConfig = require(configDir)
}
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
    config.module
      .rule('js')
      .use('babel-loader')
      .tap((options = {}) => {
        options.configFile = path.resolve(__dirname, 'babel.config.js')
        return options
      })
  },
  configureWebpack: {
    resolve: {
      alias: {
        'element-ui': path.resolve(__dirname, './node_modules/element-ui')
      }
    }
  }
}
