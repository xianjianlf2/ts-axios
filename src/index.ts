import { dispatchRequest } from './core/dispatchRequest'
import { AxiosRequestConfig, AxiosResponse } from './types'

export function request(config: AxiosRequestConfig): Promise<AxiosResponse> {
  return dispatchRequest(config)
}

export * from './types'
