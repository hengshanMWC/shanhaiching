import { Application, TickerCallback, Sprite, Text, TextStyle } from 'pixi.js'
export class TextRise {
  app
  sprite
  text
  maxY = 0
  move: TickerCallback<undefined>
  private pixiText: Text
  constructor(app: Application, sprite: Sprite, text: string) {
    this.app = app
    this.sprite = sprite
    this.text = text
    this.move = () => {
      if (this.maxY > this.pixiText.y) {
        this.pixiText.y += 2
      } else {
        this.pause()
        this.app.stage.removeChild(this.pixiText)
      }
    }
    const style = new TextStyle({
      fontSize: 20,
      stroke: '#fff',
    })
    this.pixiText = new Text(text, style)
  }
  draw(): void {
    this.pixiText.x =
      this.sprite.x + this.sprite.width / 2 - this.pixiText.width / 2
    this.pixiText.y =
      this.sprite.y + this.sprite.height / 2 - this.pixiText.height / 2
    this.maxY = this.pixiText.y + 50
    this.app.stage.addChild(this.pixiText)
    this.start()
  }
  start(): this {
    this.app.ticker.add(this.move)
    return this
  }
  pause(): this {
    this.app.ticker.remove(this.move)
    return this
  }
}
