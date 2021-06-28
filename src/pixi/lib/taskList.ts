import { isIdle, isSuccess } from '../reactivity'
import { Task } from './task'

export class TaskList extends Task {
  public index: number = 0
  public tasks
  public taskList: Array<Promise<unknown>>
  constructor (tasks: Array<Task>) {
    super()
    this.tasks = tasks
    this.taskList = this.tasks.map(task => this.taskPackage(task))
  }
  taskPackage (task: Task) {
    const resolve = task.resolve
    task.resolve = () => {
      this.index++
      resolve()
    }
    return task.createTaskPromise()
  }
  createTaskPromise () {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      return this.next()
    })
      .then(this.resolve.bind(this))
      .catch(this.reject.bind(this))
      .finally(this.finally.bind(this))
  }
  next (): Promise<any> {
    if (this.taskList.length > this.index) {
      return this.taskList[this.index]
        .then(this.next.bind(this))
    }
    return Promise.reject()
  }
  start () {
    this.tasks[this.index].start()
    return this
  }
  pause () {
    this.tasks[this.index].pause()
    return this
  }
  resolve (){
    this._resolve(true)
    isSuccess.value = true
  }
  reject () {
    this.pause()
    this._reject()
    isSuccess.value = false
  }
  finally () {
    isIdle.value = true
  }
}