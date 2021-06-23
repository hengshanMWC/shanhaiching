import infos from './infos'
import { loaderPromise } from '../utils'
export async function loaderImg () {
  const imgs = infos.map(item => {
    return {
      name: item.textureName,
      url: item.img,
    }
  })
  await loaderPromise(imgs)
}
