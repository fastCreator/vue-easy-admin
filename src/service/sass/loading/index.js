import LoadingService from './LoadingService'
export default {
  before () {},
  init ({ request }) {
    const { timeout = 10000 } = this.config
    this.loading = new LoadingService(timeout)
    this._initRegisterRequest(request)
  },
  open () {
    this.loading.open()
  },
  close () {
    this.loading.close()
  },
  after () {
    this.loading.close()
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
