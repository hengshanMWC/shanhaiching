import { hitTestRectangle } from '../utils'
export class Organization {
  constructor (app) {
    this.app = app
    this.materialList = []
    this.leadList = []
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
  addLead (...lead) {
    this.leadList.push(...lead)
    lead.forEach(item => {
      this.add(item)
    })
    return this
  }
  removeLead (lead) {
    const index = this.leadList.findIndex(item => lead === item)
    this.remove(lead, index)
  }
  addMaterial (...material) {
    this.materialList.push(...material)
    material.forEach(item => {
      this.add(item)
    })
    return this
  }
  removeMaterial (material) {
    const index = this.materialList.findIndex(item => material === item)
    return this.remove(material, index)
  }
  add (material) {
    this.app.stage.addChild(material.getSprite())
    return this
  }
  remove (material, index) {
    if (index !== -1) {
      this.materialList.splice(index, 1)
      this.app.stage.removeChild(material.getSprite())
    }
    return this
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
    let material, lead
    for (let i = 0; i < this.leadList.length; i++) {
      lead = this.leadList[i]
      for (let j = 0; j < this.materialList.length; j++) {
        material = this.materialList[j]
        if (this.hit(material, lead)) return
        this.out(material)
      }
    }
  }
  // 检测碰撞
  hit (material, lead) {
    if (hitTestRectangle(lead.getSprite(), material.getSprite())) {
      // 物料是否比主角大
      if (material.collision(lead)) {
        this.remove(lead)
        return true
      } else {
        this.remove(material)
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
      material.destruction()
      this.remove(material)
    }
    return this
  }
}