export function transform(data: any, headers: any, fns?: any): any {
  if (!fns) {
    return data
  }
  // 如果fns不是数组，就转换成数组
  if (!Array.isArray(fns)) {
    fns = [fns]
  }
  fns.forEach((fn: any) => {
    data = fn(data, headers)
  })
  return data
}
