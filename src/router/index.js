import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../components/layout'
Vue.use(VueRouter)

let routes = [
  {
    path: '/',
    component: Layout,
    hidden: true,
    children: []
  }
]

const ORouter = []
const importAllVue = require.context(process.env.srcDir, true, /index.vue$/)
importAllVue.keys().map(key => {
  let path = key.slice(2, -10)
  ORouter.push({
    path: `/${path}`,
    component: resolve => {
      resolve(importAllVue(key).default)
    }
  })
})

const importAllConfig = require.context(
  process.env.srcDir,
  true,
  /config.json$/
)
importAllConfig.keys().map(key => {
  let config = importAllConfig(key)
  let path = `/${key.slice(2, -12)}`
  let router = ORouter.find(it => it.path === path)
  router.meta = importAllConfig(key)
  if (config.nav.glob) {
    routes.push(router)
  } else {
    routes[0].children.push(router)
  }
})
const router = new VueRouter({
  routes
})
const FUCLSIT = {
  beforeEach: [],
  beforeResolve: [],
  afterEach: []
}
for (let key in FUCLSIT) {
  router[key](async function (to, from, next) {
    const list = FUCLSIT[key]
    for (let i = 0; i < list.length; i++) {
      if (await list[i](to, from)) {
        return false
      }
    }
    next && next()
  })
  router[`add${key}`] = function (fuc) {
    FUCLSIT[key].push(fuc)
  }
}

export default router
