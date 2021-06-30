import { Application, Sprite } from 'pixi.js'
import { HEALTH_VALUE } from '../constant/index'
export class Fish {
  app
  sprite
  size: {
    width: number
    height: number
  }
  delicious
  private _healthValue = 0
  constructor(
    app: Application,
    sprite: Sprite,
    healthValue = HEALTH_VALUE,
    delicious = 1
  ) {
    this.app = app
    this.sprite = sprite
    // 一定要比healthValue更早赋值，因为healthValue的set用到了size
    this.size = {
      width: sprite.width,
      height: sprite.height,
    } // 图片尺寸
    this.healthValue = healthValue // 生命值
    this.delicious = delicious
  }
  get healthValue(): number {
    return this._healthValue
  }
  set healthValue(value: number) {
    this._healthValue = value
    this.sprite.width = value
    this.sprite.height = (this.size.height * this.healthValue) / this.size.width
  }
  getSprite(): Sprite {
    return this.sprite
  }
  collision(fish: Fish): boolean {
    return this.healthValue > fish.healthValue
  }
  eat(delicious: number): this {
    this.healthValue += delicious
    return this
  }
  destruction(): this {
    return this
  }
}
