const path = require('path')
const fs = require('fs')
const cwd = process.cwd()
const outputDir = path.resolve(cwd, './dist')
const indexPath = path.resolve(cwd, './public/index.html')
const srcDir = path.resolve(cwd, './src')
const pagesDir = path.resolve(cwd, './src/pages')
const configDir = path.resolve(cwd, './config.json')
let myConfig = {}
if (fs.existsSync(configDir)) {
  myConfig = require(configDir)
}
module.exports = {
  outputDir,
  indexPath,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        srcDir: JSON.stringify(srcDir),
        pagesDir: JSON.stringify(pagesDir),
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
    },
    devServer: {
      before (app) {
        app.get('/some/path', function (req, res) {
          res.json({ custom: 'response' })
        })
      }
    }
  }
}
