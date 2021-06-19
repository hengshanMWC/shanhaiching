import { Game } from './lib/game'
let game
export function getGame () {
  if (!game) {
    game = new Game()  
  }
  return game
}