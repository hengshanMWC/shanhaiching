import {
  isInit,
  startGameTime,
  pauseGameTime,
  gameTime,
  gameValue,
  isIdle,
  isSuccess,
} from '../reactivity'
import { regression } from '../pc/createWhale'
import { createTaskList } from '../task'
import { Game } from './game'
import { TaskList } from './taskList'
import { Next } from './task'
export class GameCycle implements Next {
  game
  taskList: TaskList
  constructor(game: Game) {
    this.game = game
    this.taskList = createTaskList(this.game.app, this.game.organization)
  }
  // 开始
  start(): void {
    if (!isInit.value) {
      this.clean()
    }
    this.taskList = createTaskList(this.game.app, this.game.organization)
    this.taskList
      .createTaskList()
      .createTaskPromise()
      .then(() => (isSuccess.value = true))
      .catch(() => (isSuccess.value = false))
      .finally(() => (isIdle.value = true))
    this.regression()
    this.handleIng()
  }
  // 暂停
  pause(): void {
    this.handlePause()
  }
  // 继续
  continue(): void {
    this.handleIng()
  }
  // 结束
  end(): void {
    this.handlePause()
  }
  handlePause(): void {
    this.game.organization.closeTickHitTestRectangle() // 关闭检测
    this.taskList.pause()
    pauseGameTime() // 暂停倒计时
  }
  handleIng(): void {
    this.game.organization.openTickHitTestRectangle()
    this.taskList.start()
    startGameTime()
  }
  regression(): void {
    gameTime.value = 0
    gameValue.value = 0
  }
  clean(): void {
    this.game.organization.empty() // 清空
    this.game.whales.forEach(whale => {
      regression(whale)
    })
    this.game.organization.addPC(...this.game.whales)
  }
  reject(): void {
    this.taskList.reject()
  }
  next(): this {
    this.taskList.next()
    return this
  }
}
