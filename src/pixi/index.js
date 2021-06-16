import * as PIXI from 'pixi.js'
import whale from '../assets/whale.png'
import {
  getDocumentHeight,
  getDocumentWidth,
  loaderPromise
} from './utils'
import { moveRender } from './move'
export async function createPixiApp () {
  const app = new PIXI.Application({
    height: getDocumentHeight(),
    width: getDocumentWidth()
  })
  await loaderPromise('whale', whale)
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  app.stage.addChild(whaleSprite)
  moveRender(app, whaleSprite)
  return app
}

