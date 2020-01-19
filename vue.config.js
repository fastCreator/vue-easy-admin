const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cwd = process.cwd()
const outputDir = path.resolve(cwd, './dist')
const srcDir = path.resolve(cwd, './src')
const pagesDir = path.resolve(cwd, './src/pages')
const configDir = path.resolve(cwd, './config.json')
let myConfig = {}
if (fs.existsSync(configDir)) {
  myConfig = require(configDir)
}
module.exports = {
  outputDir,
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        srcDir: JSON.stringify(srcDir),
        pagesDir: JSON.stringify(pagesDir),
        CWD_URL: JSON.stringify(cwd),
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
  configureWebpack: merge(
    {
      resolve: {
        alias: {
          'element-ui': path.resolve(__dirname, './node_modules/element-ui'),
          utils: path.resolve(__dirname, './utils')
        }
      },
      devServer: {
        before: require('./plugins/mock-server'),
        proxy: myConfig.proxy
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: path.resolve(cwd, './public'),
            to: path.resolve(outputDir, './public')
          }
        ])
      ]
    },
    myConfig.configureWebpack
  )
}
