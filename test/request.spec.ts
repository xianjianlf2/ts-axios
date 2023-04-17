import { describe, expect, it } from 'vitest'
import { request } from '../src'

describe('step1 request', () => {
  it('passes config to adapter and returns a response', async () => {
    const response = await request({
      url: '/users',
      method: 'GET',
      adapter: async config => ({
        data: `request to ${config.url}`,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.data).toBe('request to /users')
    expect(response.status).toBe(200)
  })
})
