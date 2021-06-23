import * as PIXI from 'pixi.js'
import { NPCFish } from '../lib/NPCFish'
import { gameTime } from '../reactivity'
import { FACTORY_NPC_ITEM } from '../constant'
import createNpc from './type'
let time
export function factoryFishPause () {
  clearInterval(time)
}
export function factoryFish (app, organization) {
  factoryFishPause()
  time = setInterval(() => {
    createFish(app, organization)
  }, parseInt(Math.random() * FACTORY_NPC_ITEM))
}
export function createFish (app, organization) {
  const npc = createNpc(createType())
  if (!npc) return
  const {
    texture, 
    healthValue
  } = npc
  const sprite = new PIXI.Sprite(texture)
  const fish = new NPCFish(app, sprite, healthValue, Math.random() > 0.5 ? 'r' : 'l')
  fish.positionOut()
  organization
    .addMaterial(fish)
  fish.startMove()
}
export function createType () {
  return Math.floor(gameTime.value / 25)
}