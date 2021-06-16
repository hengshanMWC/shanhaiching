import { Keyboard } from './keyboard'
export function moveRender (app, sprite) {
  const v = 5
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