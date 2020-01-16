import axios from 'axios'

const {
  baseURL,
  config
} = process.env.config.request
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? baseURL.dev : baseURL.build,
  config
})

export default instance
