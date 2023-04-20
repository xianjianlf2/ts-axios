import fetchAdapter from '../adapters/fetchAdapter'
import { normalizeHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/buildURL'
import { AxiosError } from './AxiosError'
import { settle } from './settle'
import { AxiosPromise, AxiosRequestConfig } from '../types'

export function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  if (!config.url) {
    throw new Error('url is required')
  }

  config.method = config.method ?? 'GET'
  config.headers = normalizeHeaders(config.headers)
  config.url = buildURL(config.url, config.params)
  const adapter = config.adapter ?? fetchAdapter

  return adapter(config)
    .then(response => settle(response))
    .catch(error => {
      throw AxiosError.from(error, config, 'ERR_NETWORK')
    })
}
