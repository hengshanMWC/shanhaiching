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
  createTaskPromise() {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      this.start()
    })
  }
  start() {
    this.pause()
    this.time = setInterval(() => {
      createFish(this.app, this.organization, this.resolve)
    }, Number((Math.random() * FACTORY_NPC_ITEM).toFixed()))
    return this
  }
  pause() {
    clearInterval(this.time)
    return this
  }
  resolve() {
    this._resolve(true)
    this._resolve = () => {}
  }
  reject() {
    this._reject()
    this._reject = () => {}
  }
}
