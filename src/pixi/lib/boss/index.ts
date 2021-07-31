import { Application, Sprite } from 'pixi.js'
import { Fish } from '../fish'
export class Boss extends Fish {
  speed
  private _destruction: () => void
  constructor(
    app: Application,
    sprite: Sprite,
    healthValue: number,
    delicious = 1,
    speed = 1
  ) {
    super(app, sprite, healthValue, delicious)
    this.speed = speed
    this._destruction = () => {
      // 占位
    }
  }
  setDestruction(cd: () => void): this {
    this._destruction = cd
    return this
  }
  destruction(): this {
    this._destruction()
    return this
  }
}
