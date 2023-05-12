import { AxiosError } from '../core/AxiosError'
import { AxiosRequestConfig } from '../types'

export function createCanceledError(config: AxiosRequestConfig): AxiosError {
  return new AxiosError('Request canceled', config, 'ERR_CANCELED')
}

export function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.signal?.aborted) {
    throw createCanceledError(config)
  }
}

export function isCancel(error: unknown): boolean {
  return error instanceof AxiosError && error.code === 'ERR_CANCELED'
}
