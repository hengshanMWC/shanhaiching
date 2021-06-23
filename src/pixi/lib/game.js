import * as PIXI from 'pixi.js'
import {
  getDocumentHeight,
  getDocumentWidth,
} from '../utils'
import { createWhale } from '../pc/createWhale'
import { getArrowOperation, getEnglishOperation } from '../pc/operationMove'
import { Organization } from './container'
import {
  isIdle,
  isPause,
  gamePlayerNumber
} from '../reactivity'
import { watch } from 'vue'
import whaleImage from '../../assets/whale.png'
import { getTexture } from '../utils'
import { GameCycle } from './gameCycle'
import { loaderImg } from '../npc/loader'

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
    const {
      app,
      organization,
    } = createPixiApp()
    this.app = app
    this.organization = organization
    this.gameCycle = new GameCycle(this)
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
    await this.createWhales()
    this.organization
      .addPC(...this.whales)
    loaderImg()
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
        this.gameCycle.end()
      } else {
        this.gameCycle.start()
      }
    })
    this.pauseWatch = watch(isPause, () => {
      if (isPause.value) {
        this.gameCycle.pause()
      } else {
        this.gameCycle.continue()
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
} 