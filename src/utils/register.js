class Service {
  constructor (events) {
    this.FNLIST = {}
    events.forEach(e => {
      this.FNLIST[e] = {
        pre: [],
        normal: [],
        end: []
      }
    })
  }
  register (event, fn, enforce = 'normal') {
    let ets = this.FNLIST[event]
    if (ets) {
      ets[enforce].push(fn)
    } else {
      console.error(`无法注册服务:${event}`)
    }
  }
  run (event, next, ...args) {
    let FNLIST = this.FNLIST[event]
    let FNS = [...FNLIST.pre, ...FNLIST.normal, ...FNLIST.end]
    for (let i = 0; i < FNS.length; i++) {
      let ret = FNS[i](...args)
      if (ret && ret !== true && next) {
        return next(ret)
      }
    }
  }
  async runAsync (event, next, ...args) {
    let FNLIST = this.FNLIST[event]
    let FNS = [...FNLIST.pre, ...FNLIST.normal, ...FNLIST.end]
    for (let i = 0; i < FNS.length; i++) {
      let ret = await FNS[i](...args)
      if (ret && ret !== true && next) {
        return next(ret)
      }
    }
  }
}

export default (instance, events) => {
  let s = new Service(events)
  instance.register = s.register.bind(s)
  return s
}
