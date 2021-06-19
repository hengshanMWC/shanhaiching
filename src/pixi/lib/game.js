import * as PIXI from 'pixi.js'
import {
  getDocumentHeight,
  getDocumentWidth,
} from '../utils'
import { createWhale } from '../myWhale'
import { Organization } from './container'
import { factoryFish } from '../npc/fish'
import { ingMode } from '../reactivity'
export async function createPixiApp () {
  const app = new PIXI.Application({
    height: getDocumentHeight(),
    width: getDocumentWidth()
  })
  const organization = new Organization(app)
  const whale = await createWhale(app)
  organization
    .addLead(whale)
    .openTickHitTestRectangle()
  return {
    app,
    organization
  }
}

export class Game {
  constructor () {
    this.app = null
    this.organization = null
  }
  async init () {
    const {
      app,
      organization
    } = await createPixiApp()
    this.app = app
    this.organization = organization
  }
  handleStart () {
    ingMode()
    factoryFish(this.app, this.organization)
  }
}