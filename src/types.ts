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

export interface AxiosResponse {
  data: unknown
  status: number
  statusText: string
  headers: Record<string, string>
  config: AxiosRequestConfig
  request?: unknown
}

export type AxiosPromise = Promise<AxiosResponse>

export type AxiosAdapter = (config: AxiosRequestConfig) => AxiosPromise

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: unknown
  response?: AxiosResponse
  isAxiosError: true
}

export interface AxiosInstance {
  (config: AxiosRequestConfig): AxiosPromise
  (url: string, config?: Omit<AxiosRequestConfig, 'url'>): AxiosPromise
  request(config: AxiosRequestConfig): AxiosPromise
  request(url: string, config?: Omit<AxiosRequestConfig, 'url'>): AxiosPromise
  get(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise
  delete(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise
  head(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise
  options(url: string, config?: Omit<AxiosRequestConfig, 'url' | 'method'>): AxiosPromise
  post(url: string, data?: unknown, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>): AxiosPromise
  put(url: string, data?: unknown, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>): AxiosPromise
  patch(url: string, data?: unknown, config?: Omit<AxiosRequestConfig, 'url' | 'method' | 'data'>): AxiosPromise
}
