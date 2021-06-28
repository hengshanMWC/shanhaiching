import * as PIXI from 'pixi.js'

import { PlayerCharacter } from '../lib/playerCharacter'
import { HEALTH_VALUE } from '../constant/index'
import { Fish } from '../lib/fish'
export function regression (whale: Fish) {
  whale.healthValue = HEALTH_VALUE
}
export function createWhale (app: PIXI.Application, bindEvent: Function) {
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  const whale = new PlayerCharacter(app, whaleSprite, 3, 4)
  if (typeof bindEvent === 'function') {
    whale
      .bind(bindEvent(app, whaleSprite))
  }
  return whale
}