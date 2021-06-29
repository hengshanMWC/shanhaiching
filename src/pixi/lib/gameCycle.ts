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
export class GameCycle {
  public game
  public taskList: TaskList
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
    this.taskList.pause()
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
    this.game.organization.haltMove() // 暂停游泳
    this.game.organization.closeTickHitTestRectangle() // 关闭检测
    pauseGameTime() // 暂停倒计时
  }
  handleIng(): void {
    this.game.organization.startMove()
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
  fail(): void {
    this.taskList.reject()
  }
}
