import Vue from 'vue'
import App from './App.vue'
import { initUser, vueRoot, initService } from '@service'

Vue.config.productionTip = process.env.NODE_ENV === 'development'
;(async () => {
  await initService() // 用户初始化操作
  await initUser() // 用户初始化操作
  new Vue({
    ...vueRoot(),
    render: h => h(App)
  }).$mount('#app')
})()
