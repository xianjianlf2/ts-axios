import { createInstance } from './core/createInstance'
export { AxiosError, isAxiosError } from './core/AxiosError'
export { isCancel } from './helpers/cancel'
export { all, spread } from './helpers/utils'

const axios = createInstance()

export const request = axios.request

export default axios
export * from './types'
