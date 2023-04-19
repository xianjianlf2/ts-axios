import { describe, expect, it } from 'vitest'
import axios from '../src'

describe('step3 config preprocessing', () => {
  it('appends params to the request url', async () => {
    const response = await axios.get('/users', {
      params: {
        page: 1,
        roles: ['admin', 'editor'],
        ignored: null
      },
      adapter: async config => ({
        data: config.url,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.config.url).toBe('/users?page=1&roles%5B%5D=admin&roles%5B%5D=editor')
  })

  it('normalizes duplicated header names', async () => {
    const response = await axios.get('/headers', {
      headers: {
        accept: 'application/json',
        Accept: 'text/plain'
      },
      adapter: async config => ({
        data: config.headers,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.config.headers).toEqual({
      Accept: 'text/plain'
    })
  })
})
