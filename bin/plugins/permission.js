const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const cwd = process.cwd()

module.exports = {
  cmd: 'permission',
  script () {
    let navs = []
    let fileList = []
    getFileList(path.resolve(cwd, './src/pages/local'), fileList)
    fileList = fileList.filter(it => it.slice(-11) === 'config.json')
    setTree(fileList, navs)
    fs.writeFileSync(
      path.resolve(cwd, 'permission.json'),
      JSON.stringify(navs, null, 2)
    )
  },
  helpInfo: 'permission          [生成权限文件夹]'
}
function setTree (fileList, navs) {
  fileList.forEach(it => {
    const config = require(it)
    const arr = it.split(path.sep)
    const code = arr[arr.length - 2]
    const { permission, nav } = config
    if (nav.hide) {
      return false
    }
    let child = setParents(nav, navs)
    child = setNav(child, nav, code, permission)
    setPermission(child, code, permission)
  })
}
// 处理权限树
function setPermission (child, code, permission) {
  if (!permission || !permission.function) {
    return false
  }
  permission.function.forEach(fuc => {
    const o = {
      title: fuc.title,
      code: `${code}.${fuc.code}`,
      apis: getAPIS(fuc)
    }
    child.push(o)
  })
}
// 处理当前菜单
function setNav (child, { title }, code, permission) {
  let o = {
    title: title,
    code,
    apis: [],
    children: []
  }
  child.push(o)
  if (permission) {
    o.apis = getAPIS(permission)
  }
  return o.children
}
// 处理nav.parents
function setParents (nav, navs) {
  let parents = nav.parents
  let p = { children: navs }
  let child = null
  for (let i = 0; i < parents.length; i++) {
    let title = parents[i]
    child = p.children.find(it => JSON.stringify(it.title) === JSON.stringify(parents[i]))
    if (!child) {
      child = {
        title,
        children: []
      }
      p.children.push(child)
    }
    p = child
  }
  return p.children
}

// 获取API以及gopages
function getAPIS (o) {
  let apis = o.apis || []
  if (o.goPages) {
    apis = apis.concat(getAllApiInPermission(o.goPages))
  }
  return apis
}
// 遍历对象
function loopObj (obj, fuc) {
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(function (key) {
      let v = obj[key]
      let ret = fuc(key, v, typeof v === 'object')
      if (ret) {
        obj[key] = ret
      }
      loopObj(v, fuc)
    })
  }
}
// 获取goPages 中所有权限
function getAllApiInPermission (cPaths) {
  let apis = []
  cPaths.forEach(cPath => {
    const goPagesConfig = require(path.join(cwd, './src/pages', cPath, 'config.json'))
    loopObj(goPagesConfig.permission, function (k, v) {
      if (k === 'apis') {
        apis = apis.concat(v)
      } else if (k === 'goPages') {
        apis = apis.concat(getAllApiInPermission(v))
      }
    })
  })
  return apis
}
// 获取文件列表
const getFileList = function (dir, fileList) {
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