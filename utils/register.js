export default (instance, events) => {
  const service = {
    FNLIST: {}
  }
  events.forEach(e => {
    service.FNLIST[e] = {
      pre: [],
      normal: [],
      end: []
    }
  })
  service.register((event, fn, enforce = 'normal') => {
    let ets = service.FNLIST[event]
    if (ets) {
      ets[enforce].push(fn)
    } else {
      console.error(`无法注册服务:${event}`)
    }
  })
  service.run = function (event, next, ...args) {
    let FNLIST = service.FNLIST[event]
    let FNS = [...FNLIST.pre, ...FNLIST.normal, ...FNLIST.end]
    for (let i = 0; i < FNS.length; i++) {
      let ret = FNS[i](...args)
      if (ret) {
        ret !== true && next && next(ret)
        return true
      }
    }
  }
  service.runAsync =async function (event, next, ...args) {
    let FNLIST = service.FNLIST[event]
    let FNS = [...FNLIST.pre, ...FNLIST.normal, ...FNLIST.end]
    for (let i = 0; i < FNS.length; i++) {
      let ret =await FNS[i](...args)
      if (ret) {
        ret !== true && next && next(ret)
        return true
      }
    }
  }
  instance.register = service.register
  return service
}
