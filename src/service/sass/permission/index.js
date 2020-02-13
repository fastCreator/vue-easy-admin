import { MessageBox } from 'element-ui'

export default {
  async init ({ request, language, store, router, navs }) {
    this.store = store
    this.request = request
    // 添加路由监听，当没有token时，跳转到登录页面
    this._initRegisterRouter(router)
    // 为http请求添加token,失败时刷新token
    this._initRegisterRequest(language)
    // // 设置store
    this._initRegisterStore()
    this._initRegisterVue()
    this._initRegisterNavsFilter(navs)
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
          this.store.store.commit('setPermissionPermission', d)
        })
      ]
      return Promise.all(arr)
    }
  },
  _initRegisterNavsFilter (navs) {
    let that = this
    let state = that.store.store.state
    navs.registerNavsFilter(function (code) {
      return state.permission.permission.includes(`local/${code}`)
    })
  },
  _initRegisterRequest (language) {
    const { token, headerKey } = this.config
    this.request.register('response', (error, response) => {
      const res = response.data
      if (res[this.request.format.codeKey] === token.overCode) {
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
    this.request.register('request', (error, config) => {
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
        if (
          /\/full\//.test(from.path) &&
          from.meta.nav &&
          !from.meta.nav.hide
        ) {
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
  _initRegisterStore () {
    this.store.registerState('permission', {
      userInfo: {},
      permission: []
    })
  },
  _initRegisterVue (router) {
    const { token, loginUrl } = this.config
    this.Vue.prototype.$permission = {
      async login (tokenKey) {
        token.set(tokenKey)
      },
      async logout () {
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
