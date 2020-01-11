let router = []
// const importAllVue = require.context(process.env.srcDir, true, /index.vue$/)
// importAllVue.keys().map(key => {
//   let path = key.slice(2, -10)
//   router.push({
//     path: `/${path}`,
//     component: resolve => {
//       resolve(importAllVue(key).default)
//     }
//   })
// })

// const importAllConfig = require.context(
//   process.env.srcDir,
//   true,
//   /config.json$/
// )
// importAllConfig.keys().map(key => {
//   let path = `/${key.slice(2, -12)}`
//   router.find(it => it.path === path).meta = importAllConfig(key)
// })

export default router
