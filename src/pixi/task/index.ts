import { factoryFishTask } from '../lib/factoryFishTask'
import { TaskList } from '../lib/taskList'
export function createTaskList (app, organization) {
  return new TaskList([
    new factoryFishTask(app, organization)
  ])
}