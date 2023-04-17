export interface AxiosRequestConfig {
  url: string
  method?: string
  headers?: Record<string, string>
  data?: unknown
  adapter?: AxiosAdapter
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
