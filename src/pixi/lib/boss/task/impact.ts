import { Application, TickerCallback, Sprite } from 'pixi.js'
import { Boss } from '../index'
import { Task } from '../../task'
import { Direction } from '../../../typings/index'
interface Route {
  frame: number
  speedX: number
  speedY: number
}
export class Impact extends Task {
  boss
  app
  speed
  targeData
  currentPlace: {
    x: number
    y: number
  }
  move: TickerCallback<undefined>
  private route: Route
  constructor(
    boss: Boss,
    app: Application,
    targeData: {
      x: number
      y: number
      width: number
      height: number
    },
    speed = 5
  ) {
    super()
    this.boss = boss
    this.app = app
    this.speed = speed
    this.targeData = targeData
    this.currentPlace = {
      x: this.sprite.x,
      y: this.sprite.y,
    }
    this.route = this.getRoute()
    this.move = () => {
      const sprite = this.sprite
      if (this.route.frame >= 1) {
        const x = this.route.speedX
        const y = this.route.speedY
        if (this.directionX === Direction.r) {
          sprite.x += x
        } else {
          sprite.x -= x
        }
        if (this.directionY === Direction.b) {
          sprite.y += y
        } else {
          sprite.y -= y
        }
        this.route.frame--
      } else {
        const num = this.route.frame * this.speed
        if (this.directionX === Direction.r) {
          sprite.x += num
        } else {
          sprite.x -= num
        }
        if (this.directionY === Direction.b) {
          sprite.y += num
        } else {
          sprite.y -= num
        }
        this.route.frame = 0
      }
      if (this.route.frame <= 0) {
        this.resolve()
      }
    }
  }
  get sprite(): Sprite {
    return this.boss.getSprite()
  }
  get distanceX(): number {
    const num = this.currentPlace.x - this.targeData.x
    const deviation = num >= 0 ? this.sprite.width / 2 : -this.sprite.width / 2
    return num + deviation
  }
  get distanceY(): number {
    const num = this.currentPlace.y - this.targeData.y
    const deviation =
      num >= 0 ? this.sprite.height / 2 : -this.sprite.height / 2
    return num + deviation
  }
  get isArrive(): boolean {
    return !(this.distanceX && this.distanceY)
  }
  get directionX(): Direction.l | Direction.r {
    return this.distanceX > 0 ? Direction.l : Direction.r
  }
  get directionY(): Direction.t | Direction.b {
    return this.distanceY > 0 ? Direction.t : Direction.b
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      this.start()
    })
  }
  getRoute(): Route {
    if (Math.abs(this.distanceX) > Math.abs(this.distanceY)) {
      const frame = this.distanceX / this.speed
      return {
        frame,
        speedX: this.speed,
        speedY: this.distanceY / frame,
      }
    } else {
      const frame = this.distanceY / this.speed
      return {
        frame,
        speedX: this.distanceX / frame,
        speedY: this.speed,
      }
    }
  }
  start(): this {
    this.app.ticker.add(this.move)
    return this
  }
  pause(): this {
    this.app.ticker.remove(this.move)
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
