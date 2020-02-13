import Vue from 'vue'
import userConfig from './userConfig'
import getService from './service'

//获取所有服务
const iass = require.context(process.env.iassDir, true, /index.js$/)
const sass = require.context(process.env.sassDir, true, /index.js$/)
const service = {
  iass: iass
    .keys()
    .map(key => getService(iass(key).default, 'iass', key.slice(2, -9))),
  sass: sass
    .keys()
    .map(key => getService(sass(key).default, 'sass', key.slice(2, -9)))
}
const components = {
  local: {},
  full: {}
}
const allService = {
  Vue,
  vueFile: components
}
service.iass.forEach(s => {
  allService[s.serviceName] = s
})
service.sass.forEach(s => {
  allService[s.serviceName] = s
})
//初始化vue文件
const files = []
for (let key in allService) {
  let file = allService[key].file
  if (file) {
    files.push({ name: key, file })
  }
}

const importFile = require.context(
  process.env.pagesDir,
  true,
  /\.(\/\w+){3}\.\w+$/,
  'lazy'
)
const importFileKeys = importFile.keys()
importFileKeys.forEach(key => {
  let info = key.split('/')
  if (info[3] === 'index.vue') {
    let type = info[1]
    let path = info[2]
    components[type][path] = async () => {
      let filePaths = []
      files.forEach(file => {
        let filePath = `./${type}/${path}/${file.file}`
        if (importFileKeys.includes(filePath)) {
          filePaths.push(filePath)
        }
      })
      const promises = filePaths.map(function (path) {
        return importFile(path)
      })
      const loadFiles = await Promise.all([
        importFile(`./${type}/${path}/index.vue`),
        ...promises
      ])
      const component = loadFiles[0]
      const def = component.default
      if (!def.mixins) {
        def.mixins = []
      }
      for (let i = 1; i < loadFiles.length; i++) {
        def.mixins.unshift({
          beforeCreate () {
            this[`_serviceFile${files[i - 1].name}`] = loadFiles[i]
          }
        })
      }
      return component
    }
  }
})
//初始化iass服务
service.iass.forEach(s => {
  s.init(allService)
})
service.sass.forEach(s => {
  s.init(allService)
})
// Vue根服务
const _vueRoot = {}
for (let key in allService) {
  Object.assign(_vueRoot, allService[key].vueRoot)
}
Vue.prototype.$service = allService
export default allService
export const vueRoot = _vueRoot
// 用户初始化配置
export const initUser = function () {
  userConfig.init(allService)
}
