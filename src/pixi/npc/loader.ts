import { Loader } from 'pixi.js'
import infos from './infos'
// import { loaderPromise } from '../utils'
export function loaderImg() {
  const imgs = infos.map(item => {
    return {
      name: item.textureName,
      url: item.img,
    }
  })
  return new Promise(function (resolve) {
    Loader.shared.add(imgs).load(resolve)
  })
}
