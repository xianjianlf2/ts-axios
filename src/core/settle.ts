import { AxiosPromise, AxiosResponse } from '../types'

export function settle(response: AxiosResponse): AxiosPromise {
  const validateStatus = response.config.validateStatus ?? defaultValidateStatus

  if (validateStatus(response.status)) {
    return Promise.resolve(response)
  }

  return Promise.reject(new Error(`Request failed with status code ${response.status}`))
}

function defaultValidateStatus(status: number): boolean {
  return status >= 200 && status < 300
}
