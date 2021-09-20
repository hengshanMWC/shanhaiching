import { Application, TickerCallback } from 'pixi.js'
import { getDocumentWidth, getDocumentHeight } from '../../../utils'
import { Boss } from '../index'
import { Task } from '../../task'
export class BossEntryTask extends Task {
  boss
  app
  documentWidth = getDocumentWidth()
  documentHeight = getDocumentHeight()
  move: TickerCallback<undefined>
  constructor(boss: Boss, app: Application) {
    super()
    this.boss = boss
    this.app = app
    this.initSprite()
    this.move = () => {
      const sprite = this.boss.getSprite()
      // 出现半个身
      if (this.documentWidth - sprite.x > sprite.width / 2) {
        this.resolve()
      } else {
        sprite.x += -this.boss.speed
      }
    }
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }
  initSprite(): this {
    const sprite = this.boss.getSprite()
    sprite.x = this.documentWidth + sprite.width
    sprite.y = this.documentHeight / 2 - sprite.height / 2
    return this
  }
  start(): this {
    this.app.ticker.add(this.move)
    return this
  }
  pause(): this {
    this.app.ticker.remove(this.move)
    return this
  }
  resolve(): void {
    this.pause()
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
  next(): this {
    return this
  }
}
