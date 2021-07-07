import { Application, Sprite, Loader } from 'pixi.js'
import { Organization } from '../lib/container'
import { TaskList } from '../lib/taskList'
import { Boss } from '../lib/boss'
import { BossEntryTask } from '../lib/boss/task/bossEntryTask'
import { BossMessagesTask } from '../lib/boss/task/bossMessagesTask'
import { BossImpactTask } from '../lib/boss/task/bossImpactTask'
import { bossInfo } from './infos'
import { bossEntryMessage } from '../message'
export function createBossTask(
  app: Application,
  organization: Organization
): TaskList {
  const sprite = new Sprite(
    Loader.shared.resources[bossInfo.textureName].texture
  )
  const boss = new Boss(app, sprite, bossInfo.healthValue)
  // organization.addMaterial(boss)
  return new TaskList([
    new BossEntryTask(boss, app),
    new BossMessagesTask(boss, bossEntryMessage),
    new BossImpactTask(boss, app, organization),
  ])
}
