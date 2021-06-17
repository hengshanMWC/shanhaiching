import { hitTestRectangle } from '../utils'
export class Organization {
  constructor (app) {
    this.app = app
    this.materialList = []
    this.leadList = []
    this.handleTick = () => {
      let material, lead
      for (let i = 0; i < this.leadList.length; i++) {
        lead = this.leadList[i]
        for (let j = 0; j < this.materialList.length; j++) {
          material = this.materialList[i]
          // 是否碰撞
          if (hitTestRectangle(lead.getSprite(), material.getSprite())) {
            // 物料是否比主角大
            if (material.collision(lead)) {
              this.remove(lead)
              return 
            } else {
              this.remove(material)
            }
          }
        }
      }
    }
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
}