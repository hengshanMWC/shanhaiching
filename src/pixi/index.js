import * as PIXI from 'pixi.js'
import whale from '../assets/whale.png'
import {
  getDocumentHeight,
  getDocumentWidth
} from './utils'
export default async function () {
  const app = new PIXI.Application({
    height: getDocumentHeight(),
    width: getDocumentWidth()
  })
  await loaderPromise('whale', whale)
  const whaleSprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  app.stage.addChild(whaleSprite)
  return app
}
function loaderPromise (...arr) {
  return new Promise(function (resolve) {
    PIXI.Loader.shared
    .add(...arr)
    .load(resolve)
  })
}
