import Vue from 'vue'
import App from './App.vue'

import userConfig from 'service/userConfig'

import i18n from 'service/iass/language'
import router from 'service/iass/router'
import store from 'service/iass/store'
import request from 'service/iass/request'
import Element from 'service/iass/element'

import 'service/sass/permission'
import 'service/sass/loading'
import 'service/sass/theme'
import 'service/sass/layout'
import 'service/sass/resize'
import 'service/sass/svg'
import 'service/sass/components'
import nav from 'service/sass/nav'

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