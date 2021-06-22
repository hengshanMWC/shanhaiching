import { Keyboard } from './keyboard'
import { isPause } from '../reactivity' 
export class KeyboardMove {
  constructor (app, sprite, v0, v1) {
    this.app = app
    this.sprite = sprite
    this.v0 = v0
    this.v1 = v1
    this._direction
    this.recovery()
  }
  bind (events) {
    Object.keys(events).forEach(key => {
      new Keyboard(key, event => {
        if (isPause.value) return
        this.direction = key
        this.quicken()
        typeof events[key].down === 'function' && events[key].down(this.v, event)
      }, event => {
        this.recovery()
        typeof events[key].up === 'function' && events[key].up(event)
      })
    })
  }
  quicken () {
    if (this.direction !== this._direction) {
      this.timeNow = Date.now() + 250
      this._direction = this. direction
    } if (this.timeNow) {
      if (Date.now() >= this.timeNow) {
        this.v = Math.min(this.v + 1, this.v1)
        this.timeNow = Date.now() + 250
      }
    }
  }
  recovery () {
    this.timeNow = 0
    this.v = this.v0
    this.direction = ''
  }
}