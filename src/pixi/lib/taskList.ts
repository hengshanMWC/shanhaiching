import { Task } from './task'

export class TaskList extends Task {
  private index = 0
  tasks
  taskList: Array<Promise<unknown>> = []
  constructor(tasks: Array<Task>) {
    super()
    this.tasks = tasks
  }
  createTaskList(): this {
    this.taskList = this.tasks.map(task => this.taskPackage(task))
    return this
  }
  taskPackage(task: Task): Promise<unknown> {
    const resolve = task.resolve.bind(task)
    task.resolve = () => {
      this.index++
      resolve()
    }
    return task.createTaskPromise()
  }
  createTaskPromise(): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this._resolve = resolve
      this._reject = reject
      return this.nextThen()
        .then(this.resolve.bind(this))
        .catch(this.reject.bind(this))
        .finally(this.finally.bind(this))
    })
  }
  private nextThen(): Promise<unknown> {
    if (this.taskList.length > this.index) {
      return this.taskList[this.index].then(this.nextThen.bind(this))
    }
    return Promise.resolve()
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
  }
  reject(): void {
    this.pause()
    this._reject()
  }
  finally(): void {
    // 占位
  }
  next(): this {
    this.tasks[this.index].next()
    return this
  }
}
