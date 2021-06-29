import { Application } from 'pixi.js'
import { FACTORY_NPC_ITEM } from '../constant'
import { Organization } from './container'
import { createFish } from '../npc/fish'
import { Task } from './task'
export class FactoryFishTask extends Task {
  public app
  public organization
  public close
  public time = 0
  constructor(app: Application, organization: Organization) {
    super()
    this.app = app
    this.organization = organization
    this.close = false
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      this.start()
    })
  }
  start(): this {
    this.pause()
    this.time = setInterval(() => {
      createFish(this.app, this.organization, this.resolve)
    }, Number((Math.random() * FACTORY_NPC_ITEM).toFixed()))
    return this
  }
  pause(): this {
    clearInterval(this.time)
    return this
  }
  resolve(): void {
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
}
