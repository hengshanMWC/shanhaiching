import { Fish } from './fish'
import { moveCombination } from './keyboardMove'
export class PlayerCharacter extends Fish {
  constructor (app, sprite, healthValue, delicious) {
    super(app, sprite, healthValue, delicious)
  }
  createKeyboardMove (events, v0 = 3, v1 = 4) {
    this.keyboardMove = new moveCombination(this.app, this.sprite, v0, v1, events)
    return this
  }
  bind (events) {
    this.keyboardMove.bind(events)
    return this
  }
}