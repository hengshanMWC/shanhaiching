import { Application, Sprite } from 'pixi.js'
export function getArrowOperation (app: Application, sprite: Sprite) {
  return {
    ArrowUp: {
      down: (v: number) => {
        if (sprite.y > 0) {
          sprite.y -= v
        } else {
          sprite.y = 0
        }
      }
    },
    ArrowRight: {
      down: (v: number) => {
        const maxX = app.renderer.width - sprite.width
        if (maxX > sprite.x) {
          sprite.x += v
        } else {
          sprite.x = maxX
        }
      }
    },
    ArrowDown: {
      down: (v: number) => {
        const maxY = app.renderer.height - sprite.height
        if (maxY > sprite.y) {
          sprite.y += v
        } else {
          sprite.y = maxY
        }
      }
    },
    ArrowLeft: {
      down: (v: number) => {
        if (sprite.x > 0) {
          sprite.x -= v
        } else {
          sprite.x -= 0
        }
      }
    }
  }
}
export function getEnglishOperation (app: Application, sprite: Sprite) {
  return {
    w: {
      down: (v: number) => {
        if (sprite.y > 0) {
          sprite.y -= v
        } else {
          sprite.y = 0
        }
      }
    },
    d: {
      down: (v: number) => {
        const maxX = app.renderer.width - sprite.width
        if (maxX > sprite.x) {
          sprite.x += v
        } else {
          sprite.x = maxX
        }
      }
    },
    s: {
      down: (v: number) => {
        const maxY = app.renderer.height - sprite.height
        if (maxY > sprite.y) {
          sprite.y += v
        } else {
          sprite.y = maxY
        }
      }
    },
    a: {
      down: (v: number) => {
        if (sprite.x > 0) {
          sprite.x -= v
        } else {
          sprite.x -= 0
        }
      }
    }
  }
}