import Element from 'element-ui'

export default {
  init () {
    if (localStorage.ElementSize) {
      this.config.size = localStorage.ElementSize
    }
    this.Vue.use(Element)
    this.setOptions()
  },
  setOptions (options) {
    this.config = { ...this.config, ...options }
    localStorage.ElementSize = this.config.size
    this.Vue.prototype.$ELEMENT = this.config
  }
}
