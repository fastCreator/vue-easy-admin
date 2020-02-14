const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cwd = process.cwd()
const resolve = path.resolve
const outputDir = resolve(cwd, './dist')
const pagesDir = resolve(cwd, './src/pages')
const serviceDir = resolve(__dirname, './src/service')
const iassDir = resolve(__dirname, './src/service/iass')
const sassDir = resolve(__dirname, './src/service/sass')
const services = getServiceConfig()
module.exports = {
  outputDir,
  productionSourceMap: false,
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
    // html
    config.plugin('html').tap(args => {
      args[0].template = resolve(cwd, 'public/index.html')
      return args
    })
    // 源文件映射
    config
      // https://webpack.js.org/configuration/devtool/#development
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-source-map')
      )
    
    config
      .when(process.env.NODE_ENV !== 'development',
        // 运行时JS打包进入html
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
          // 代码分割
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 仅打包最初依赖的第三方
                },
                elementUI: {
                  name: 'chunk-elementUI', // 分开element-ui
                  priority: 20, // 必须高于lib优先级，否则会打包进入lib
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-frame',
                  test: resolve(__dirname,'src'), // 分开框架代码
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          config.optimization.runtimeChunk('single')
        }
      )
    // 共用eslint
    // config.module
    //   .rule('eslint')
    //   .use('eslint-loader')
    //   .tap(options => {
    //     options.configFile = resolve(__dirname, '.eslintrc.js')
    //     return options
    //   })
    // 共用babel
    // config.module
    //   .rule('js')
    //   .use('babel-loader')
    //   .tap((options = {}) => {
    //     options.configFile = resolve(__dirname, 'babel.config.js')
    //     return options
    //   })
    //
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
          'element-ui': resolve(cwd, './node_modules/element-ui'),
          '@service': resolve(__dirname, './src/service'),
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
  const fileName = 'container.js'
  const myConfig = require(resolve(cwd, './container.js'))
  let fileList = []
  getFileList(path.resolve(__dirname, './src/service'), fileList)
  fileList = fileList.filter(it => it.slice(-fileName.length) === fileName)
  return fileList.map(path => require(path)).concat(myConfig)
}

function getServiceConfigureWebpack () {
  return services.reduce((s1, s2) => merge(s1, s2.configureWebpack), {})
}
