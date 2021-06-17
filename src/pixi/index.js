import * as PIXI from 'pixi.js'
import {
  getDocumentHeight,
  getDocumentWidth,
} from './utils'
import { createWhale } from './myWhale'
import { Organization } from './lib/container'
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

