import { Fish } from './fish'
export class NPCFish extends Fish {
  constructor (app, sprite, healthValue, direction = 'l', delicious = 1, speed = 1) {
    super(app, sprite, healthValue, delicious)
    this.speed = speed
    this.direction = direction // r, l
    this.move = () => {
      const speed = this.speed
      this.sprite.x += this.direction === 'l' ? speed : -speed
    }
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