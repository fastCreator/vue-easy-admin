import Vue from 'vue'
import App from './App.vue'

import userConfig from '_src/utils/userConfig'

import i18n from '_src/iass/language'
import router from '_src/iass/router'
import store from '_src/iass/store'
import request from '_src/iass/request'
import Element from '_src/iass/element'

import '_src/sass/permission'
import '_src/sass/loading'
import '_src/sass/theme'
import nav from '_src/sass/nav'

Vue.config.productionTip = process.env.NODE_ENV === 'development'

;(async () => {
  await userConfig.init({ Vue, router, store, Element, nav, request }) // 用户初始化操作
  new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})()
