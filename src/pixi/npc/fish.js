import * as PIXI from 'pixi.js'
import { Fish } from '../lib/fish'
import { WHALE } from '../constant/material'
export function createFish (app, organization) {
  const sprite = new PIXI.Sprite(
    PIXI.Loader.shared.resources.whale.texture
  )
  const fish = new Fish(app, sprite, WHALE)
  fish.positionOut()
  organization
    .addMaterial(fish)
  fish.startMove()
}