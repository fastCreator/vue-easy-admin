import Vuex from 'vuex'

export default {
  init () {
    this.Vue.use(Vuex)
    this.store = new Vuex.Store({ ...this.config, strict: process.env.NODE_ENV !== 'production' })
    this.vueRoot = { store: this.store }
  },
  registerState (moduleName, state) {
    this.store.registerModule(moduleName, {
      state: state,
      mutations: this._setMutations(moduleName, state)
    })
  },
  _setMutations (moduleName, state) {
    const mutations = {}
    Object.keys(state).forEach(key => {
      mutations[`set${this._preToUpperCase([moduleName, key])}`] = this._setKeyValue(key)
    })
    return mutations
  },
  _setKeyValue (type) {
    return function (obj, value) {
      if (value && value.path && value.value && Object.keys(value).length === 2) {
        const path = value.path.split('.')
        let o = obj[type]
        const len = path.length - 1
        for (let i = 0; i < len; i++) {
          o = o[path[i]]
        }
        o[path[len]] = value.value
      } else {
        obj[type] = value
      }
    }
  },
  _preToUpperCase (arr) {
    return arr.reduce((a, b) => a + b.charAt(0).toUpperCase() + b.slice(1), '')
  }
}