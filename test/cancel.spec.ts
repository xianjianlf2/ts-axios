import { describe, expect, it } from 'vitest'
import axios, { all, isCancel, spread } from '../src'

describe('step10 cancel and helpers', () => {
  it('rejects before dispatch when signal is already aborted', async () => {
    const controller = new AbortController()
    controller.abort()
    let called = false

    try {
      await axios.get('/already-canceled', {
        signal: controller.signal,
        adapter: async config => {
          called = true
          return {
            data: 'should not run',
            status: 200,
            statusText: 'OK',
            headers: {},
            config
          }
        }
      })
    } catch (error) {
      expect(isCancel(error)).toBe(true)
      expect(called).toBe(false)
      return
    }

    throw new Error('Expected request to be canceled')
  })

  it('rejects when signal is aborted while adapter is running', async () => {
    const controller = new AbortController()

    await expect(
      axios.get('/cancel-during-request', {
        signal: controller.signal,
        adapter: async config => {
          controller.abort()
          return {
            data: 'too late',
            status: 200,
            statusText: 'OK',
            headers: {},
            config
          }
        }
      })
    ).rejects.toMatchObject({
      code: 'ERR_CANCELED'
    })
  })

  it('provides small promise helpers', async () => {
    const values = (await all([Promise.resolve('Ada'), Promise.resolve('Lovelace')])) as [string, string]
    const fullName = spread((first: string, last: string) => `${first} ${last}`)(values)

    expect(fullName).toBe('Ada Lovelace')
  })
})
