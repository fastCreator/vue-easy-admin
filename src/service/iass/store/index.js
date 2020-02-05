import Vue from 'vue'
import Vuex from 'vuex'
import router from 'service/iass/router'

import { setKeyValue } from '_src/utils/comom'
import userConfig from '_src/utils/userConfig'
Vue.use(Vuex)
const {
  iass: {
    store: { globData }
  }
} = userConfig

const store = new Vuex.Store({
  state: {
    globData
  },
  modules: {},
  mutations: {
    setGlobData: setKeyValue('globData')
  },
  strict: process.env.NODE_ENV !== 'production',
  plugins: []
})

router.register('beforeResolve', (to, from) => {
  store.registerModule(to.path, {
    state: to.meta.store
  })
  if (store.state[from.path]) {
    store.unregisterModule(from.path)
  }
})

export default store
