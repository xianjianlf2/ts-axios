import { describe, expect, it } from 'vitest'
import axios from '../src'

interface UserProfile {
  name: string
  role: string
}

describe('step6 generics', () => {
  it('lets the caller describe response data shape', async () => {
    const response = await axios.get<UserProfile>('/me', {
      adapter: async config => ({
        data: {
          name: 'Ada',
          role: 'admin'
        },
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      })
    })

    expect(response.data.name).toBe('Ada')
    expect(response.data.role).toBe('admin')
  })
})
