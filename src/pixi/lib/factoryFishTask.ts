import { Application } from 'pixi.js'
import { FACTORY_NPC_ITEM } from '../constant'
import { gamePlayerNumber } from '../reactivity'
import { Organization } from './container'
import { createFish } from '../npc/fish'
import { Task } from './task'
export class FactoryFishTask extends Task {
  app
  organization
  time = 0
  constructor(app: Application, organization: Organization) {
    super()
    this.app = app
    this.organization = organization
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
    })
  }
  start(): this {
    this.pause()
    this.organization.start()
    const millisecond =
      Number((Math.random() * FACTORY_NPC_ITEM).toFixed()) /
      gamePlayerNumber.value
    this.time = setInterval(() => {
      createFish(this.app, this.organization, this.resolve.bind(this))
    }, millisecond)
    return this
  }
  pause(): this {
    clearInterval(this.time)
    this.organization.pause() // 暂停游泳
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
