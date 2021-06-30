import { Application, Sprite, Loader } from 'pixi.js'
import { Organization } from '../lib/container'
import { TaskList } from '../lib/taskList'
import { Boss } from '../lib/boss'
import { BossEntryTask } from '../lib/boss/task/bossEntryTask'
import { BossMessageTask } from '../lib/boss/task/bossMessageTask'
import { BossImpactTask } from '../lib/boss/task/bossImpactTask'
import { bossInfo } from './infos'
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
    new BossMessageTask(boss),
    new BossImpactTask(boss, app, organization),
  ])
}
