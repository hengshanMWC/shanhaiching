import { factoryFish, factoryFishPause } from '../npc/fish'
import {
  isInit,
  startGameTime,
  pauseGameTime,
  gameTime,
  gameValue,
} from '../reactivity'
import { regression } from '../pc/createWhale'
export class GameCycle {
  constructor (game) {
    this.game = game
  }
  // 开始
  start () {
    if (!isInit.value) {
      this.clean()
    }
    this.regression()
    this.handleIng()
  }
  // 暂停
  pause () {
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
    factoryFishPause() // 关闭生产
    pauseGameTime() // 暂停倒计时
  }
  handleIng () {
    this.game.organization.startMove()
    this.game.organization.openTickHitTestRectangle()
    factoryFish(this.game.app, this.game.organization)
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
}