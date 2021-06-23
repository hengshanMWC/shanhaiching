import { hitTestRectangle } from '../utils'
import { gameValue, isSuccess, isIdle } from '../reactivity'
export class Organization {
  static max = 20
  constructor (app) {
    this.app = app
    this.materialList = []
    this.pcList = []
    this.handleTick = () => {
      this.forTesting()
    }
  }
  get width () {
    return this.app.renderer.width
  }
  get height () {
    return this.app.renderer.height
  }
  get Number () {
    return this.materialList.length + this.pcList.length
  }
  get isFull () {
    return Organization.max <= this.Number
  }
  addPC (...pc) {
    this.pcList.push(...pc)
    pc.forEach(item => this.add(item))
    return this
  }
  removePC (pc) {
    const index = this.pcList.findIndex(item => pc === item)
    if (index !== -1) {
      this.pcList.splice(index, 1)
      this.remove(pc)
    }
    return this
  }
  addMaterial (...material) {
    if (this.isFull) return
    const materials = material.slice(0, Organization.max - this.Number)
    this.materialList.push(...materials)
    materials.forEach(item => this.add(item))
    return this
  }
  removeMaterial (material) {
    const index = this.materialList.findIndex(item => material === item)
    if (index !== -1) {
      this.materialList.splice(index, 1)
      this.remove(material)
    }
    return this
  }
  add (material) {
    this.app.stage.addChild(material.getSprite())
    return this
  }
  remove (material) {
    this.app.stage.removeChild(material.getSprite())
    material.destruction()
    return this
  }
  empty () {
    this.materialList.forEach(item => this.remove(item))
    this.materialList.length = 0
    this.pcList.forEach(item => this.remove(item))
    this.pcList.length = 0
  }
  openTickHitTestRectangle () {
    this.app.ticker.add(this.handleTick)
    return this
  }
  closeTickHitTestRectangle () {
    this.app.ticker.remove(this.handleTick)
    return this
  }
  forTesting () {
    let material, pc
    for (let i = 0; i < this.pcList.length; i++) {
      pc = this.pcList[i]
      for (let j = 0; j < this.materialList.length; j++) {
        material = this.materialList[j]
        if (this.hit(material, pc)) return
        this.out(material)
      }
    }
  }
  // 检测碰撞
  hit (material, pc) {
    if (hitTestRectangle(pc.getSprite(), material.getSprite())) {
      // 物料是否比主角大
      if (material.collision(pc)) {
        material.eat(pc.delicious)
        this.removePC(pc)
        this.gameOver()
        
        return true
      } else {
        pc.eat(material.delicious)
        this.removeMaterial(material)
        gameValue.value += material.delicious
        return false
      }
    }
    return false
  }
  // 检测是否出界
  out (material) {
    if (
      (
        material.direction === 'l' &&
        material.getSprite().x > this.width + material.getSprite().width
      ) ||
      (
        material.direction === 'r' &&
        material.getSprite().x < -material.getSprite().width
      )
    ) {
      this.removeMaterial(material)
    }
    return this
  }
  haltMove () {
    this.materialList.forEach(material => material.haltMove())
  }
  startMove () {
    this.materialList.forEach(material => material.startMove())
  }
  gameOver () {
    if (!this.pcList.length) {
      isIdle.value = true
      isSuccess.value = false
    }
  }
}