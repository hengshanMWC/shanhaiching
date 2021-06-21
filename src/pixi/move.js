import { Keyboard } from './keyboard'
import { isPause } from './reactivity' 
export function arrowMoveRender (app, sprite, v) {
  function handleArrowUp () {
    if (isPause.value) return
    if (sprite.y > 0) {
      sprite.y -= v
    } else {
      sprite.y = 0
    }
  }
  function handleArrowRight () {
    if (isPause.value) return
    const maxX = app.renderer.width - sprite.width
    if (maxX > sprite.x) {
      sprite.x += v
    } else {
      sprite.x = maxX
    }
  }
  function handleArrowDown () {
    if (isPause.value) return
    const maxY = app.renderer.height - sprite.height
    if (maxY > sprite.y) {
      sprite.y += v
    } else {
      sprite.y = maxY
    }
  }
  function handleArrowLeft () {
    if (isPause.value) return
    if (sprite.x > 0) {
      sprite.x -= v
    } else {
      sprite.x -= 0
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
}