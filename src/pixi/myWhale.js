import * as PIXI from 'pixi.js'
import whaleImage from '../assets/whale.png'
import { loaderPromise } from './utils'
import { moveRender } from './move'
import { Fish } from './fish'
import { WHALE } from './constant/material'
export async function createdWhale (app) {
  await loaderPromise('whale', whaleImage)
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  whaleSprite.width = WHALE.width * 0.5
  whaleSprite.height = WHALE.height * 0.5
  moveRender(app, whaleSprite, 8)
  const whale = new Fish(app, whaleSprite)
  return whale
}