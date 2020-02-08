/**
 * 服务
 * init：初始化
 */
import Vue from 'vue'
import userConfig from './userConfig'
import getService from './service'

const iassService = {}
const sassService = {}

//初始化iass服务
const iass = require.context(process.env.iassDir, true, /index.js$/)
iass.keys().map(key => {
  const serviceName = key.slice(2, -9)
  let s = getService(iass(key).default, 'iass', serviceName)
  iassService[serviceName] = s
})
//初始化sass服务
const sass = require.context(process.env.sassDir, true, /index.js$/)
sass.keys().map(key => {
  const serviceName = key.slice(2, -9)
  let s = getService(sass(key).default, 'sass', serviceName, iassService)
  sassService[serviceName] = s
})


const service = {
  ...iassService,
  ...sassService,
  Vue
}

// Vue根服务
const _vueRoot = {}
for (let key in service) {
  Object.assign(_vueRoot, service[key].vueRoot)
}
Vue.prototype._service = service
export default service
export const vueRoot = _vueRoot
// 用户初始化配置
export const initUser = function () {
  userConfig.init(service)
}
