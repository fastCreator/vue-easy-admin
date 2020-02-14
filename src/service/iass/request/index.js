import axios from 'axios'
import { Message } from 'element-ui'

export default {
  file: 'api.js',
  init () {
    const { create } = this.config
    this.request = axios.create(create)
    // 注册请求响应服务
    this._initRegisterService()
    // 处理错误请求以及不符合格式的响应
    this._dealError()
    // 设置Vue中的net
    this._setVueMixin()
  },
  net (path, { params, query, body } = {}) {
    let paths = path.split(':')
    let method = paths[0]
    let url = paths[1].replace(/{([a-zA-Z]+)}/g, function (word) {
      return params[word.slice(1, -1)]
    })
    return this.request({
      method,
      url,
      params: query,
      data: body
    })
  },
  _setVueMixin () {
    const that = this
    this.Vue.mixin({
      computed: {
        $api () {
          let apis = this._serviceFilerequest.default
          for (let key in apis) {
            apis[key] = apis[key].bind(this)
          }
          return apis
        }
      },
      methods: {
        $net: that.net.bind(that)
      }
    })
  },
  _initRegisterService () {
    const EVENTS = ['request', 'response']
    const service = this._initRegister(EVENTS)
    EVENTS.forEach(e => {
      this.request.interceptors[e].use(
        config => {
          return service.runAsync(e, _ => _, null, config)
        },
        error => {
          service.runAsync(e, _ => _, error, null)
        }
      )
    })
  },
  _dealError () {
    const {
      format: { codeKey, successCode, msgKey, dataKey },
      MessageTime = 2000
    } = this.config
    this.register('response', (error, response) => {
      if (error) {
        Message({
          message: error.message,
          type: 'error',
          duration: MessageTime
        })
        return Promise.reject(error)
      }
      if (response.status !== 200) {
        Message.error('Network exception, please try again later')
      }
      const res = response.data
      if (res[codeKey] !== successCode) {
        Message({
          message: res[msgKey] || 'Error',
          type: 'error',
          duration: MessageTime
        })
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res[dataKey]
      }
    })
  }
}
