import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import userConfig from '_src/utils/userConfig'
import register from '_src/utils/register'
import layout from './layout.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: layout,
    children: []
  },
  { path: '*', redirect: 'full/404' }
]
const {
  iass: {
    router: { nProgress, indexPage }
  }
} = userConfig
NProgress.configure(nProgress)
loadRoutes()
const router = new VueRouter({
  routes
})
registerService()

router.register('beforeEach', async (to, from) => {
  nProgress && NProgress.start()
  if (to.path === '/') {
    let homeUrl = indexPage()
    if (homeUrl !== '/') {
      return homeUrl
    }
  }
})

router.register('afterEach', async (to, from) => {
  nProgress && NProgress.done()
})

export default router

// 加载路由
function loadRoutes () {
  const importAllVue = require.context(
    process.env.srcDir,
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
      let router = {
        meta: config,
        path: `/${type}/${path}`,
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
}

// 注册服务
function registerService () {
  const EVENTS = ['beforeEach', 'beforeResolve', 'afterEach']
  const service = register(router, EVENTS)
  EVENTS.forEach(e => {
    router[e](async function (to, from, next) {
      if (!(await service.runAsync(e, next, to, from))) {
        next && next()
      }
    })
  })
}
