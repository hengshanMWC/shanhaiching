import { Application } from 'pixi.js'
import { FactoryFishTask } from '../lib/factoryFishTask'
import { TaskList } from '../lib/taskList'
import { Organization } from '../lib/container'
import { createBossTask } from '../npc/boss'
export function createTaskList(
  app: Application,
  organization: Organization
): TaskList {
  return new TaskList([
    // new FactoryFishTask(app, organization),
    createBossTask(app, organization),
  ])
}
