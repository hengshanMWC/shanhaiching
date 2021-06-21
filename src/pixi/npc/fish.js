import * as PIXI from 'pixi.js'
import { Fish } from '../lib/fish'
import createNpc from './type'
let time
export function factoryFishPause () {
  clearInterval(time)
}
export function factoryFish (app, organization) {
  factoryFishPause()
  time = setInterval(() => {
      if (Math.random() > 0.5) {
        createFish(app, organization)
        createFish(app, organization)
      } else {
        createFish(app, organization)
      }
  }, 3000)
}
export async function createFish (app, organization) {
  const {
    texture, 
    healthValue
  } = await createNpc(0)
  const sprite = new PIXI.Sprite(texture)
  const fish = new Fish(app, sprite, Math.random() > 0.5 ? 'r' : 'l', healthValue)
  fish.positionOut()
  organization
    .addMaterial(fish)
  fish.startMove()
}