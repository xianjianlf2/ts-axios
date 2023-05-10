import { describe, expect, it } from 'vitest'
import axios from '../src'

describe('step8 defaults and create', () => {
  it('creates an instance with shared defaults', async () => {
    const api = axios.create({
      baseURL: 'https://api.example.com/v1',
      headers: {
        Accept: 'application/json'
      },
      adapter: async config => ({
        data: {
          url: config.url,
          headers: config.headers
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    const response = await api.get<{ url: string; headers: Record<string, string> }>('/users', {
      headers: {
        Authorization: 'Bearer token'
      }
    })

    expect(response.data.url).toBe('https://api.example.com/v1/users')
    expect(response.data.headers).toEqual({
      Accept: 'application/json',
      Authorization: 'Bearer token'
    })
  })

  it('keeps created instances independent', async () => {
    const first = axios.create({ baseURL: 'https://first.example.com' })
    const second = axios.create({ baseURL: 'https://second.example.com' })

    expect(first.defaults.baseURL).toBe('https://first.example.com')
    expect(second.defaults.baseURL).toBe('https://second.example.com')
  })
})
