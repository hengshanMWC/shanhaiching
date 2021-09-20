import { Task } from '../../task'
import { Message } from '../../../message'
import { store } from '../../../reactivity'
export class BossMessagesTask extends Task {
  messages
  ban = false
  private _index!: number
  constructor(messages: Array<Message>) {
    super()
    this.messages = messages
  }
  get message(): Message {
    if (this.messages.length > this._index) {
      return this.messages[this._index]
    }
    return {}
  }
  get index(): number {
    return this._index
  }
  set index(value: number) {
    if (this.messages.length > value) {
      this._index = value
      store.setMessageObject(this.message)
    } else {
      this.resolve()
    }
  }
  createTaskPromise(): Promise<unknown> {
    this.index = 0
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }
  start(): this {
    this.ban = false
    return this
  }
  pause(): this {
    this.ban = true
    return this
  }
  resolve(): void {
    store.setMessageObject()
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
  next(): this {
    if (!this.ban) this.index++
    return this
  }
}
