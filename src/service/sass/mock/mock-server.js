const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const pagesDir = path.resolve(process.cwd(), './src/pages')
const mockData = {}

function flashRoutes (mockFile) {
  let mockList = (mockData[mockFile] = [])
  delete require.cache[require.resolve(mockFile)]
  const mocks = require(mockFile)
  for (let key in mocks) {
    const splitArr = key.split(':')
    const method = splitArr[0]
    const url = splitArr[1]
    if (method && url) {
      mockList.push({
        regexp: new RegExp(url.replace(/\{\w+\}/g, '[^/]+')),
        method,
        call: mocks[key]
      })
    } else {
      console.log(chalk.red(`\n请按规范输入正确mock url：${mockFile} - ${key}`))
    }
  }
}

module.exports = app => {
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  )
  app.use(function (req, res, next) {
    for (let key in mockData) {
      let items = mockData[key]
      for (let i = 0; i < items.length; i++) {
        let it = items[i]
        if (
          it.method.toLocaleUpperCase() === req.method &&
          it.regexp.test(req.path)
        ) {
          res.end(JSON.stringify(it.call(req)))
          return false
        }
      }
    }
    next()
  })
  chokidarWatch(app)
  mapDir(pagesDir, function (file) {
    if (file.slice(-7) === 'mock.js') {
      flashRoutes(file)
    }
  })
}

function chokidarWatch () {
  chokidar
    .watch(pagesDir, {
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      if (/mock\.js$/.test(path)) {
        flashRoutes(path)
      }
    })
}

function mapDir (dir, callback) {
  fs.readdir(dir, function (err, files) {
    if (err) {
      console.error(err)
      return
    }
    files.forEach((filename, index) => {
      let pathname = path.join(dir, filename)
      fs.stat(pathname, (err, stats) => {
        // 读取文件信息
        if (err) {
          console.log('获取文件stats失败')
          return
        }
        if (stats.isDirectory()) {
          mapDir(pathname, callback)
        } else if (stats.isFile()) {
          callback && callback(pathname)
        }
      })
    })
  })
}
