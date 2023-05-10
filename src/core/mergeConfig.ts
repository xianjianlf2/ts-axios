import { deepMerge, isPlainObject } from '../helpers/utils'
import { AxiosRequestConfig } from '../types'

function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  const strates: Record<string, any> = {
    url: fromVal2Strate,
    params: fromVal2Strate,
    data: fromVal2Strate,
    headers: deepMergeStrate,
    validateStatus: defaultStrate
  }

  if (!config2) {
    config2 = Object.create(null)
  }

  return Object.keys({ ...config1, ...config2 }).reduce((mergedConfig, key) => {
    if (strates[key]) {
      mergedConfig[key] = strates[key](config1[key], config2![key])
    } else if (typeof config2![key] !== 'undefined') {
      mergedConfig[key] = config2![key]
    } else {
      mergedConfig[key] = config1[key]
    }
    return mergedConfig
  }, Object.create(null))
}

function defaultStrate(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strate(val1: any, val2: any): any {
  return typeof val2 !== 'undefined' ? val2 : undefined
}

function deepMergeStrate(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObject(val1)) {
    return deepMerge(val1)
  } else {
    return val1
  }
}

export default mergeConfig
