const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cwd = process.cwd()
const resolve = path.resolve
const outputDir = resolve(cwd, './dist')
const pagesDir = resolve(cwd, './src/pages')
const iassDir = resolve(__dirname, './src/service/iass')
const sassDir = resolve(__dirname, './src/service/sass')
const services = getServiceConfig()

module.exports = {
  outputDir,
  chainWebpack: config => {
    // define
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        iassDir: JSON.stringify(iassDir),
        sassDir: JSON.stringify(sassDir),
        cwdDir: JSON.stringify(cwd),
        pagesDir: JSON.stringify(pagesDir)
      })
      return definitions
    })
    // eslint
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .tap(options => {
        options.configFile = resolve(__dirname, '.eslintrc.js')
        return options
      })
    // babel
    config.module
      .rule('js')
      .use('babel-loader')
      .tap((options = {}) => {
        options.configFile = resolve(__dirname, 'babel.config.js')
        return options
      })
    // 服务注册配置
    services.forEach(s => {
      s.chainWebpack && s.chainWebpack(config)
    })
  },
  configureWebpack: merge(
    {
      module: {},
      resolve: {
        alias: {
          'element-ui': resolve(__dirname, './node_modules/element-ui'),
          service: resolve(__dirname, './src/service'),
          _src: resolve(__dirname, './src')
        }
      },
      plugins: [
        new CopyWebpackPlugin([
          {
            from: resolve(cwd, './public'),
            to: resolve(outputDir, './public')
          }
        ])
      ]
    },
    getServiceConfigureWebpack()
  )
}


function getFileList (dir, fileList) {
  let files = fs.readdirSync(dir)
  files.forEach((filename, index) => {
    let pathname = path.join(dir, filename)
    let stats = fs.statSync(pathname)
    if (stats.isDirectory()) {
      getFileList(pathname, fileList)
    } else if (stats.isFile()) {
      fileList.push(pathname)
    }
  })
}

function getServiceConfig () {
  const myConfig = require(resolve(cwd, './container.js'))
  let fileList = []
  getFileList(path.resolve(__dirname, './src/service'), fileList)
  fileList = fileList.filter(it => it.slice(-9) === 'config.js')
  return fileList.map(path => require(path)).concat(myConfig)
}

function getServiceConfigureWebpack () {
  return services.reduce((s1, s2) => merge(s1, s2.configureWebpack), {})
}