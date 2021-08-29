import * as PIXI from 'pixi.js'

import { PlayerCharacter } from '../lib/playerCharacter'
import { HEALTH_VALUE } from '../constant/index'
import { Fish } from '../lib/fish'
import { OperationFunction } from './operationMove'

export function regression(whale: Fish): void {
  whale.healthValue = HEALTH_VALUE
}
export function createWhale(
  app: PIXI.Application,
  bindEvent: OperationFunction
): PlayerCharacter {
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  const whale = new PlayerCharacter(app, whaleSprite, 3, 4)
  if (typeof bindEvent === 'function') {
    whale.bind(bindEvent(app, whaleSprite))
  }
  return whale
}
