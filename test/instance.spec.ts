import { describe, expect, it } from 'vitest'
import axios from '../src'

describe('step2 instance', () => {
  it('supports calling the instance directly', async () => {
    const response = await axios('/users', {
      adapter: async config => ({
        data: config.method ?? 'GET',
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.data).toBe('GET')
    expect(response.config.url).toBe('/users')
  })

  it('supports shortcut methods like post', async () => {
    const response = await axios.post(
      '/articles',
      { title: 'mini axios' },
      {
        adapter: async config => ({
          data: config.data,
          status: 200,
          statusText: 'OK',
          headers: {},
          config
        })
      }
    )

    expect(response.config.method).toBe('POST')
    expect(response.data).toEqual({ title: 'mini axios' })
  })
})
