import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

// 用户操作vue
const importAllVue = require.context(process.env.srcDir, false, /main.js$/)
importAllVue.keys().map(key => {
  importAllVue(key).default(Vue, router, store)
})
// 提示
Vue.config.productionTip = process.env.NODE_ENV === 'development'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
