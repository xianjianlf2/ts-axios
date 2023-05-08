export type Method =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'HEAD'
  | 'OPTIONS'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  params?: Record<string, unknown>
  headers?: Record<string, string>
  data?: unknown
  adapter?: AxiosAdapter
  validateStatus?: (status: number) => boolean
}

export interface AxiosResponse<T = unknown> {
  data: T
  status: number
  statusText: string
  headers: Record<string, string>
  config: AxiosRequestConfig
  request?: unknown
}

export type AxiosPromise<T = unknown> = Promise<AxiosResponse<T>>

export type AxiosAdapter = (config: AxiosRequestConfig) => Promise<AxiosResponse>

export interface AxiosError<T = unknown> extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: unknown
  response?: AxiosResponse<T>
  isAxiosError: true
}

export interface AxiosInterceptorManager<V> {
  use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: unknown) => unknown): number
  eject(id: number): void
}

export interface AxiosInstance {
  <T = unknown>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url'>): AxiosPromise<T>
  request<T = unknown>(config: AxiosRequestConfig): AxiosPromise<T>
  request<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url'>): AxiosPromise<T>
  get<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T>
  delete<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T>
  head<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T>
  options<T = unknown>(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise<T>
  post<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise<T>
  put<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise<T>
  patch<T = unknown>(
    url: string,
    data?: unknown,
    config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>
  ): AxiosPromise<T>
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
}
