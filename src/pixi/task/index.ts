import { Application } from 'pixi.js'
import { FactoryFishTask } from '../lib/factoryFishTask'
import { TaskList } from '../lib/taskList'
import { Organization } from '../lib/container'
export function createTaskList(app: Application, organization: Organization) {
  return new TaskList([new FactoryFishTask(app, organization)])
}
