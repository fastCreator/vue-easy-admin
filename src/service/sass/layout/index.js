import layout from './layout.vue'

export default {
  init ({navs}) {
    const data = { config: this.config, getNavs: navs.getNav.bind(navs) }
    layout.data = function () {
      return data
    }
    this.Vue.component('sass-layout', layout)
  }
}
