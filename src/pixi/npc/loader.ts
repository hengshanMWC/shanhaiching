import { Loader } from 'pixi.js'
import infos, { bossInfo } from './infos'
// import { loaderPromise } from '../utils'
export function loaderImg(): Promise<unknown[]> {
  const imgs = infos.map(item => {
    return {
      name: item.textureName,
      url: item.img,
    }
  })
  imgs.push({
    name: bossInfo.name,
    url: bossInfo.img,
  })
  return new Promise(function (resolve) {
    Loader.shared.add(imgs).load(resolve)
  })
}
