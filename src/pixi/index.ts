import { Game } from './lib/game'
let game: Game
export function getGame() {
  if (!game) {
    game = new Game()
    game.bindWindowEvent()
    game.bindWatchEvent()
  }
  return game
}
