import { Application, TickerCallback } from 'pixi.js'
import { Task } from './task'
export class Wait extends Task {
  app
  time
  private move: TickerCallback<unknown>
  private waitTime = 0
  private _time
  private ing = false
  constructor(app: Application, time = 2000) {
    super()
    this.app = app
    this.time = time
    this._time = time
    this.move = () => {
      if (this.waitTime <= Date.now()) {
        this.resolve()
        this._time = this.time
      }
    }
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      this.ing = true
    })
  }
  start(): this {
    this.app.ticker.add(this.move)
    if (this.ing) {
      this.waitTime = Date.now() + this._time
    }
    return this
  }
  pause(): this {
    this.app.ticker.remove(this.move)
    if (this.ing) {
      this._time = this.waitTime - Date.now()
    }
    return this
  }
  resolve(): void {
    this._resolve(true)
    this.ing = false
  }
  reject(): void {
    this._reject()
    this.ing = false
  }
  finally(): void {
    // 占位
  }
  next(): this {
    return this
  }
}
