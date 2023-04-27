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
  request<T = unknown>(input: RequestInput, config?: Omit<AxiosRequestConfig, 'url'>): AxiosPromise<T> {
    return dispatchRequest<T>(resolveConfig(input, config))
  }

  get<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T> {
    return this.request(url, {
      ...config,
      method: 'GET'
    })
  }

  delete<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T> {
    return this.request(url, {
      ...config,
      method: 'DELETE'
    })
  }

  head<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T> {
    return this.request(url, {
      ...config,
      method: 'HEAD'
    })
  }

  options<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T> {
    return this.request(url, {
      ...config,
      method: 'OPTIONS'
    })
  }

  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise<T> {
    return this.request(url, {
      ...config,
      method: 'POST',
      data
    })
  }

  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise<T> {
    return this.request(url, {
      ...config,
      method: 'PUT',
      data
    })
  }

  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise<T> {
    return this.request(url, {
      ...config,
      method: 'PATCH',
      data
    })
  }
}
