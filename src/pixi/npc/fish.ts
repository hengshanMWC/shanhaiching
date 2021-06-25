import * as PIXI from 'pixi.js'
import { NPCFish } from '../lib/NPCFish'
import { gameTime } from '../reactivity'
import { NPC_TYPE_TASK_ITEM } from '../constant'
import createNpc from './type'
export function createFish (app, organization, next) {
  const npc = createNpc(createType())
  if (!npc) {
    next()
  }
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
  return Math.floor(gameTime.value / NPC_TYPE_TASK_ITEM)
}