import { getDocumentWidth } from '../../utils'
import { Task } from '../task'
import { Boss } from './index'
import { Application, TickerCallback } from 'pixi.js'
export class BossEntryTask extends Task {
  public boss
  public app
  public time = 0
  public documentWidth = getDocumentWidth()
  public move: TickerCallback<undefined>
  constructor(boss: Boss, app: Application) {
    super()
    this.boss = boss
    this.app = app
    this.move = () => {
      const sprite = this.boss.getSprite()
      // 出现半个身
      if (this.documentWidth - sprite.x > sprite.width / 2) {
        this.boss.getSprite().x += -this.boss.speed
      } else {
        this.resolve()
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
}
