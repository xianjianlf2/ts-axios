import Axios from './Axios'
import { AxiosInstance } from '../types'

export function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = context.request.bind(context) as AxiosInstance

  instance.request = context.request.bind(context) as AxiosInstance['request']
  instance.get = context.get.bind(context)
  instance.delete = context.delete.bind(context)
  instance.head = context.head.bind(context)
  instance.options = context.options.bind(context)
  instance.post = context.post.bind(context)
  instance.put = context.put.bind(context)
  instance.patch = context.patch.bind(context)
  instance.interceptors = context.interceptors

  return instance
}
