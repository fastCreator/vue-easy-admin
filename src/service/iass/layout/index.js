import layout from './layout.vue'
import iframe from './iframe.vue'

export default {
  init ({ store }) {
    this.Vue.component('sass-layout', layout)
    this.Vue.component('sass-iframe', iframe)
    this._initRegisterStore(store)
  },
  _initRegisterStore (store) {
    store.registerState('layout', {
      ...this.config
    })
  }
}
