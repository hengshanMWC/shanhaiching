import * as PIXI from 'pixi.js'

import { LeadFish } from '../lib/leadFish'
import { HEALTH_VALUE } from '../constant/index'
export function regression (whale) {
  whale.healthValue = HEALTH_VALUE
}
export function createWhale (app, bindEvent) {
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  const whale = new LeadFish(app, whaleSprite)
  if (typeof bindEvent === 'function') {
    whale
      .createKeyboardMove()
      .bind(bindEvent(app, whaleSprite))
  }
  return whale
}