import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import nav from './nav'
import './element'

// 用户操作vue
const importAllVue = require.context(process.env.srcDir, false, /main.js$/)
importAllVue.keys().map(key => {
  importAllVue(key).default({ Vue, router, store, nav })
})
// 提示
Vue.config.productionTip = process.env.NODE_ENV === 'development'
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
