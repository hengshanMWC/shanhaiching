import * as PIXI from 'pixi.js'
import { NPCFish } from '../lib/NPCFish'
import { gameTime } from '../reactivity'
import createNpc from './type'
let time
export function factoryFishPause () {
  clearInterval(time)
}
export function factoryFish (app, organization) {
  factoryFishPause()
  time = setInterval(() => {
    createFish(app, organization)
  }, parseInt(Math.random() * 1500))
}
export async function createFish (app, organization) {
  const {
    texture, 
    healthValue
  } = await createNpc(createType())
  const sprite = new PIXI.Sprite(texture)
  const fish = new NPCFish(app, sprite, Math.random() > 0.5 ? 'r' : 'l', healthValue)
  fish.positionOut()
  organization
    .addMaterial(fish)
  fish.startMove()
}
export function createType () {
  return Math.floor(gameTime.value / 30)
}