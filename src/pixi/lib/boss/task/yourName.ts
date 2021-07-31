import { Task } from '../../task'
import { store } from '../../../reactivity'
export class YourName extends Task {
  constructor() {
    super()
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      store.setSignShow(true)
    })
  }
  start(): this {
    return this
  }
  pause(): this {
    return this
  }
  resolve(): void {
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
  next(): this {
    this.resolve()
    return this
  }
}
