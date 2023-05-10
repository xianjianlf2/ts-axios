import Axios from './Axios'
import defaults from '../defaults'
import { mergeConfig } from './mergeConfig'
import { AxiosInstance, AxiosRequestConfig } from '../types'

export function createInstance(defaultConfig: AxiosRequestConfig = defaults): AxiosInstance {
  const context = new Axios(defaultConfig)
  const instance = context.request.bind(context) as AxiosInstance

  instance.request = context.request.bind(context) as AxiosInstance['request']
  instance.get = context.get.bind(context)
  instance.delete = context.delete.bind(context)
  instance.head = context.head.bind(context)
  instance.options = context.options.bind(context)
  instance.post = context.post.bind(context)
  instance.put = context.put.bind(context)
  instance.patch = context.patch.bind(context)
  instance.defaults = context.defaults
  instance.create = config => createInstance(mergeConfig(instance.defaults, config))
  instance.interceptors = context.interceptors

  return instance
}
