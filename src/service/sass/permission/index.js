import { Message } from 'element-ui'
export default {
  init ({ request, language, store, router }) {
    this.store = store
    this.request = request
    // 添加路由监听，当没有token时，跳转到登录页面
    this._initRegisterRouter(router)
    // 为http请求添加token,失败时刷新token
    this._initRegisterRequest(request, router)
    // // 设置store
    this._initRegisterStore()
    this._initRegisterVue(router)
  },
  async after ({ navs }) {
    await this._setPermission()
  },
  _setPermission (tokenKey) {
    const { getUserInfo, getPermission, token } = this.config
    if (tokenKey) {
      token.set(tokenKey)
    }
    if (token.get()) {
      let arr = [
        getUserInfo(this.request).then(d => {
          this.store.store.commit('setPermissionUserInfo', d)
        }),
        getPermission(this.request).then(d => {
          this.store.store.commit(
            'setPermissionPermission',
            d.concat(this.config.whiteSource)
          )
        })
      ]
      return Promise.all(arr)
    }
  },
  _initRegisterRequest (request, router) {
    let that = this
    const { token, headerKey, loginUrl, whiteAPI } = this.config
    that.request.register(
      'response',
      async (error, response) => {
        const res = response.data
        const code = res[request.config.format.codeKey].toString()
        if (code === token.OverTimeCode.toString()) {
          const d = await token.refresh(request)
          await token.set(d)
          location.reload()
        } else if (code === token.InvalidCode.toString()) {
          token.remove()
          if (isExternal(loginUrl)) {
            window.location = loginUrl
          } else {
            router.router.push(loginUrl)
          }
        }
      },
      'pre'
    )
    that.request.register(
      'request',
      (error, config) => {
        config.headers[headerKey] = token.get()
      },
      'pre'
    )
    // 开发环境接口请求时提示报错没配置API权限
    if (process.env.NODE_ENV === 'development') {
      that.request.register(
        'request',
        (error, config) => {
          const api = `${config.method}:${config.url}`
          let meta = router.router.app.$route.meta
          if (meta.permission) {
            let APIS = [...whiteAPI]
            loopObj(meta.permission, function (k, v, isObj) {
              if (k === 'basic' || k === 'apis') {
                APIS = APIS.concat(v)
              }
            })
            let hasAPI = false
            for (let i = 0; i < APIS.length; i++) {
              let regx = new RegExp(APIS[i].replace(/\{\w+\}/g, '[^/]+'))
              if (regx.test(api)) {
                hasAPI = true
                break
              }
            }
            if (!hasAPI) {
              Message.error(`请添加API权限:${api}`)
            }
          }
        },
        'pre'
      )
    }
  },
  _initRegisterRouter (router) {
    const { loginUrl, token, whitePages } = this.config
    router.register('beforeEach', async (to, from) => {
      const hasToken = token.get()
      if (hasToken) {
        if (to.path === loginUrl) {
          return '/'
        }
      } else {
        if (isExternal(loginUrl)) {
          window.location = loginUrl
        } else if (to.path !== loginUrl) {
          return loginUrl
        }
      }
    })
    // 开发环境跳转时，提示添加页面权限
    if (process.env.NODE_ENV === 'development') {
      router.register('beforeEach', async (to, from) => {
        if (
          from.meta.permission &&
          to.meta.permission &&
          to.meta.permission.share
        ) {
          let goPages = []
          loopObj(from.meta.permission, function (k, v, isObj) {
            if (k === 'goPages') {
              goPages = goPages.concat(v)
            }
          })
          if (!goPages.includes(to.path)) {
            console.error(`请添加goPages标识共享功能页面:${to.path}`)
          }
        }
      })
    }
  },
  _initRegisterStore () {
    this.store.registerState('permission', {
      userInfo: {},
      permission: []
    })
  },
  _initRegisterVue (router) {
    const { token, loginUrl } = this.config
    this.login = async function login (tokenKey) {
      token.set(tokenKey)
    }
    this.logout = async function logout () {
      token.remove()
      if (isExternal(loginUrl)) {
        window.location = loginUrl
      } else {
        router.router.push(loginUrl)
      }
    }
  },
  hasPermission (p) {
    this.store.store.state.permission.permission.includes(p)
  }
}

function loopObj (obj, fuc) {
  if (typeof obj === 'object') {
    Object.keys(obj).forEach(function (key) {
      let v = obj[key]
      fuc(key, v, typeof v === 'object')
      loopObj(v, fuc)
    })
  }
}

const isExternal = function (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
