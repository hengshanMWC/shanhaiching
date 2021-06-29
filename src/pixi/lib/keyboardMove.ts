import { Application, Sprite } from 'pixi.js'
import { isPause } from '../reactivity'
export interface moveCombinationEvents {
  [key: string]: {
    down: (v: number) => void
    up?: () => void
  }
}
export class moveCombination {
  public app
  public sprite
  public v = 0
  public v0
  public v1
  public direction: string | number = ''
  public _direction: unknown
  public timeNow = 0
  constructor(app: Application, sprite: Sprite, v0: number, v1: number) {
    this.app = app
    this.sprite = sprite
    this.v0 = v0
    this.v1 = v1
    this.recovery()
  }
  bind(events: moveCombinationEvents): void {
    Object.keys(events).forEach(key => {
      new KeyboardMove(
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
  }
}
export class KeyboardMove {
  public keydown
  public keyup
  public time = 0
  public handleKeydown: (event: KeyboardEvent) => void
  public handleKeyup: (event: KeyboardEvent) => void
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
