import * as PIXI from 'pixi.js'
import whale from '../assets/whale.png'
import {
  getDocumentHeight,
  getDocumentWidth,
  loaderPromise
} from './utils'
import { Keyboard } from './keyboard'

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
  window.app = app
  const v = 5
  function handleArrowUp () {
    if (whaleSprite.y > 0) {
      whaleSprite.y -= v
    } else {
      whaleSprite.y = 0
    }
  }
  function handleArrowRight () {
    const maxX = app.renderer.width - whaleSprite.width
    if (maxX > whaleSprite.x) {
      whaleSprite.x += v
    } else {
      whaleSprite.x = maxX
    }
  }
  function handleArrowDown () {
    const maxY = app.renderer.height - whaleSprite.height
    if (maxY > whaleSprite.y) {
      whaleSprite.y += v
    } else {
      whaleSprite.y = maxY
    }
  }
  function handleArrowLeft () {
    if (whaleSprite.x > 0) {
      whaleSprite.x -= v
    } else {
      whaleSprite.x -= 0
    }
  }
  new Keyboard('ArrowUp', 
    function () {
      handleArrowUp()
    }, 
    function () {
    }
  )
  new Keyboard('ArrowRight', 
    function () {
      handleArrowRight()
    }, 
    function () {
    }
  )
  new Keyboard('ArrowDown', 
    function () {
      handleArrowDown()
    }, 
    function () {
    }
  )
  new Keyboard('ArrowLeft', 
    function () {
      handleArrowLeft()
    }, 
    function () {
    }
  )
  return app
}

