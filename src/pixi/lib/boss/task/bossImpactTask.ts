import { Application } from 'pixi.js'
import { Boss } from '../index'
import { Impact } from './impact'
import { TextRise } from './textRise'
import { Wait } from '../../wait'
import { Task } from '../../task'
import { Organization } from '../../container'
export class BossImpactTask extends Task {
  boss
  app
  organization
  impact!: Impact
  loss
  private wait: Wait
  private textRise
  constructor(
    boss: Boss,
    app: Application,
    organization: Organization,
    loss = 10
  ) {
    super()
    this.boss = boss
    this.boss.setDestruction(() => {
      this.pause()
      this.impact.reject()
    })
    this.app = app
    this.organization = organization
    this.loss = loss
    this.wait = new Wait(this.app)
    this.textRise = new TextRise(app, this.boss.getSprite(), loss.toString())
  }
  get pcSprite(): {
    x: number
    y: number
    width: number
    height: number
  } {
    if (this.organization.pcList.length) {
      return this.organization.pcList[0].getSprite()
    } else {
      return {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
    }
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      return this.nextThen()
        .then(this.resolve.bind(this))
        .catch(this.reject.bind(this))
        .finally(this.finally.bind(this))
    })
  }
  private nextThen(): Promise<unknown> {
    if (this.boss.healthValue > this.loss) {
      this.boss.healthValue -= this.loss
      this.impact = new Impact(this.boss, this.app, this.getTargeData())
      const resolve = this.impact.resolve
      this.impact.resolve = () => {
        this.emitLoss()
        resolve()
      }
      return this.wait
        .start()
        .createTaskPromise()
        .then(() => this.impact.start().createTaskPromise())
    }
    return Promise.resolve()
  }
  emitLoss(): void {
    this.boss.healthValue -= this.loss
    this.textRise.draw()
  }
  getTargeData(): {
    x: number
    y: number
    width: number
    height: number
  } {
    const sprite = this.pcSprite
    return {
      x: sprite.x,
      y: sprite.y,
      width: sprite.width,
      height: sprite.height,
    }
  }
  start(): this {
    this.wait.start()
    this.impact.start()
    this.textRise.start()
    return this
  }
  pause(): this {
    this.wait.pause()
    this.impact.pause()
    this.textRise.pause()
    return this
  }
  resolve(): void {
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
  finally(): void {
    // 占位
  }
  next(): this {
    return this
  }
}
