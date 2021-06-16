export class Keyboard {
  constructor (value, keydown, keyup) {
    this.keydown = keydown
    this.keyup = keyup
    this.handleKeydown = event => {
      if (event.key === value) {
        this.keydown(event)
      }
    }
    this.handleKeyup = event => {
      if (event.key === value) {
        this.keyup(event)
      }
    }
    this.addEvent()
  }
  addEvent () {
    window.addEventListener('keydown', this.handleKeydown, false)
    window.addEventListener('keyup', this.handleKeyup, false)
  }
  removeEvent () {
    window.removeEventListener('keydown', this.handleKeydown)
    window.removeEventListener('keyup', this.handleKeyup)
  }
}