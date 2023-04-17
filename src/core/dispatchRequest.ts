import fetchAdapter from '../adapters/fetchAdapter'
import { AxiosPromise, AxiosRequestConfig } from '../types'

export function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  if (!config.url) {
    throw new Error('url is required')
  }

  config.method = config.method ?? 'GET'
  const adapter = config.adapter ?? fetchAdapter
  return adapter(config)
}
