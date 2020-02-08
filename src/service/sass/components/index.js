export default {
  init () {
    const importAllVue = require.context(
      process.env.componentsDir,
      true,
      /index.vue$/
    )
    importAllVue.keys().map(key => {
      this.Vue.component(key.slice(2, -10), importAllVue(key).default)
    })
  }
}
