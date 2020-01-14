import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const { setting, globData } = process.env.config

const store = new Vuex.Store({
  state: {
    userInfo: {},
    token: '',
    setting: setting,
    globData: globData
  },
  modules: {},
  strict: debug,
  plugins: []
})
router.addbeforeResolve((to, from) => {
  store.registerModule(to.path, {
    state: to.meta.store
  })
  if (store.state[from.path]) {
    store.unregisterModule(from.path)
  }
})
export default store
