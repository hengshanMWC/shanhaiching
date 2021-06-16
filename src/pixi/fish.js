const SCALE = 100
export class Fish {
  constructor (app, sprite, options) {
    this.app = app
    this.sprite = sprite
    this._options = options
    this.init()
  }
  get delicious () {
    return this.options.healthValue / 10
  }
  init () {
    this.options = {
      speed: 5, // 移动速度
      healthValue: SCALE, // 生命值
      ...this._options,
    }
    this.baseWidth = this.sprite.width
    this.baseHeight = this.sprite.height
    this.app.stage.addChild(this.sprite)
  }
  collision (fish) {
    if (this.healthValue > fish.healthValue) {
      this.eat(fish.delicious)
      fish.destruction()
    } else {
      this.destruction()
    }
  }
  eat (delicious) {
    this.options.healthValue += delicious
    const scale = this.options.healthValue / SCALE
    this.sprite.width = this.baseWidth * scale
    this.sprite.height = this.baseHeight * scale
  }
  destruction () {
    this.app.stage.removeChild(this.sprite)
  }
}