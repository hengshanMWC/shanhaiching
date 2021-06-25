import {
  isInit,
  startGameTime,
  pauseGameTime,
  gameTime,
  gameValue,
} from '../reactivity'
import { regression } from '../pc/createWhale'
import { createTaskList } from '../task'
export class GameCycle {
  constructor (game) {
    this.game = game
  }
  // 开始
  start () {
    if (!isInit.value) {
      this.clean()
    }
    this.taskList = createTaskList(this.game.app, this.game.organization)
    this.taskList
      .createTaskList()
      .createTaskPromise()
    this.regression()
    this.handleIng()
  }
  // 暂停
  pause () {
    this.taskList.pause()
    this.handlePause()
  }
  // 继续
  continue () {
    this.handleIng()
  }
  // 结束
  end () {
    this.handlePause()
  }
  handlePause () {
    this.game.organization.haltMove() // 暂停游泳
    this.game.organization.closeTickHitTestRectangle() // 关闭检测
    pauseGameTime() // 暂停倒计时
  }
  handleIng () {
    this.game.organization.startMove()
    this.game.organization.openTickHitTestRectangle()
    this.taskList.start()
    startGameTime()
  }
  regression () {
    gameTime.value = 0
    gameValue.value = 0
  }
  clean () {
    this.game.organization.empty() // 清空
    this.game.whales.forEach(whale => {
      regression(whale)
    })
    this.game.organization.addPC(...this.game.whales)
  }
  fail () {
    this.taskList.reject()
  }
}