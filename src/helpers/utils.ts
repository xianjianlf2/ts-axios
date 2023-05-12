export function all<T>(values: Array<T | Promise<T>>): Promise<T[]> {
  return Promise.all(values)
}

export function spread<T extends unknown[], R>(callback: (...args: T) => R): (values: T) => R {
  return values => callback(...values)
}
