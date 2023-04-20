import { describe, expect, it } from 'vitest'
import axios, { AxiosError, isAxiosError } from '../src'

describe('step5 axios error', () => {
  it('rejects with an AxiosError when status validation fails', async () => {
    try {
      await axios.get('/boom', {
        adapter: async config => ({
          data: 'server error',
          status: 500,
          statusText: 'Server Error',
          headers: {},
          config
        })
      })
    } catch (error) {
      expect(error).toBeInstanceOf(AxiosError)
      expect(isAxiosError(error)).toBe(true)
      expect((error as AxiosError).code).toBe('ERR_BAD_RESPONSE')
      expect((error as AxiosError).response?.status).toBe(500)
      return
    }

    throw new Error('Expected request to reject')
  })

  it('wraps adapter failures with request config', async () => {
    try {
      await axios.get('/network', {
        adapter: async () => {
          throw new Error('network down')
        }
      })
    } catch (error) {
      expect(isAxiosError(error)).toBe(true)
      expect((error as AxiosError).message).toBe('network down')
      expect((error as AxiosError).config.url).toBe('/network')
      expect((error as AxiosError).code).toBe('ERR_NETWORK')
      return
    }

    throw new Error('Expected adapter failure to reject')
  })
})
