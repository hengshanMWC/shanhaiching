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
    this.handleKeydown && window.addEventListener('keydown', this.handleKeydown, false)
    this.handleKeyup && window.addEventListener('keyup', this.handleKeyup, false)
  }
  removeEvent () {
    this.handleKeydown && window.removeEventListener('keydown', this.handleKeydown)
    this.handleKeyup && window.removeEventListener('keyup', this.handleKeyup)
  }
}