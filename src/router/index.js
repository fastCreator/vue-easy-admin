import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../components/layout'
Vue.use(VueRouter)
let routes = [
  {
    path: '/',
    component: Layout,
    children: []
  },
  { path: '*', redirect: 'full/404' }
]
loadRoutes()
const router = new VueRouter({
  routes
})
setEvents()
export default router

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
function setEvents () {
  const FUCLSIT = {
    beforeEach: [],
    beforeResolve: [],
    afterEach: []
  }
  for (let key in FUCLSIT) {
    router[key](async function (to, from, next) {
      const list = FUCLSIT[key]
      for (let i = 0; i < list.length; i++) {
        let path = await list[i](to, from)
        if (path) {
          path !== true && next(path)
          return false
        }
      }
      next && next()
    })
    router[`add${key}`] = function (fuc) {
      FUCLSIT[key].push(fuc)
    }
  }
}
