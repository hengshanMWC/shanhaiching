import { Boss } from '../index'
import { Task } from '../../task'
export class BossMessageTask extends Task {
  public boss
  constructor(boss: Boss) {
    super()
    this.boss = boss
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
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
}
