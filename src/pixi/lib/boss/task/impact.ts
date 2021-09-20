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
    this.route = this.getRoute()
    console.log(this.route)
    this.move = () => {
      if (this.isArrive) {
        this.resolve()
      } else {
        console.log(this.distanceX, this.distanceY)
        if (this.directionX === Direction.r) {
          if (this.distanceX <= this.route.speedX) {
            this.sprite.x += this.route.speedX
          } else {
            this.sprite.x += this.distanceX
          }
        } else {
          if (this.distanceX >= this.route.speedX) {
            this.sprite.x -= this.route.speedX
          } else {
            this.sprite.x -= this.distanceX
          }
        }
        if (this.directionY === Direction.b) {
          if (this.distanceY <= this.route.speedY) {
            this.sprite.y += this.route.speedY
          } else {
            this.sprite.y += this.distanceY
          }
        } else {
          if (this.distanceY >= this.route.speedY) {
            this.sprite.y -= this.route.speedY
          } else {
            this.sprite.y -= this.distanceY
          }
        }
      }
    }
  }
  get sprite(): Sprite {
    return this.boss.getSprite()
  }
  get currentPlace(): {
    x: number
    y: number
  } {
    return {
      x: this.sprite.x,
      y: this.sprite.y,
    }
  }
  get targetPlace(): {
    x: number
    y: number
  } {
    return {
      x: this.targeData.x + this.sprite.width / 2,
      y: this.targeData.y + this.sprite.height / 2,
    }
  }
  get distanceX(): number {
    return this.currentPlace.x - this.targetPlace.x
  }
  get distanceY(): number {
    return this.currentPlace.y - this.targetPlace.y
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
