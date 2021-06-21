import * as PIXI from 'pixi.js'
import {
  getDocumentHeight,
  getDocumentWidth,
} from '../utils'
import { createWhale } from '../myWhale'
import { Organization } from './container'
import { factoryFish, factoryFishPause } from '../npc/fish'
import { isIdle, isPause, startGameTime, pauseGameTime, gameTime } from '../reactivity'
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
}