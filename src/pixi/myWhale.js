import * as PIXI from 'pixi.js'
import whaleImage from '../assets/whale.png'
import { loaderPromise } from './utils'
import { arrowMoveRender } from './move'
import { Fish } from './lib/fish'
import { WHALE } from './constant/material'
let whale = null
export function getWhale () {
  return whale
}
export async function createWhale (app) {
  await loaderPromise('whale', whaleImage)
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  whale = new Fish(app, whaleSprite, WHALE)
  arrowMoveRender(app, whaleSprite, 8)
  return whale
}