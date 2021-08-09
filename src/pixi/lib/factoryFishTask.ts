import { Application } from 'pixi.js'
import { FACTORY_NPC_ITEM } from '../constant'
import { gamePlayerNumber } from '../reactivity'
import { Organization } from './container'
import { createFish } from '../npc/fish'
import { Task } from './task'
import { Wait } from './wait'
export class FactoryFishTask extends Task {
  app
  organization
  private wait
  constructor(app: Application, organization: Organization) {
    super()
    this.app = app
    this.organization = organization
    this.wait = new Wait(app, this.getMillisecond())
  }
  getMillisecond(): number {
    return (
      Number((Math.random() * FACTORY_NPC_ITEM).toFixed()) /
      gamePlayerNumber.value
    )
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      return this.nextThen()
    })
  }
  nextThen(): Promise<unknown> {
    return this.wait.createTaskPromise().then(() => {
      const b = createFish(this.app, this.organization, this.resolve.bind(this))
      if (b) {
        const p = this.nextThen()
        this.wait.time = this.getMillisecond()
        this.wait.start()
        return p
      } else {
        return Promise.resolve()
      }
    })
  }
  start(): this {
    this.organization.start()
    this.wait.start()
    return this
  }
  pause(): this {
    this.organization.pause() // 暂停游泳
    this.wait.pause()
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
