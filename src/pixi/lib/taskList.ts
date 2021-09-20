import { Task } from './task'

export class TaskList extends Task {
  private _index!: number
  taskPrmoise!: Promise<unknown>
  tasks
  constructor(tasks: Array<Task>) {
    super()
    this.tasks = tasks
  }
  get currentTask(): Task {
    return this.tasks[this._index]
  }
  get index(): number {
    return this._index
  }
  set index(value: number) {
    this._index = value
    if (this.tasks.length > value) {
      this.setCurrentTask()
    }
  }
  setCurrentTask(): Promise<unknown> {
    this.taskPrmoise = this.taskPackage(this.tasks[this._index])
    return this.taskPrmoise
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
    this.index = 0
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
    if (this.tasks.length > this._index) {
      return this.taskPrmoise.then(this.nextThen.bind(this))
    }
    return Promise.resolve()
  }
  start(): this {
    this.currentTask && this.currentTask.start()
    return this
  }
  pause(): this {
    this.currentTask && this.currentTask.pause()
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
    this.currentTask && this.currentTask.next()
    return this
  }
}
