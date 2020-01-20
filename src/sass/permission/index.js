import { MessageBox, Message } from 'element-ui'

import userConfig from '_src/utils/userConfig'
import { setKeyValue } from '_src/utils/comom'

import request from '_src/iass/request'
import language from '_src/iass/language'
import store from '_src/iass/store'
import router from '_src/iass/router'

const {
  sass: {
    permission: {
      token,
      loginUrl,
      whitePages,
      headerKey,
      getUserInfo,
      getPermission
    }
  }
} = userConfig

// 添加路由监听，当没有token时，跳转到登录页面
setRouter()

// 为http请求添加token,失败时刷新token
setRequest()
// 设置store
setStore()

function setStore () {
  store.registerModule('permission', {
    state: {
      userInfo: {},
      permission: []
    },
    mutations: {
      setUserInfo: setKeyValue('userInfo'),
      setPermission: setKeyValue('permission')
    }
  })
  getUserInfo().then(d => {
    store.commit('setUserInfo', d)
  })
  getPermission().then(d => {
    store.commit('setPermission', d)
  })
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
function setRequest () {
  request.register('response', (error, response) => {
    const res = response.data
    if (res[request.format.codeKey] === token.overCode) {
      MessageBox.confirm(language.getLang(token.overCode), '', {
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
}

function setRouter () {
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
}

export default {
  logout () {
    token.remove()
    router.next(loginUrl)
  }
}
