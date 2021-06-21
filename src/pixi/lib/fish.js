export const HEALTH_VALUE = 50 // 基础生命值
export class Fish {
  constructor (app, sprite, direction = 'l', healthValue = HEALTH_VALUE, delicious = 1, speed = 1) {
    this.app = app
    this.sprite = sprite
    this.size = {
      width: sprite.width,
      height: sprite.height,
    } // 图片尺寸
    this.healthValue = healthValue // 生命值
    this._healthValue
    this.delicious = delicious
    this.speed = speed
    this.direction = direction // r, l
    this.move = () => {
      const speed = this.speed
      this.sprite.x += this.direction === 'l' ? speed : -speed
    }
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
    this.sprite.y = Math.min(
      this.app.renderer.height - this.sprite.height, 
      Math.random() * this.app.renderer.height
    )
    return this
  }
  collision (fish) {
    return this.healthValue > fish.healthValue
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