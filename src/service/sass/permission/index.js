import { MessageBox } from 'element-ui'

export default {
  init ({ request, language, store, router }) {
    // 添加路由监听，当没有token时，跳转到登录页面
    this._initRegisterRouter(router)
    // 为http请求添加token,失败时刷新token
    this._initRegisterRequest(request, language)
    // // 设置store
    this._initRegisterStore(store)
    this._initRegisterVue()
  },
  _initRegisterRequest (request, language) {
    const { token, headerKey } = this.config
    request.register('response', (error, response) => {
      const res = response.data
      if (res[request.format.codeKey] === token.overCode) {
        MessageBox.confirm(language.getLang(token.overMsg), '', {
          type: 'warning'
        }).then(() => {
          token.refresh().then(d => {
            token.set(d)
            location.reload()
          })
        })
      }
    })
    request.register('request', (error, config) => {
      config.headers[headerKey] = token.get()
    })
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
        if (to.path !== loginUrl) {
          return loginUrl
        }
      }
    })
    // 开发环境跳转时，提示添加页面权限
    if (process.env.NODE_ENV === 'development') {
      router.register('beforeEach', async (to, from) => {
        if (/\/full\//.test(from.path) && from.meta.nav && !from.meta.nav.hide) {
          let goPages = []
          loopObj(from.meta.permission, function (k, v, isObj) {
            if (k === 'goPages') {
              goPages = goPages.concat(v)
            }
          })
          if (!goPages.includes(to.path) && !whitePages.includes(to.path)) {
            console.error(`请添加goPages${to.path}`)
          }
        }
      })
    }
  },
  _initRegisterStore (store) {
    const { getUserInfo, getPermission } = this.config
    store.registerState('permission', {
      userInfo: {},
      permission: []
    })
    getUserInfo().then(d => {
      store.store.commit('setPermissionUserInfo', d)
    })
    getPermission().then(d => {
      store.store.commit('setPermissionPermission', d)
    })
  },
  _initRegisterVue (router) {
    const { token, loginUrl } = this.config
    this.Vue.prototype.$permission = {
      token,
      logout () {
        token.remove()
        router.router.next(loginUrl)
      }
    }
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

