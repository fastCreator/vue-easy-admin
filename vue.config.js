const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const cwd = process.cwd()
const resolve = path.resolve
const outputDir = resolve(cwd, './dist')
const srcDir = resolve(cwd, './src')
const svgDir = resolve(cwd, './src/svg')
const pagesDir = resolve(cwd, './src/pages')
const configDir = resolve(cwd, './container.js')
let myConfig = {}
if (fs.existsSync(configDir)) {
  myConfig = require(configDir)
}
let define = {}
for (let key in myConfig.define) {
  define[key] = JSON.stringify(myConfig.define[key])
}
module.exports = {
  outputDir,
  chainWebpack: config => {
    // define
    config.plugin('define').tap(definitions => {
      Object.assign(definitions[0]['process.env'], {
        ...define,
        svgDir: JSON.stringify(svgDir),
        srcDir: JSON.stringify(srcDir),
        cwdDir: JSON.stringify(cwd),
        pagesDir: JSON.stringify(pagesDir),
        config: JSON.stringify(myConfig)
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
    // style-loader
    let normal = config.module
      .rule('css')
      .oneOf('theme')
      .before('normal')
    normal
      .test(/[\\/]theme[\\/]/)
      .use('style-loader')
      .loader('style-loader')
      .tap((options = {}) => {
        options.injectType = 'lazyStyleTag'
        return options
      })
    normal.use('css-loader').loader('css-loader')
    // babel
    config.module
      .rule('js')
      .use('babel-loader')
      .tap((options = {}) => {
        options.configFile = resolve(__dirname, 'babel.config.js')
        return options
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
  },
  configureWebpack: merge(
    {
      module: {},
      resolve: {
        alias: {
          'element-ui': resolve(__dirname, './node_modules/element-ui'),
          iass: resolve(__dirname, './src/iass'),
          sass: resolve(__dirname, './src/sass'),
          _src: resolve(__dirname, './src')
        }
      },
      devServer: {
        before: require('./src/sass/mock/mock-server'),
        proxy: myConfig.proxy
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
    myConfig.configureWebpack
  )
}
