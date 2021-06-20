import * as PIXI from 'pixi.js'
import { Fish } from '../lib/fish'
import { TILAPIA_FISH } from '../constant/material'
import { getTexture } from '../utils'
import tilapiaFishImage from '../../assets/tilapiaFish .png'
// import { getWhale } from '../myWhale'
import { isIng } from '../reactivity'
export function factoryFish (app, organization) {
  setInterval(() => {
    if (isIng.value) {
      if (Math.random() > 0.5) {
        createFish(app, organization)
        createFish(app, organization)
      } else {
        createFish(app, organization)
      }
    }
  }, 1000)
}
export async function createFish (app, organization) {
  const texture = await getTexture('tilapiaFish', tilapiaFishImage)
  const sprite = new PIXI.Sprite(texture)
  const fish = new Fish(app, sprite, TILAPIA_FISH, Math.random() > 0.5 ? 'r' : 'l')
  fish.positionOut()
  organization
    .addMaterial(fish)
  fish.startMove()
}