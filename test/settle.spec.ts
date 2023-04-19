import { describe, expect, it } from 'vitest'
import axios from '../src'

describe('step4 settle response', () => {
  it('rejects when status is outside the success range', async () => {
    await expect(
      axios.get('/missing', {
        adapter: async config => ({
          data: 'not found',
          status: 404,
          statusText: 'Not Found',
          headers: {},
          config
        })
      })
    ).rejects.toThrow('Request failed with status code 404')
  })

  it('allows custom validateStatus logic', async () => {
    const response = await axios.get('/missing', {
      validateStatus: status => status === 404,
      adapter: async config => ({
        data: 'still usable',
        status: 404,
        statusText: 'Not Found',
        headers: {},
        config
      })
    })

    expect(response.data).toBe('still usable')
  })
})
