import fetchAdapter from '../adapters/fetchAdapter'
import { normalizeHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/buildURL'
import { AxiosError } from './AxiosError'
import { settle } from './settle'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export function dispatchRequest<T = unknown>(config: AxiosRequestConfig): AxiosPromise<T> {
  if (!config.url) {
    throw new Error('url is required')
  }

  config.method = config.method ?? 'GET'
  config.headers = normalizeHeaders(config.headers)
  config.url = buildURL(config.url, config.params)
  const adapter = config.adapter ?? fetchAdapter

  return adapter(config)
    .then(response => settle<T>(response as AxiosResponse<T>))
    .catch(error => {
      throw AxiosError.from(error, config, 'ERR_NETWORK')
    })
}
