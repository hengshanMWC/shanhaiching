import { getTexture } from '../utils'
export default function createNpc (type) {
  switch (type) {
    case 0:
      return ranYiYu()
    case 1:
      return guDiao()
    case 2:
      return gyarados()
    case 3:
      return qiongQi()
    case 4:
      return xingTian()
    default:
      return ranYiYu()
  }
}
// 冉遗鱼
export async function ranYiYu () {
  const texture = await getTexture('../../assets/ran-yi-yu.png', require('../../assets/ran-yi-yu.png'))
  return {
    texture,
    healthValue: 50,
    delicious: 1
  }
}
// 蛊雕
export async function guDiao () {
  const texture = await getTexture('../../assets/gu-diao.png', require('../../assets/gu-diao.png'))
  return {
    texture,
    healthValue: 80,
    delicious: 2
  }
}
// 暴鲤龙
export async function gyarados () {
  const texture = await getTexture('../../assets/gyarados.png', require('../../assets/gyarados.png'))
  return {
    texture,
    healthValue: 120,
    delicious: 3
  }
}
// 穷奇
export async function qiongQi () {
  const texture = await getTexture('../../assets/qiong-qi.png', require('../../assets/qiong-qi.png'))
  return {
    texture,
    healthValue: 180,
    delicious: 4
  }
}
// 刑天
export async function xingTian () {
  const texture = await getTexture('../../assets/xing-tian.png', require('../../assets/xing-tian.png'))
  return {
    texture,
    healthValue: 270,
    delicious: 5
  }
}

