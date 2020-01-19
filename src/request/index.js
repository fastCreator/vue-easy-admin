import Vue from 'vue'
import axios from 'axios'
import register from 'utils/register'
const { baseURL, config } = process.env.config.request
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? baseURL.dev : baseURL.build,
  config
})

instance.net = function (path, { params, query, body }) {
  let paths = path.split(':')
  let method = paths[0]
  let url = paths[1].replace(/{([a-zA-Z]+)}/g, function (word) {
    return params[word.slice(1, -1)]
  })
  return instance({
    method,
    url,
    params: query,
    data: body
  })
}
setEvents()
export default instance

// 注册服务
function setEvents () {
  const EVENTS = ['request', 'response']
  const service = register(instance, EVENTS)
  EVENTS.forEach(e => {
    instance.interceptors[e].use(
      config => {
        service.run(e, undefined, null, config)
      },
      error => {
        service.run(e, undefined, error, null)
      }
    )
  })
}

Vue.mixin({
  methods: {
    $net (path, data) {
      let url = this.$route.meta.permission
      path.split('.').forEach(it => {
        url = url[it]
      })
      return instance.net(url, data)
    }
  }
})
