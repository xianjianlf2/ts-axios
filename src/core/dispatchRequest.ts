import { AxiosError, createCancelError, createError } from '../helpers/error'
import { flattenHeaders } from '../helpers/headers'
import { buildURL } from '../helpers/url'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import { transform } from './transform'
import xhr from './xhr'

function throwIfCancellationRequested(config: AxiosRequestConfig) {
  if (config.signal && config.signal.aborted) {
    throw createError(
      config.signal.reason || 'Request aborted',
      config,
      'ECONNABORTED',
      config.request
    )
  }
}

export default function dispatchRequest(config: AxiosRequestConfig): AxiosPromise {
  throwIfCancellationRequested(config)
  processConfig(config)
  return xhr(config).then(res => {
    throwIfCancellationRequested(config)
    return transformResponseData(res)
  })
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transform(config.data, config.headers, config.transformRequest)
  config.headers = flattenHeaders(config.headers, config.method!)
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildURL(url!, params)
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}
