import { AxiosPromise, AxiosResponse } from '../types'
import { AxiosError } from './AxiosError'

export function settle<T = unknown>(response: AxiosResponse<T>): AxiosPromise<T> {
  const validateStatus = response.config.validateStatus ?? defaultValidateStatus

  if (validateStatus(response.status)) {
    return Promise.resolve(response)
  }

  return Promise.reject(
    new AxiosError(
      `Request failed with status code ${response.status}`,
      response.config,
      'ERR_BAD_RESPONSE',
      response.request,
      response
    )
  )
}

function defaultValidateStatus(status: number): boolean {
  return status >= 200 && status < 300
}
