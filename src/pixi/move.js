import { Keyboard } from './keyboard'
import { isPause } from './reactivity' 
export function arrowMoveRender (app, sprite, v0, v1) {
  let v = v0
  let timeNow = 0
  let direction, _direction // t,r,b,l
  function quicken () {
    if (direction !== _direction) {
      timeNow = Date.now() + 250
      _direction = direction
    } if (timeNow) {
      if (Date.now() >= timeNow) {
        v = Math.min(v + 1, v1)
        timeNow = Date.now() + 250
      }
    }
  }
  function initV () {
    timeNow = 0
    v = v0
    direction = ''
  }
  function handleArrowUp () {
    if (sprite.y > 0) {
      sprite.y -= v
    } else {
      sprite.y = 0
    }
  }
  function handleArrowRight () {
    const maxX = app.renderer.width - sprite.width
    if (maxX > sprite.x) {
      sprite.x += v
    } else {
      sprite.x = maxX
    }
  }
  function handleArrowDown () {
    const maxY = app.renderer.height - sprite.height
    if (maxY > sprite.y) {
      sprite.y += v
    } else {
      sprite.y = maxY
    }
  }
  function handleArrowLeft () {
    if (sprite.x > 0) {
      sprite.x -= v
    } else {
      sprite.x -= 0
    }
  }
  new Keyboard('ArrowUp', 
    function () {
      if (isPause.value) return
      direction = 't'
      quicken()
      handleArrowUp()
    }, 
    function () {
      initV()
    }
  )
  new Keyboard('ArrowRight', 
    function () {
      if (isPause.value) return
      direction = 'r'
      quicken()
      handleArrowRight()
    }, 
    function () {
      initV()
    }
  )
  new Keyboard('ArrowDown', 
    function () {
      if (isPause.value) return
      direction = 'b'
      quicken()
      handleArrowDown()
    }, 
    function () {
      initV()
    }
  )
  new Keyboard('ArrowLeft', 
    function () {
      if (isPause.value) return
      direction = 'l'
      quicken()
      handleArrowLeft()
    }, 
    function () {
      initV()
    }
  )
}