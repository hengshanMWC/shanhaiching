import { FACTORY_NPC_ITEM } from '../constant'
import { createFish } from '../npc/fish'
export class factoryFishTask {
  constructor (app, organization) {
    this.app = app
    this.organization = organization
    this._resolve = null
    this._reject = null
    this.close = false
    this.time
  }
  createTaskPromise () {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      this.start()
    })
  }
  start () {
    this.pause()
    this.time = setInterval(() => {
      createFish(this.app, this.organization, this.resolve)
    }, parseInt(Math.random() * FACTORY_NPC_ITEM))
  }
  pause () {
    clearInterval(this.time)
  }
  resolve (){
    this._resolve()
    this._resolve = null
  }
  reject () {
    this._reject()
    this._reject = null
  }
}