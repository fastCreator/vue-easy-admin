import NProgress from 'nprogress'
import { MessageBox, Message } from 'element-ui'

import request from '../request'
import store from '../store'
import router from '../router'

const { title } = process.env.config

// 添加路由监听，当没有token时，跳转到登录页面
export const registerRouterToken = ({ get, loginUrl, goHome }) => {
  NProgress.configure({ showSpinner: false })
  router.addbeforeEach(async (to, from, next) => {
    // if (to.path === '/') {
    //   let homeUrl = goHome(store)
    //   if (homeUrl !== '/') {
    //     return homeUrl
    //   }
    // }
    NProgress.start()
    // document.title = `${ to.meta.title || to.meta.nav ? to.meta.nav.title : '' }-${title}`
    const hasToken = get()

    if (hasToken) {
      if (to.path === loginUrl) {
        // 如果登录，有token进入首页；退出时，一定要先清除token
        NProgress.done()
        return '/'
      }
    } else {
      NProgress.done()
      return loginUrl
    }
  })
}

// 为http请求添加token,失败时刷新token
export const registerRequestToken = userManage => {
  const {
    codeKey,
    successCode,
    msgKey,
    errorTime = 5 * 1000,
    dataKey,
    tokenOverCode,
    error
  } = process.env.config.request
  request.interceptors.request.use(
    config => {
      config.headers[userManage.headerKey] = userManage.get()
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  const locale = store.state.lang.locale
  request.interceptors.response.use(
    response => {
      if (response.status !== 200) {
        Message.error(error.status[locale])
      }
      const res = response.data
      if (res[codeKey] !== successCode) {
        Message({
          message: res[msgKey] || 'Error',
          type: 'error',
          duration: errorTime
        })
        if (res.code === tokenOverCode) {
          MessageBox.confirm(error.tokenOver[locale], '', {
            type: 'warning'
          }).then(() => {
            userManage.resetToken().then(d => {
              userManage.set(d)
              location.reload()
            })
          })
        }
        return Promise.reject(new Error(res.message || 'Error'))
      } else {
        return res[dataKey]
      }
    },
    error => {
      Message({
        message: error.message,
        type: 'error',
        duration: errorTime
      })
      return Promise.reject(error)
    }
  )
}
