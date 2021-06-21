import * as PIXI from 'pixi.js'
import {
  getDocumentHeight,
  getDocumentWidth,
} from '../utils'
import { createWhale, getWhale, regression } from '../myWhale'
import { Organization } from './container'
import { factoryFish, factoryFishPause } from '../npc/fish'
import {
  isIdle,
  isPause,
  isInit,
  startGameTime,
  pauseGameTime,
  gameTime,
  gameValue
} from '../reactivity'
import { watch } from 'vue'
export async function createPixiApp () {
  const app = new PIXI.Application({
    height: getDocumentHeight(),
    width: getDocumentWidth()
  })
  const organization = new Organization(app)
  const whale = await createWhale(app)
  organization
    .addLead(whale)
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
      organization
    } = await createPixiApp()
    this.app = app
    this.organization = organization
    
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
    regression()
    this.organization.addLead(getWhale())
  }
  start () {
    gameTime.value = 0
    gameValue.value = 0
    isInit.value = false
  }
} 