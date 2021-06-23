import { isPause } from '../reactivity' 
export class moveCombination {
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
      new KeyboardMove(key, () => {
        if (isPause.value) return
        this.direction = key
        this.quicken()
        typeof events[key].down === 'function' && events[key].down(this.v)
      }, () => {
        this.recovery()
        typeof events[key].up === 'function' && events[key].up()
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
export class KeyboardMove {
  constructor (value, keydown, keyup) {
    this.keydown = keydown
    this.keyup = keyup
    this.handleKeydown = event => {
      if (event.key === value) {
        this.keydown(event)
      }
    }
    this.handleKeyup = event => {
      if (event.key === value) {
        this.keyup(event)
      }
    }
    this.addEvent()
  }
  addEvent () {
    this.handleKeydown && window.addEventListener('keydown', this.handleKeydown, false)
    this.handleKeyup && window.addEventListener('keyup', this.handleKeyup, false)
  }
  removeEvent () {
    this.handleKeydown && window.removeEventListener('keydown', this.handleKeydown)
    this.handleKeyup && window.removeEventListener('keyup', this.handleKeyup)
  }
}