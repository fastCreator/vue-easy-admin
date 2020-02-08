import LoadingService from './LoadingService'

export default {
  init ({ request }) {
    const { timeout } = this.config
    this.loading = new LoadingService(timeout)
    this._initRegisterRequest(request)
  },
  _initRegisterRequest (request) {
    request.register(
      'request',
      (error, config) => {
        if (error) {
          this.loading.close()
          return false
        }
        this.loading.open()
        return config
      },
      'end'
    )
    request.register(
      'response',
      (error, res) => {
        this.loading.close()
      },
      'pre'
    )
  }
}

