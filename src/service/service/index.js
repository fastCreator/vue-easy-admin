import _initRegister from './register'
import userConfig from '../userConfig'
import Vue from 'vue'
const sharePrototype = {
  _initRegister,
  userConfig,
  Vue
}
export default function (prototype, serviceType, serviceName) {
  const Service = function () {
    this.serviceType = serviceType
    this.serviceName = serviceName
    this.config = userConfig[serviceType][serviceName]
  }
  Service.prototype = Object.assign({}, prototype, sharePrototype)
  return new Service()

}