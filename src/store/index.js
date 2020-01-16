import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const { globData } = process.env.config

const store = new Vuex.Store({
  state: {
    globData,
    token: null,
    userInfo: null,
    permission: null,
  },
  modules: {},
  mutations: {
    setGlobData: setKeyValue('globData'),
    setToken: setKeyValue('token'),
    setUserInfo: setKeyValue('userInfo'),
    setPermission: setKeyValue('permission'),
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

function setKeyValue (type) {
  return function (state, key, value) {
    if (value) {
      state[type][key] = value
    } else {
      state[type] = key
    }
  }
}
