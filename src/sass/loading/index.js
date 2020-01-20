import { Loading } from 'element-ui'
import request from '_src/iass/request'

class LoadingService {
  constructor () {
    this.count = 0
    this.loadingInstance = null
  }
  open () {
    if (!this.loadingInstance) {
      this.loadingInstance = Loading.service(process.env.loading)
    }
    this.count++
  }
  close () {
    this.count--
    if (!this.count) {
      this.loadingInstance.close()
    }
  }
  closeAll () {
    this.count = 0
    this.loadingInstance.close()
  }
}

let loading = new LoadingService()

request.register(
  'request',
  (error, config) => {
    if (error) {
      loading.close()
      return false
    }
    loading.open()
    return config
  },
  'end'
)

request.register(
  'response',
  (error, res) => {
    loading.close()
  },
  'pre'
)
