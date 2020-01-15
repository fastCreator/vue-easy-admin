import Vue from 'vue'

import App from './App.vue'
import './permission'
import router from './router'
import store from './store'
import i18n from './i18n'
import nav from './nav'
import api from './api'
import './element'
;async () => {
  // 用户操作vue
  let userFn
  const importAllVue = require.context(process.env.srcDir, false, /main.js$/)
  importAllVue.keys().map(key => {
    userFn = importAllVue(key).default({ Vue, router, store, nav })
  })
  await userFn()
  // 提示
  Vue.config.productionTip = process.env.NODE_ENV === 'development'
  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
