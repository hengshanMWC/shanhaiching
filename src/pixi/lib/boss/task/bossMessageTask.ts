import { Boss } from '../index'
import { Task } from '../../task'
import { Message } from '../../../message'
export class BossMessageTask extends Task {
  boss
  message
  constructor(boss: Boss, message: Array<Message>) {
    super()
    this.boss = boss
    this.message = message
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
