import { dispatchRequest } from './dispatchRequest'
import { AxiosPromise, AxiosRequestConfig } from '../types'

type RequestInput = string | AxiosRequestConfig

function resolveConfig(input: RequestInput, config?: Omit<AxiosRequestConfig, 'url'>): AxiosRequestConfig {
  if (typeof input === 'string') {
    return {
      ...config,
      url: input
    }
  }

  return input
}

export default class Axios {
  request(input: RequestInput, config?: Omit<AxiosRequestConfig, 'url'>): AxiosPromise {
    return dispatchRequest(resolveConfig(input, config))
  }

  get(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise {
    return this.request(url, {
      ...config,
      method: 'GET'
    })
  }

  delete(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise {
    return this.request(url, {
      ...config,
      method: 'DELETE'
    })
  }

  head(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise {
    return this.request(url, {
      ...config,
      method: 'HEAD'
    })
  }

  options(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise {
    return this.request(url, {
      ...config,
      method: 'OPTIONS'
    })
  }

  post(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise {
    return this.request(url, {
      ...config,
      method: 'POST',
      data
    })
  }

  put(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise {
    return this.request(url, {
      ...config,
      method: 'PUT',
      data
    })
  }

  patch(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise {
    return this.request(url, {
      ...config,
      method: 'PATCH',
      data
    })
  }
}
