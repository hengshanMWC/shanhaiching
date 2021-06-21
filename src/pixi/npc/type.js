import { getTexture } from '../utils'
export default function createNpc (type) {
  switch (type) {
    case 0:
      return ranYiYu()
    default:
      return ranYiYu()
  }
}
// 冉遗鱼
export async function ranYiYu () {
  const texture = await getTexture('tilapiaFish', require('../../assets/ran-yi-yu.png'))
  return {
    texture,
    healthValue: 50,
    delicious: 1
  }
}
