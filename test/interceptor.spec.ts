import { describe, expect, it } from 'vitest'
import { createInstance } from '../src/core/createInstance'

describe('step7 interceptors', () => {
  it('runs request interceptors before dispatch and response interceptors after dispatch', async () => {
    const axios = createInstance()
    const trace: string[] = []

    axios.interceptors.request.use(config => {
      trace.push('request-1')
      return {
        ...config,
        headers: {
          ...config.headers,
          'X-Trace': 'from-request-interceptor'
        }
      }
    })

    axios.interceptors.response.use(response => {
      trace.push('response-1')
      return {
        ...response,
        data: `${response.data as string}-handled`
      }
    })

    const response = await axios.get<string>('/interceptor', {
      adapter: async config => {
        trace.push('adapter')
        return {
          data: config.headers?.['X-Trace'] ?? 'missing',
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        }
      }
    })

    expect(trace).toEqual(['request-1', 'adapter', 'response-1'])
    expect(response.data).toBe('from-request-interceptor-handled')
  })

  it('supports ejecting an interceptor', async () => {
    const axios = createInstance()
    const id = axios.interceptors.request.use(config => ({
      ...config,
      headers: {
        ...config.headers,
        'X-Removed': 'no'
      }
    }))

    axios.interceptors.request.eject(id)

    const response = await axios.get('/eject', {
      adapter: async config => ({
        data: config.headers?.['X-Removed'] ?? 'removed',
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.data).toBe('removed')
  })
})
