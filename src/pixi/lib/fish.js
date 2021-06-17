export const HEALTH_VALUE = 50 // 基础生命值
export class Fish {
  constructor (app, sprite, size, healthValue = HEALTH_VALUE, options = {}, direction = 'l',) {
    this.app = app
    this.sprite = sprite
    this.size = size // 图片尺寸
    this.healthValue = healthValue // 生命值
    this._healthValue
    this.options = {
      speed: 2,
      ...options,
    }
    this.direction = direction // r, l
    this.move = () => {
      const speed = this.options.speed
      this.sprite.x += this.direction === 'l' ? speed : -speed
    }
  }
  get delicious () {
    return this.healthValue / 10
  }
  get healthValue () {
    return this._healthValue
  }
  set healthValue (value) {
    this._healthValue = value
    this.sprite.width = value
    this.sprite.height = this.size.height * this.healthValue / this.size.width
  }
  getSprite () {
    return this.sprite
  }
  positionOut () {
    this.sprite.x = this.direction === 'l' 
      ? -this.sprite.width
      : this.app.renderer.width
    return false
  }
  collision (fish) {
    if (this.healthValue > fish.healthValue) {
      this.eat(fish.delicious)
      fish.destruction()
      return true
    } else {
      fish.eat(this.delicious)
      this.destruction()
      return false
    }
  }
  eat (delicious) {
    this.healthValue += delicious
  }
  startMove () {
    this.app.ticker.add(this.move)
    return this
  }
  haltMove () {
    this.app.ticker.remove(this.move)
    return this
  }
  destruction () {
    this.haltMove()
    return this
  }
}