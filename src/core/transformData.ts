import { AxiosTransformer } from '../types'

export function transformData(
  data: unknown,
  headers: Record<string, string> | undefined,
  fns?: AxiosTransformer | AxiosTransformer[]
): unknown {
  if (!fns) {
    return data
  }

  const transformers = Array.isArray(fns) ? fns : [fns]

  return transformers.reduce((currentData, transform) => transform(currentData, headers), data)
}
