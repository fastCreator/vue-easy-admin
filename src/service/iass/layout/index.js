import layout from './layout.vue'

export default {
  init () {
    const data = { config: this.config}
    layout.data = function () {
      return data
    }
    this.Vue.component('sass-layout', layout)
  }
}
