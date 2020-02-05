import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import language from 'service/iass/language'
import register from '_src/utils/register'
import userConfig from '_src/utils/userConfig'
const {
  format,
  format: { codeKey, successCode, msgKey, dataKey },
  error: { time = 4000, message },
  baseURL,
  config
} = userConfig.iass.request

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? baseURL.dev : baseURL.build,
  config
})

instance.format = format

setNet() // 扩展net方法
registerService() // 注册服务
errorService() // 请求返回错误格式，统一处理
VueMixin()

export default instance

function setNet () {
  instance.net = function (path, { params, query, body } = {}) {
    let paths = path.split(':')
    let method = paths[0]
    let url = paths[1].replace(/{([a-zA-Z]+)}/g, function (word) {
      return params[word.slice(1, -1)]
    })
    return instance({
      method,
      url,
      params: query,
      data: body
    })
  }
}

function registerService () {
  const EVENTS = ['request', 'response']
  const service = register(instance, EVENTS)
  EVENTS.forEach(e => {
    instance.interceptors[e].use(
      config => {
        return service.run(e, _ => _, null, config)
      },
      error => {
        service.run(e, _ => _, error, null)
      }
    )
  })
}

function errorService () {
  instance.register('response', (error, response) => {
    if (error) {
      Message({
        message: error.message,
        type: 'error',
        duration: time
      })
      return Promise.reject(error)
    }
    if (response.status !== 200) {
      Message.error(language.getLang[message])
    }
    const res = response.data
    if (res[codeKey] !== successCode) {
      Message({
        message: res[msgKey] || 'Error',
        type: 'error',
        duration: time
      })
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res[dataKey]
    }
  })
}

function VueMixin () {
  Vue.mixin({
    methods: {
      $net (path, data) {
        let url = this.$route.meta.permission
        path.split('.').forEach(it => {
          url = url[it]
        })
        return instance.net(url, data)
      }
    }
  })
}
