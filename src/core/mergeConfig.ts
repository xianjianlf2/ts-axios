import { AxiosRequestConfig } from '../types'

export function mergeConfig(defaultConfig: AxiosRequestConfig = {}, currentConfig: AxiosRequestConfig = {}): AxiosRequestConfig {
  const config: AxiosRequestConfig = {
    ...defaultConfig,
    ...currentConfig
  }

  config.headers = {
    ...defaultConfig.headers,
    ...currentConfig.headers
  }

  config.params = {
    ...defaultConfig.params,
    ...currentConfig.params
  }

  return config
}
