import { createInstance } from './core/createInstance'

const axios = createInstance()

export const request = axios.request

export default axios
export * from './types'
