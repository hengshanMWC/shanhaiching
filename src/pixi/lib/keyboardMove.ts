import { Application, Sprite } from 'pixi.js'
import { isPause } from '../reactivity'
export interface moveCombinationEvents {
  [key: string]: {
    down: (v: number) => void
    up?: () => void
  }
}
export class moveCombination {
  app
  sprite
  private v = 0
  v0
  v1
  direction: string | number = ''
  private _direction: string | number = ''
  private timeNow = 0
  private _recovery: () => void
  keyboardMoveCombination: Array<KeyboardMove> = []
  constructor(app: Application, sprite: Sprite, v0: number, v1: number) {
    this.app = app
    this.sprite = sprite
    this.v0 = v0
    this.v1 = v1
    this._recovery = () => {
      this.keyboardMoveCombination.forEach(item => item.cease())
      this.recovery()
    }
    this.recovery()
  }
  bind(events: moveCombinationEvents): void {
    this.keyboardMoveCombination = Object.keys(events).map(key => {
      return new KeyboardMove(
        key,
        () => {
          if (isPause.value) return
          this.direction = key
          this.quicken()
          events[key].down(this.v)
        },
        () => {
          this.recovery()
          events[key]?.up?.()
        }
      )
    })
    window.addEventListener('blur', this._recovery)
  }
  quicken(): void {
    if (this.direction !== this._direction) {
      this.timeNow = Date.now() + 250
      this._direction = this.direction
    }
    if (this.timeNow) {
      if (Date.now() >= this.timeNow) {
        this.v = Math.min(this.v + 1, this.v1)
        this.timeNow = Date.now() + 250
      }
    }
  }
  recovery(): void {
    this.timeNow = 0
    this.v = this.v0
    this.direction = ''
    this._direction = ''
  }
  removeEvent(): void {
    window.removeEventListener('blur', this._recovery)
    this.keyboardMoveCombination.forEach(item => item.removeEvent())
  }
}
export class KeyboardMove {
  keydown
  keyup
  private time = 0
  private handleKeydown: (event: KeyboardEvent) => void
  private handleKeyup: (event: KeyboardEvent) => void
  constructor(
    value: number | string,
    keydown: () => void,
    keyup?: (event: KeyboardEvent) => void
  ) {
    this.keydown = keydown
    this.keyup = keyup
    this.time
    this.handleKeydown = (event: KeyboardEvent) => {
      if (!this.time && event.key === value) {
        this.step()
      }
    }
    this.handleKeyup = (event: KeyboardEvent) => {
      if (event.key === value) {
        this.keyup?.(event)
        this.cease()
      }
    }
    this.addEvent()
  }
  step(): void {
    this.time = requestAnimationFrame(() => {
      this.keydown()
      this.step()
    })
  }
  cease(): void {
    cancelAnimationFrame(this.time)
    this.time = 0
  }
  addEvent(): void {
    this.handleKeydown &&
      window.addEventListener('keydown', this.handleKeydown, false)
    this.handleKeyup &&
      window.addEventListener('keyup', this.handleKeyup, false)
  }
  removeEvent(): void {
    this.handleKeydown &&
      window.removeEventListener('keydown', this.handleKeydown)
    this.handleKeyup && window.removeEventListener('keyup', this.handleKeyup)
  }
}
