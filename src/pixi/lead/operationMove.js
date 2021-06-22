export function getArrowOperation (app, sprite) {
  return {
    ArrowUp: {
      down: v => {
        if (sprite.y > 0) {
          sprite.y -= v
        } else {
          sprite.y = 0
        }
      }
    },
    ArrowRight: {
      down: v => {
        const maxX = app.renderer.width - sprite.width
        if (maxX > sprite.x) {
          sprite.x += v
        } else {
          sprite.x = maxX
        }
      }
    },
    ArrowDown: {
      down: v => {
        const maxY = app.renderer.height - sprite.height
        if (maxY > sprite.y) {
          sprite.y += v
        } else {
          sprite.y = maxY
        }
      }
    },
    ArrowLeft: {
      down: v => {
        if (sprite.x > 0) {
          sprite.x -= v
        } else {
          sprite.x -= 0
        }
      }
    }
  }
}
export function getEnglishOperation (app, sprite) {
  return {
    w: {
      down: v => {
        if (sprite.y > 0) {
          sprite.y -= v
        } else {
          sprite.y = 0
        }
      }
    },
    d: {
      down: v => {
        const maxX = app.renderer.width - sprite.width
        if (maxX > sprite.x) {
          sprite.x += v
        } else {
          sprite.x = maxX
        }
      }
    },
    s: {
      down: v => {
        const maxY = app.renderer.height - sprite.height
        if (maxY > sprite.y) {
          sprite.y += v
        } else {
          sprite.y = maxY
        }
      }
    },
    a: {
      down: v => {
        if (sprite.x > 0) {
          sprite.x -= v
        } else {
          sprite.x -= 0
        }
      }
    }
  }
}