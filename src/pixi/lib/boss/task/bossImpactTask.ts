import { Application } from 'pixi.js'
import { Boss } from '../index'
import { Impact } from './impact'
import { TextRise } from './textRise'
import { Task } from '../../task'
import { Organization } from '../../container'
export class BossImpactTask extends Task {
  boss
  app
  organization
  impact
  loss
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
    this.impact = new Impact(this.boss, this.app, this.getTargeData())
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
      this.impact
        .createTaskPromise()
        .then(this.nextThen.bind(this))
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
      return this.impact.createTaskPromise()
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
  createImpact(): this {
    this.impact = new Impact(this.boss, this.app, this.getTargeData()).start()
    return this
  }
  start(): this {
    this.createImpact()
    return this
  }
  pause(): this {
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
