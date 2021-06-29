import { Application, Sprite } from 'pixi.js'
import { Fish } from './fish'
import { moveCombination, moveCombinationEvents } from './keyboardMove'
export class PlayerCharacter extends Fish {
  public keyboardMove
  constructor(
    app: Application,
    sprite: Sprite,
    v0 = 3,
    v1 = 4,
    healthValue?: number,
    delicious?: number
  ) {
    super(app, sprite, healthValue, delicious)
    this.keyboardMove = new moveCombination(this.app, this.sprite, v0, v1)
  }
  bind(events: moveCombinationEvents) {
    this.keyboardMove.bind(events)
    return this
  }
}
