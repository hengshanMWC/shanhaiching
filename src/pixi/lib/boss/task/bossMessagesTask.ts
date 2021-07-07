import { Boss } from '../index'
import { Task } from '../../task'
import { Message } from '../../../message'
import { store } from '../../../reactivity'
export class BossMessagesTask extends Task {
  boss
  messages
  private _index = -1
  constructor(boss: Boss, messages: Array<Message>) {
    super()
    this.boss = boss
    this.messages = messages
  }
  get message(): Message {
    if (this._index > 0 && this._index < this.messages.length) {
      return this.messages[this._index]
    }
    return {}
  }
  set index(value: number) {
    this._index = value
    store.setMessageObject(this.message)
    if (value >= this.messages.length) this.resolve()
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
  next(): this {
    this.index++
    return this
  }
}
