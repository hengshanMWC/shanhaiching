import { Application, Sprite, TickerCallback } from 'pixi.js'
import { Fish } from './fish'
export enum Direction {
  l = 'l',
  r = 'r',
}
export class NPCFish extends Fish {
  speed
  direction
  private move: TickerCallback<undefined>
  constructor(
    app: Application,
    sprite: Sprite,
    healthValue: number,
    direction: Direction = Direction.l,
    delicious = 1,
    speed = 1
  ) {
    super(app, sprite, healthValue, delicious)
    this.speed = speed
    this.direction = direction // r, l
    this.move = () => {
      const speed = this.speed
      this.sprite.x += this.direction === 'l' ? speed : -speed
    }
  }
  positionOut(): this {
    this.sprite.x =
      this.direction === 'l' ? -this.sprite.width : this.app.renderer.width
    this.sprite.y = Math.min(
      this.app.renderer.height - this.sprite.height,
      Math.random() * this.app.renderer.height
    )
    return this
  }
  start(): this {
    this.app.ticker.add(this.move)
    return this
  }
  pause(): this {
    this.app.ticker.remove(this.move)
    return this
  }
  destruction(): this {
    this.pause()
    return this
  }
}
