import Axios from './core/axios'
import defaults from './defaults'
import { extend } from './helpers/utils'
import { AxiosInstance, AxiosRequestConfig } from './types'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)

  // 创建instance 指向 Axios.prototype.request 方法，并绑定了上下文 context
  const instance = Axios.prototype.request.bind(context)

  // 通过 extend 方法把 context 中的原型方法和实例方法全部拷贝到 instance 上
  extend(instance, context)

  return instance as AxiosInstance
}

const axios = createInstance(defaults)

export default axios
