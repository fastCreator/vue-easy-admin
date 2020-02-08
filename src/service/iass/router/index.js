
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import layout from './layout.vue'
import redirect from './redirect.vue'

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
  init () {
    this.routes = routes
    this.Vue.use(VueRouter)
    // 动态加载路由列表
    this._loadRoutes()
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
  _loadRoutes () {
    const importAllVue = require.context(
      process.env.pagesDir,
      true,
      /index.vue|config.json$/
    )
    importAllVue.keys().map(key => {
      let info = key.split('/')
      if (info[3] === 'config.json') {
        let type = info[1]
        let path = info[2]
        let config = importAllVue(`./${type}/${path}/config.json`)
        let components = importAllVue(`./${type}/${path}/index.vue`).default
        const name = `${type}${path}`
        components.name = name
        let router = {
          meta: config,
          path: `/${type}/${path}`,
          name: name,
          component: config.nav.lazy
            ? resolve => {
              resolve(components)
            }
            : components
        }
        if (type === 'full') {
          routes.push(router)
        } else {
          routes[0].children.push(router)
        }
      }
    })
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
