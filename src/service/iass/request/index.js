import axios from 'axios'
import { Message } from 'element-ui'

export default {
  file: 'api.js',
  init () {
    const { create } = this.config
    // 设置mock数据
    this._setMock()
    this.request = this._createAxios(create)
    // 注册请求响应服务
    this._initRegisterService()
    // 处理错误请求以及不符合格式的响应
    this._dealError()
    // 设置Vue中的net
    this._setVueMixin()
  },
  async net (path, { params, query, body, headers } = {}) {
    // if (this.mocks && this.mocks[path]) {
    //   return await this.mocks[path]({ params, query, body }, delay)
    // }
    let paths = path.split(':')
    let method = paths[0]
    let url = paths[1].replace(/{([a-zA-Z]+)}/g, function (word) {
      return params[word.slice(1, -1)]
    })
    console.log(headers)
    return await this.request({
      method,
      url,
      headers,
      params: query,
      data: body
    })
  },
  _createAxios (create) {
    let adapter = null
    if (this.mockList) {
      adapter = async config => {
        for (let i = 0; i < this.mockList.length; i++) {
          let mock = this.mockList[i]
          if (
            mock.regexp.test(config.url) &&
            config.method === mock.method &&
            (!mock.code || (mock.code && mock.code === config.headers.code))
          ) {
            // 模拟服务，返回mock数据
            const data = await mock.call(
              {
                body: config.data,
                query: config.params,
                get (header) {
                  return config.headers[header]
                }
              },
              delay
            )
            const resInfo = {
              data,
              status: 200,
              statusText: 'OK'
            }
            return resInfo
          }
        }
        // 删除配置中的 adapter, 使用默认值
        delete config.adapter
        return await axios(config)
      }
    }
    return axios.create({ ...create, adapter })
  },
  _setMock () {
    if (this.config.mock) {
      let mocks = { ...require(`${process.env.cwdDir}/mock.js`) }
      const importMock = require.context(
        process.env.pagesDir,
        true,
        /mock\.js$/
      )

      mocks.keys().forEach(key => {
        mocks[key] = {
          code: false,
          call: mocks[key]
        }
      })
      importMock.keys().forEach(key => {
        let mock = importMock(key)
        for (let key in mock) {
          let arr = key.split('/')
          let len = arr.length
          mocks[key] = {
            code: `/${arr[len - 3]}/${arr[len - 2]}`,
            call: mock[key]
          }
        }
      })
      this.mockList = []
      for (let key in mocks) {
        const splitArr = key.split(':')
        const method = splitArr[0]
        const url = splitArr[1]
        if (method && url) {
          const { code, call } = mocks[key]
          this.mockList.push({
            code,
            regexp: new RegExp(url.replace(/\{\w+\}/g, '[^/]+')),
            method,
            call
          })
        } else {
          console.log(`\n请按规范输入正确mock url：${key}`)
        }
      }
    }
  },
  _setVueMixin () {
    const that = this
    this.Vue.mixin({
      computed: {
        $api () {
          let apis = this.files.request[this.$route.name].default
          for (let key in apis) {
            apis[key] = apis[key].bind(this)
          }
          return apis
        }
      },
      methods: {
        $net (path, { params, query, body, headers = {} } = {}) {
          if (process.env.NODE_ENV === 'development') {
            headers.code = this.$route.path
          }
          return that.net.call(that, path, { params, query, body, headers })
        }
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

function delay (time) {
  return new Promise(r => {
    setTimeout(() => {
      r()
    }, time)
  })
}
