import { describe, expect, it } from 'vitest'
import axios from '../src'

describe('step9 transform data', () => {
  it('stringifies plain object request data by default', async () => {
    const response = await axios.post('/articles', { title: 'hello' }, {
      adapter: async config => ({
        data: {
          body: config.data,
          headers: config.headers
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.data).toEqual({
      body: '{"title":"hello"}',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      }
    })
  })

  it('parses json response data by default', async () => {
    const response = await axios.get<{ ok: boolean }>('/json', {
      adapter: async config => ({
        data: '{"ok":true}',
        status: 200,
        statusText: 'OK',
        headers: {
          'Content-Type': 'application/json'
        },
        config
      })
    })

    expect(response.data.ok).toBe(true)
  })

  it('runs custom transform functions in order', async () => {
    const response = await axios.post<string>('/custom-transform', 'hello', {
      transformRequest: [
        data => `${data as string} world`,
        data => (data as string).toUpperCase()
      ],
      transformResponse: data => `${data as string}!`,
      adapter: async config => ({
        data: config.data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.data).toBe('HELLO WORLD!')
  })
})
