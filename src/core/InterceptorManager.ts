type FulfilledFn<V> = (value: V) => V | Promise<V>
type RejectedFn = (error: unknown) => unknown

interface InterceptorHandler<V> {
  fulfilled?: FulfilledFn<V>
  rejected?: RejectedFn
}

export default class InterceptorManager<V> {
  private handlers: Array<InterceptorHandler<V> | null> = []

  use(fulfilled?: FulfilledFn<V>, rejected?: RejectedFn): number {
    this.handlers.push({
      fulfilled,
      rejected
    })

    return this.handlers.length - 1
  }

  eject(id: number): void {
    if (this.handlers[id]) {
      this.handlers[id] = null
    }
  }

  forEach(fn: (handler: InterceptorHandler<V>) => void): void {
    this.handlers.forEach(handler => {
      if (handler) {
        fn(handler)
      }
    })
  }
}
