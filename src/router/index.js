import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

let routes = []
const importAllVue = require.context(process.env.srcDir, true, /index.vue$/)
importAllVue.keys().map(key => {
  let path = key.slice(2, -10)
  routes.push({
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
  let path = `/${key.slice(2, -12)}`
  routes.find(it => it.path === path).meta = importAllConfig(key)
})
console.log(routes)

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
