import _initRegister from './register'
import userConfig from '../userConfig'
import Vue from 'vue'
const sharePrototype = {
  _initRegister,
  userConfig,
  Vue
}
export default function (prototype, serviceType, serviceName, service) {
  const Service = function () {
    this.serviceType = serviceType
    this.serviceName = serviceName
    this.config = userConfig[serviceType][serviceName]
    this.init(service)
  }
  Service.prototype = Object.assign({}, prototype, sharePrototype)
  return new Service()

}