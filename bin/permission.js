const fs = require('fs')
const path = require('path')
const cwd = process.cwd()
const srcDir = path.resolve(cwd, './src')
function init () {}

let fileList = []
getFileList(path.resolve(cwd, './src'), fileList)
console.log(fileList)
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
