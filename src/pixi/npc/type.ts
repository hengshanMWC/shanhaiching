import * as PIXI from 'pixi.js'
import infos from './infos'
export default function createNpc (index) {
  if (index >= infos.length ) {
    return false
  } else {
    const info = infos[index]
    return {
      ...info,
      texture: PIXI.Loader.shared.resources[info.textureName].texture
    }
  }
}