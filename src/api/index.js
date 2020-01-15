import axios from 'axios'
import permission from 'permission'

const { baseURL, config } = process.env.config.api
const instance = axios.create({
  baseURL,
  config,
  headers: { token: permission.token }
})

export default instance
