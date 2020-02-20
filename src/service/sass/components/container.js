const path = require('path')
const cwd = process.cwd()
const resolve = path.resolve

const componentsDir = resolve(cwd, './src/components')

module.exports = {
  chainWebpack (config) {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        componentsDir: JSON.stringify(componentsDir)
      })
      return definitions
    })
  }
}