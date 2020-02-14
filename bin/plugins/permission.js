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
    let permission = config.permission
    let nav = config.nav
    if(nav.hide){
      return false
    }
    let parents = nav.parents
    let p = { children: navs }
    let child = null
    for (let i = 0; i < parents.length; i++) {
      let title = parents[i]
      child = p.children.find(it => it.title === parents[i])
      if (!child) {
        child = {
          title,
          children: []
        }
        p.children.push(child)
      }
      p = child
    }
    // let permissionData = getPermission(permission, it)
    // let codeArr = it.split(path.sep)
    // p.code = codeArr[codeArr.length - 2]
    // p.apis = permissionData.basic
    // let navChild = []
    // for (let key in permissionData.function) {
    //   let it = permissionData.function[key]
    //   it.code = `${p.code}-${key}`
    //   navChild.push(it)
    // }
    // p.children = navChild
  })
}



function getPermission (permission, filePath) {
  loopObj(permission, (k, v, isObj) => {
    if (k === 'basic') {
      return v
    } else if (k === 'function') {
      let obj = {}
      for (let i=0;i<v.length;i++) {
        let apis = []
        let it = v[key]
        if (it.apis) {
          for (let apiKey in it.apis) {
            apis.push(it.apis[apiKey])
          }
        }
        if (it.goPages) {
          it.goPages.forEach(it => {
            apis = apis.concat(getAllApiInPermission(it))
          })
        }
        if (!it.title) {
          console.log(
            chalk.red(
              `${filePath}中permission.function.${key}不符合规则要求,请添加title`
            )
          )
        }
        obj[key] = {
          title: it.title,
          apis
        }
      }
      return obj
    }
  })
  return permission
}

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

function getAllApiInPermission (cPath) {
  let apis = []
  const goPagesConfig = require(path.join(cwd, './src', cPath, 'config.json'))
  loopObj(goPagesConfig.permission, function (k, v) {
    if (k === 'basic') {
      for (let key in v) {
        apis.push(v[key])
      }
    } else if (k === 'apis') {
      for (let key in apis) {
        apis.push(apis[key])
      }
    }
  })
  return apis
}


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