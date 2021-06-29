import { Application } from 'pixi.js'
import { FACTORY_NPC_ITEM } from '../constant'
import { gamePlayerNumber } from '../reactivity'
import { Organization } from './container'
import { createFish } from '../npc/fish'
import { Task } from './task'
export class FactoryFishTask extends Task {
  public app
  public organization
  public time = 0
  constructor(app: Application, organization: Organization) {
    super()
    this.app = app
    this.organization = organization
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
      createFish(this.app, this.organization, this.resolve.bind(this))
    }, Number((Math.random() * FACTORY_NPC_ITEM).toFixed()) / gamePlayerNumber.value)
    return this
  }
  pause(): this {
    clearInterval(this.time)
    return this
  }
  resolve(): void {
    this.pause()
    this._resolve(true)
  }
  reject(): void {
    this._reject()
  }
}
