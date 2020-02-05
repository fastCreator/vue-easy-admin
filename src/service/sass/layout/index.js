import store from 'service/iass/store'
import userConfig from '_src/utils/userConfig'
import { setKeyValue } from '_src/utils/comom'
const {
  sass: { layout }
} = userConfig

setStore()

function setStore () {
  let mutations = {}
  for (let key in layout) {
    mutations[`setLayout${key}`] = setKeyValue(key)
  }
  store.registerModule('layout', {
    state: {
      ...layout
    },
    mutations: {
      ...mutations
    }
  })
}
