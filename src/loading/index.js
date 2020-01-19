import { Loading } from 'element-ui'
import request from '../request'
let loadingInstance
request.register(
  'request',
  (error, config) => {
    if (error) {
      loadingInstance.close()
    }
    loadingInstance = Loading.service(process.env.loading)
    return config
  },
  'pre'
)

request.register('response', (error, config) => {
  loadingInstance.close()
})
