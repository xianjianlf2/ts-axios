import { isPlantObject } from './util'

export function transformRequest(data: any): any {
  if (isPlantObject(data)) return JSON.stringify(data)
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // do nothing
    }
  }
  return data
}
