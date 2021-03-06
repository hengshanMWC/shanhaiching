import * as PIXI from 'pixi.js'
import { getDocumentHeight, getDocumentWidth } from '../utils'
import { createWhale } from '../pc/createWhale'
import { getArrowOperation, getEnglishOperation } from '../pc/operationMove'
import { Organization } from './container'
import { isIdle, isInit, isPause, gamePlayerNumber } from '../reactivity'
import { watch, WatchStopHandle } from 'vue'
import whaleImage from '../../assets/images/whale.png'
import { getTexture } from '../utils'
import { GameCycle } from './gameCycle'
import { PlayerCharacter } from './playerCharacter'
import { Next } from './task'

export class Game implements Next {
  app
  organization
  gameCycle
  startAntPause: (event: KeyboardEvent) => void
  whales: Array<PlayerCharacter> = []
  private idleWatch: WatchStopHandle = () => {
    // 属性xxx没有初始化表达式，且未在构造函数中明确赋值
  }
  private pauseWatch: WatchStopHandle = () => {
    // 属性xxx没有初始化表达式，且未在构造函数中明确赋值
  }
  constructor() {
    this.app = new PIXI.Application({
      height: getDocumentHeight(),
      width: getDocumentWidth(),
    })
    this.organization = new Organization(this)
    this.gameCycle = new GameCycle(this)
    this.startAntPause = event => {
      if (event.code === 'Space') {
        if (isIdle.value) {
          isIdle.value = false
          isInit.value = false
        } else {
          isPause.value = !isPause.value
        }
      }
    }
  }
  async init(): Promise<void> {
    await this.createWhales()
    this.organization.addPC(...this.whales)
  }
  async createWhales(): Promise<void> {
    await getTexture('whale', whaleImage)
    const seat = [getArrowOperation, getEnglishOperation]
    this.whales = seat
      .splice(0, gamePlayerNumber.value)
      .map(bindEvent => createWhale(this.app, bindEvent))
  }
  bindWatchEvent(): void {
    this.removeWatchEvent()
    this.idleWatch = watch(isIdle, value => {
      if (value) {
        this.gameCycle.end()
      } else {
        this.gameCycle.start()
      }
    })
    this.pauseWatch = watch(isPause, value => {
      if (value) {
        this.gameCycle.pause()
      } else {
        this.gameCycle.continue()
      }
    })
  }
  removeWatchEvent(): void {
    if (typeof this.pauseWatch === 'function') {
      this.pauseWatch()
    }
  }
  bindWindowEvent(): void {
    this.removeWindowEvent()
    window.addEventListener('keyup', this.startAntPause)
  }
  removeWindowEvent(): void {
    window.removeEventListener('keyup', this.startAntPause)
  }
  next(): this {
    this.gameCycle.next()
    return this
  }
}
