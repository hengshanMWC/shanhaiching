import * as PIXI from 'pixi.js'
import { NPCFish, Direction } from '../lib/NPCFish'
import { Organization } from '../lib/container'
import { FactoryFishTask } from '../lib/FactoryFishTask'
import { gameTime } from '../reactivity'
import { NPC_TYPE_TASK_ITEM } from '../constant'
import createNpc, { NPCInfo } from './type'
export function createFish(
  app: PIXI.Application,
  organization: Organization,
  resolve: FactoryFishTask['resolve']
): boolean {
  const npc = createNpc(createType())
  if (!npc) {
    resolve()
    return false
  }
  const { texture, healthValue } = npc as NPCInfo
  const sprite = new PIXI.Sprite(texture)
  const fish = new NPCFish(
    app,
    sprite,
    healthValue,
    Math.random() > 0.5 ? Direction.r : Direction.l
  )
  fish.positionOut()
  organization.addMaterial(fish)
  fish.start()
  return true
}
export function createType(): number {
  return Math.floor(gameTime.value / NPC_TYPE_TASK_ITEM)
}
