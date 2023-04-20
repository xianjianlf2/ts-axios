import { AxiosError as AxiosErrorShape, AxiosRequestConfig, AxiosResponse } from '../types'

export class AxiosError extends Error implements AxiosErrorShape {
  code?: string
  config: AxiosRequestConfig
  request?: unknown
  response?: AxiosResponse
  isAxiosError = true as const

  constructor(
    message: string,
    config: AxiosRequestConfig,
    code?: string,
    request?: unknown,
    response?: AxiosResponse
  ) {
    super(message)
    this.name = 'AxiosError'
    this.config = config
    this.code = code
    this.request = request
    this.response = response
  }

  static from(
    error: unknown,
    config: AxiosRequestConfig,
    code?: string,
    request?: unknown,
    response?: AxiosResponse
  ): AxiosError {
    if (error instanceof AxiosError) {
      return error
    }

    const message = error instanceof Error ? error.message : 'Unknown axios error'
    return new AxiosError(message, config, code, request, response)
  }
}

export function isAxiosError(error: unknown): error is AxiosError {
  return error instanceof AxiosError || Boolean((error as AxiosErrorShape | undefined)?.isAxiosError)
}
