import * as PIXI from 'pixi.js'
import { isIdle, isSuccess } from '../reactivity'
import infos from './infos'
export default function createNpc (index) {
  if (index >= infos.length ) {
    isIdle.value = true
    isSuccess.value = true
    return false
  } else {
    const info = infos[index]
    return {
      ...info,
      texture: PIXI.Loader.shared.resources[info.textureName].texture
    }
  }
}