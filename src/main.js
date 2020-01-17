import Vue from 'vue'

import App from './App.vue'
import { registerRequestToken, registerRouterToken } from './permission'
import router from './router'
import store from './store'
import i18n from './i18n'
import nav from './nav'
import request from './request'
import './element'
Vue.config.productionTip = process.env.NODE_ENV === 'development'
;(async () => {
  const importAllVue = require.context(process.env.srcDir, false, /main.js$/)
  const {
    init,
    userManage,
    userManage: { getUserInfo, getPermission }
  } = importAllVue('./main.js')
  registerRouterToken(userManage) // toke in Router
  registerRequestToken(userManage) // toke in Request
  store.commit('setUserInfo', await getUserInfo(request)) // 设置用户信息
  store.commit('setPermission', await getPermission(request)) // 设置用户权限
  await init({ Vue, router, store, nav, request}) // 用户初始化操作
  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
