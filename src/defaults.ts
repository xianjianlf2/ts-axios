import fetchAdapter from './adapters/fetchAdapter'
import { AxiosRequestConfig } from './types'

const defaults: AxiosRequestConfig = {
  adapter: fetchAdapter,
  headers: {},
  validateStatus: status => status >= 200 && status < 300,
  transformRequest: (data, headers) => {
    if (isPlainObject(data)) {
      if (headers && !headers['Content-Type']) {
        headers['Content-Type'] = 'application/json;charset=utf-8'
      }

      return JSON.stringify(data)
    }

    return data
  },
  transformResponse: data => {
    if (typeof data !== 'string') {
      return data
    }

    try {
      return JSON.parse(data)
    } catch {
      return data
    }
  }
}

export default defaults

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]'
}
