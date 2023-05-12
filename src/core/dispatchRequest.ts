import fetchAdapter from '../adapters/fetchAdapter'
import { normalizeHeaders } from '../helpers/headers'
import { buildFullURL, buildURL } from '../helpers/buildURL'
import { createCanceledError, throwIfCancellationRequested } from '../helpers/cancel'
import { AxiosError } from './AxiosError'
import { settle } from './settle'
import { transformData } from './transformData'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

export function dispatchRequest<T = unknown>(config: AxiosRequestConfig): AxiosPromise<T> {
  if (!config.url) {
    throw new Error('url is required')
  }

  config.method = config.method ?? 'GET'
  config.headers = normalizeHeaders(config.headers)
  config.url = buildFullURL(config.baseURL, config.url)
  config.url = buildURL(config.url, config.params)
  config.data = transformData(config.data, config.headers, config.transformRequest)
  throwIfCancellationRequested(config)
  const adapter = config.adapter ?? fetchAdapter

  return adapter(config)
    .then(response => {
      throwIfCancellationRequested(config)
      response.data = transformData(response.data, response.headers, config.transformResponse)
      return settle<T>(response as AxiosResponse<T>)
    })
    .catch(error => {
      if (config.signal?.aborted) {
        throw createCanceledError(config)
      }

      throw AxiosError.from(error, config, 'ERR_NETWORK')
    })
}
