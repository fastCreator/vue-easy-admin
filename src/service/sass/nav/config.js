const path = require('path')
const cwd = process.cwd()
const resolve = path.resolve

const localDir = resolve(cwd, './src/pages/local')

module.exports = {
  chainWebpack (config) {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        localDir: JSON.stringify(localDir)
      })
      return definitions
    })
  }
}