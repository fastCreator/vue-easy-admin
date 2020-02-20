export default {
  init ({ store }) {
    this._setVueComponents()
    this._initRegisterStore(store)
  },
  _initRegisterStore (store) {
    store.registerState('layout', {
      ...this.config
    })
  },
  _setVueComponents () {
    const importAll = require.context('./components', true, /index\.js$/)
    console.log(importAll.keys())
    importAll.keys().forEach(key => {
      console.log(importAll(key).default)
      this.Vue.use(importAll(key).default)
    })
  }
}
