import { isIdle, isSuccess } from '../reactivity'
export class TaskList {
  constructor (tasks) {
    this._resolve = null
    this._reject = null
    this.index = 0
    this.tasks = tasks
  }
  createTaskList () {
    this.taskList = this.tasks.map(task => this.taskPackage(task))
    return this
  }
  taskPackage (task) {
    const resolve = task.resolve
    task.resolve = function () {
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
  next () {
    if (this.taskList > this.index) {
      return this.taskList[this.index]
        .then(this.next.bind(this))
    }
  }
  start () {
    this.tasks[this.index].start()
  }
  pause () {
    this.tasks[this.index].pause()
  }
  resolve (){
    this._resolve()
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