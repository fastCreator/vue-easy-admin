import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const { globData } = process.env.config

const store = new Vuex.Store({
  state: {
    globData
  },
  modules: {},
  mutations: {
    setGlobData (state, key, value) {
      if (value) {
        state.globData[key] = value
      } else {
        state.globData = key
      }
    }
  },
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
