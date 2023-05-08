import { vi } from 'vitest'
import axios from '../src'

vi.mock('/foo', () => {
  return {
    bar: 'baz'
  }
})

describe('Dummy test', () => {
  it('works if true is truthy', () => {
    axios('/foo').then(res => {
      expect(res).toEqual({
        bar: 'baz'
      })
    })
  })
})
