import * as PIXI from 'pixi.js'
import infos, { ShanhaichingNPCInfo } from './infos'
export interface NPCInfo extends ShanhaichingNPCInfo{
  texture: PIXI.Texture<PIXI.Resource> | undefined;
}
export default function createNpc (index: number): false | NPCInfo {
  if (index >= infos.length) {
    return false
  } else {
    const info = infos[index]
    return {
      ...info,
      texture: PIXI.Loader.shared.resources[info.textureName].texture
    }
  }
}