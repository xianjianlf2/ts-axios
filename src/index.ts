import { createInstance } from './core/createInstance'
export { AxiosError, isAxiosError } from './core/AxiosError'

const axios = createInstance()

export const request = axios.request

export default axios
export * from './types'
