import { Application, TickerCallback } from 'pixi.js'
import { getDocumentWidth } from '../../../utils'
import { Boss } from '../index'
import { Task } from '../../task'
export class BossEntryTask extends Task {
  boss
  app
  documentWidth = getDocumentWidth()
  move: TickerCallback<undefined>
  constructor(boss: Boss, app: Application) {
    super()
    this.boss = boss
    this.app = app
    this.boss.getSprite().x = this.documentWidth + this.boss.getSprite().width
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
      this.start()
    })
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
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
  next(): this {
    return this
  }
}
