let router = []
const importAllVue = require.context(process.env.src_dir, true, /index.vue$/)
importAllVue.keys().map(key => {
  router.push({
    path: `/${key.slice(2, -10)}`,
    component: importAllVue(key).default
  })
})

const importAllConfig = require.context(process.env.src_dir, true, /config.json$/)
importAllConfig.keys().map(key => {
  let path = `/${key.slice(2, -12)}`
  router.find(it => it.path === path).meta = importAllConfig(key)
})

export default router
