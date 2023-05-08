import InterceptorManager from './InterceptorManager'
import { dispatchRequest } from './dispatchRequest'
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'

type RequestInput = string | AxiosRequestConfig
type ChainHandler<T> = ((value: T) => T | Promise<T>) | ((error: unknown) => unknown) | undefined

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
  interceptors = {
    request: new InterceptorManager<AxiosRequestConfig>(),
    response: new InterceptorManager<AxiosResponse>()
  }

  request<T = unknown>(input: RequestInput, config?: Omit<AxiosRequestConfig, 'url'>): AxiosPromise<T> {
    const requestConfig = resolveConfig(input, config)
    const chain: Array<[ChainHandler<AxiosRequestConfig | AxiosResponse<T>>, ChainHandler<AxiosRequestConfig | AxiosResponse<T>>]> = [
      [dispatchRequest<T> as ChainHandler<AxiosRequestConfig | AxiosResponse<T>>, undefined]
    ]

    this.interceptors.request.forEach(interceptor => {
      chain.unshift([
        interceptor.fulfilled as ChainHandler<AxiosRequestConfig | AxiosResponse<T>>,
        interceptor.rejected as ChainHandler<AxiosRequestConfig | AxiosResponse<T>>
      ])
    })

    this.interceptors.response.forEach(interceptor => {
      chain.push([
        interceptor.fulfilled as ChainHandler<AxiosRequestConfig | AxiosResponse<T>>,
        interceptor.rejected as ChainHandler<AxiosRequestConfig | AxiosResponse<T>>
      ])
    })

    let promise = Promise.resolve(requestConfig) as Promise<AxiosRequestConfig | AxiosResponse<T>>

    while (chain.length) {
      const [fulfilled, rejected] = chain.shift()!
      promise = promise.then(fulfilled as never, rejected as never)
    }

    return promise as AxiosPromise<T>
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
