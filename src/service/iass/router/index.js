import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import layout from './layout.vue'
import redirect from './redirect.vue'
import iframe from './iframe.vue'

const routes = [
  {
    path: '/',
    component: layout,
    children: [
      {
        path: 'redirect/:path*',
        component: redirect
      }
    ]
  },
  { path: '*', redirect: 'full/404' }
]
export default {
  init ({ vueFile }) {
    this.routes = routes
    this.Vue.use(VueRouter)
    // 动态加载路由列表
    this._loadRoutes(vueFile)
    this.router = new VueRouter({ routes })
    this.vueRoot = { router: this.router }
    // 注册请求响应服务
    this._initRegisterService()
    // 精度条服务和自动跳转到首页服务
    this._setNProgressHomeService()
  },
  _initRegisterService () {
    const EVENTS = ['beforeEach', 'beforeResolve', 'afterEach']
    const service = this._initRegister(EVENTS)
    EVENTS.forEach(e => {
      this.router[e](async function (to, from, next) {
        if (!(await service.runAsync(e, next, to, from))) {
          next && next()
        }
      })
    })
  },
  _loadRoutes (vueFile) {
    const importFile = require.context(
      process.env.pagesDir,
      true,
      /config\.json$/
    )
    importFile.keys().forEach(it => {
      let arr = it.split('/')
      const type = arr[1]
      const path = arr[2]
      const chidler = type === 'full' ? routes : routes[0].children
      let routerOne = this._getRouteOne(importFile, type, path, vueFile)
      routerOne && chidler.push(routerOne)
    })
    console.log(routes)
  },
  _getRouteOne (importFile, type, path, vueFile) {
    let config = importFile(`./${type}/${path}/config.json`)
    let component
    if (config.iframe) {
      component = iframe
    } else {
      component = vueFile.local[path]
    }
    return (
      component && {
        meta: config,
        path: `/${type}/${path}`,
        component
      }
    )
  },
  _setNProgressHomeService () {
    const { nProgress, indexPage } = this.config
    if (nProgress) {
      nProgress && NProgress.configure(nProgress)
      this.register('beforeEach', async (to, from) => {
        NProgress.start()
        if (to.path === '/') {
          let homeUrl = indexPage()
          if (homeUrl !== '/') {
            return homeUrl
          }
        }
      })
      this.register('afterEach', async (to, from) => {
        NProgress.done()
      })
    }
  }
}
