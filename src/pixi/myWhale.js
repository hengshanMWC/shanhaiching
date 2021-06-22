import * as PIXI from 'pixi.js'
import whaleImage from '../assets/whale.png'
import { loaderPromise } from './utils'
import { LeadFish } from './lib/leadFish'
import { HEALTH_VALUE } from './constant/index'
let whale = null
export function regression () {
  whale.healthValue = HEALTH_VALUE
}
export function getWhale () {
  return whale
}
export async function createWhale (app) {
  await loaderPromise('whale', whaleImage)
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  whale = new LeadFish(app, whaleSprite)
  whale.arrowMoveRender()
  return whale
}