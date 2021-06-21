import { Game } from './lib/game'
let game
export function getGame () {
  if (!game) {
    game = new Game()  
    game.bindWindowEvent()
    game.bindWatchEvent()
  }
  return game
}