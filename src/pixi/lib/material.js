import { HEALTH_VALUE } from '../constant/index'
export class Fish {
  constructor (app, sprite, healthValue = HEALTH_VALUE, delicious = 1) {
    this.app = app
    this.sprite = sprite
    this.healthValue = healthValue // 生命值
    this._healthValue
    this.delicious = delicious
    this.size = {
      width: sprite.width,
      height: sprite.height,
    } // 图片尺寸
  }
  get healthValue () {
    return this._healthValue
  }
  set healthValue (value) {
    this._healthValue = value
    this.sprite.width = value
    this.sprite.height = this.size.height * this.healthValue / this.size.width
  }
  collision (fish) {
    return this.healthValue > fish.healthValue
  }
}