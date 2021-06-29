import { isIdle, isSuccess } from '../reactivity'
import { Task } from './task'

export class TaskList extends Task {
  public index = 0
  public tasks
  public taskList: Array<Promise<unknown>> = []
  constructor(tasks: Array<Task>) {
    super()
    this.tasks = tasks
  }
  createTaskList(): this {
    this.taskList = this.tasks.map(task => this.taskPackage(task))
    return this
  }
  taskPackage(task: Task): Promise<unknown> {
    const resolve = task.resolve
    task.resolve = () => {
      this.index++
      resolve.apply(task)
    }
    return task.createTaskPromise()
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      return this.next()
    })
      .then(this.resolve.bind(this))
      .catch(this.reject.bind(this))
      .finally(this.finally.bind(this))
  }
  next(): Promise<unknown> {
    if (this.taskList.length > this.index) {
      return this.taskList[this.index].then(this.next.bind(this))
    }
    return Promise.reject()
  }
  start(): this {
    this.tasks[this.index].start()
    return this
  }
  pause(): this {
    this.tasks[this.index].pause()
    return this
  }
  resolve(): void {
    this._resolve(true)
    isSuccess.value = true
  }
  reject(): void {
    this.pause()
    this._reject()
    isSuccess.value = false
  }
  finally(): void {
    isIdle.value = true
  }
}
