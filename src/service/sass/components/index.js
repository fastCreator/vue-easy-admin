export default {
  init () {
    console.log(process.env.componentsDir)
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
