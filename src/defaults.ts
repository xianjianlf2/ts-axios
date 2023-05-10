import fetchAdapter from './adapters/fetchAdapter'
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  adapter: fetchAdapter,
  headers: {},
  validateStatus: status => status >= 200 && status < 300
}

export default defaults
