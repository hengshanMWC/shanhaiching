import { Application, Sprite } from 'pixi.js'
import { Fish } from '../fish'
export class Boss extends Fish {
  public speed
  public loss
  constructor(
    app: Application,
    sprite: Sprite,
    healthValue: number,
    delicious = 1,
    speed = 1,
    loss = 10
  ) {
    super(app, sprite, healthValue, delicious)
    this.speed = speed
    this.loss = loss
  }
}
