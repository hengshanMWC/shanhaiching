import * as PIXI from 'pixi.js'
import {
  getDocumentHeight,
  getDocumentWidth,
} from '../utils'
import { createWhale, regression } from '../lead/createWhale'
import { getArrowOperation, getEnglishOperation } from '../lead/operationMove'
import { Organization } from './container'
import { factoryFish, factoryFishPause } from '../npc/fish'
import {
  isIdle,
  isPause,
  isInit,
  startGameTime,
  pauseGameTime,
  gameTime,
  gameValue,
  gamePlayerNumber
} from '../reactivity'
import { watch } from 'vue'
import whaleImage from '../../assets/whale.png'
import { getTexture } from '../utils'
export function createPixiApp () {
  const app = new PIXI.Application({
    height: getDocumentHeight(),
    width: getDocumentWidth()
  })
  const organization = new Organization(app)
  return {
    app,
    organization
  }
}

export class Game {
  constructor () {
    this.app = null
    this.organization = null
    this.startAntPause = event => {
      if (event.code === 'Space') {
        if (isIdle.value) {
          isIdle.value = false
        } else {
          isPause.value = !isPause.value
        }
      }
    }
  }
  async init () {
    const {
      app,
      organization,
    } = createPixiApp()
    this.app = app
    this.organization = organization
    await this.createWhales()
    organization
      .addLead(...this.whales)
    
  }
  async createWhales () {
    await getTexture('whale', whaleImage)
    const seat = [ getArrowOperation, getEnglishOperation ]
    this.whales = seat
      .splice(0, gamePlayerNumber.value)
      .map(bindEvent => createWhale(this.app, bindEvent))
  }
  bindWatchEvent () {
    this.removeWatchEvent()
    this.idleWatch = watch(isIdle, () => {
      if (isIdle.value) {
        this.gamePause()
      } else {
        if (!isInit.value) {
          this.gameContinue()
        }
        this.start()
        this.gameIng()
        gameTime.value = 0
      }
    })
    this.pauseWatch = watch(isPause, () => {
      if (isPause.value) {
        this.gamePause()
      } else {
        this.gameIng()
      }
    })
  }
  removeWatchEvent () {
    if (typeof this.pauseWatch === 'function') {
      this.pauseWatch()
    }
  }
  bindWindowEvent () {
    this.removeWindowEvent()
    window.addEventListener('keyup', this.startAntPause)
  }
  removeWindowEvent () {
    window.removeEventListener('keyup', this.startAntPause)
  }
  gameIng () {
    if (this.organization) {
      this.organization.startMove()
      this.organization.openTickHitTestRectangle()
      factoryFish(this.app, this.organization)
      startGameTime()
    }
  }
  gamePause () {
    if (this.organization) {
      this.organization.haltMove() // 暂停游泳
      this.organization.closeTickHitTestRectangle() // 关闭检测
      factoryFishPause() // 关闭生产
      pauseGameTime() // 倒计时
    }
  }
  gameContinue () {
    this.organization.empty() // 清空
    this.whales.forEach(whale => {
      regression(whale)
    })
    this.organization.addLead(...this.whales)
  }
  start () {
    gameTime.value = 0
    gameValue.value = 0
    isInit.value = false
  }
} 