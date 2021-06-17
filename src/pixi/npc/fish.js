import * as PIXI from 'pixi.js'
import { Fish } from './lib/fish'
import { WHALE } from './constant/material'
export function createFish (organization, app) {
  const sprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  const fish = new Fish(app, sprite, WHALE)
  organization
    .addMaterial(fish)
}