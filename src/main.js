import Vue from 'vue'
import App from './App.vue'
import { initUser, vueRoot, beforeService, initService, afterService} from '@service'

Vue.config.productionTip = process.env.NODE_ENV === 'development'
;(async () => {
  await beforeService() // 服务预加载
  await initService() // 初始化服务
  await initUser() // 用户初始化操作
  new Vue({
    ...vueRoot(),
    render: h => h(App),
    async mounted(){
      await afterService()
    }
  }).$mount('#app')
})()
