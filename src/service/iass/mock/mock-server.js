const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

const pagesDir = path.resolve(process.cwd(), './src/pages')
const globMockDir = path.resolve(process.cwd(), 'mock.js')
const mockData = {}

// 加载mockFile目录下所有模拟接口
function flashRoutes (mockFile, isGlob) {
  let arr = mockFile.split(path.sep)
  let len = arr.length
  let code = !isGlob && `/${arr[len - 3]}/${arr[len - 2]}`
  let mockList = (mockData[mockFile] = [])
  delete require.cache[require.resolve(mockFile)]
  const mocks = require(mockFile)
  for (let key in mocks) {
    const splitArr = key.split(':')
    const method = splitArr[0]
    const url = splitArr[1]
    if (method && url) {
      mockList.push({
        code,
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
  app.use(async function (req, res, next) {
    for (let key in mockData) {
      let items = mockData[key]
      for (let i = 0; i < items.length; i++) {
        let it = items[i]
        if (
          it.method.toLocaleUpperCase() === req.method &&
          it.regexp.test(req.path) &&
          (!it.code || (it.code && it.code === req.get('code')))
        ) {
          let d = await it.call(req, delay)
          res.end(JSON.stringify(d))
          return false
        }
      }
    }
    next()
  })
  chokidarWatch()
  chokidarWatchRoot()
  flashRoutes(globMockDir, true)
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

function delay (time) {
  return new Promise(r => {
    setTimeout(() => {
      r()
    }, time)
  })
}

function chokidarWatchRoot () {
  chokidar
    .watch(globMockDir, {
      ignoreInitial: true
    })
    .on('all', (event, path) => {
      flashRoutes(path, true)
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
