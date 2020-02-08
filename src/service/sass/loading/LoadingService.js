import { Loading } from 'element-ui'

export default class {
  constructor (timeout) {
    this.timeout = timeout
    this.count = 0
    this.loadingInstance = null
    this.t = null
  }
  open () {
    if (!this.loadingInstance) {
      this.loadingInstance = Loading.service(process.env.loading)
    }
    this.count++
    this.endTime === Date.now()
    this.t && clearTimeout(this.t)
    this.t = setTimeout(this.closeAll.bind(this), this.timeout)
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