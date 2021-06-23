import { getTexture } from '../utils'
import { HEALTH_VALUE } from '../constant/index'
import { isIdle, isSuccess } from '../reactivity'
export default async function createNpc (index) {
  if (index >= types.length ) {
    isIdle.value = true
    isSuccess.value = true
    return false
  } else {
    const npc =  await types[index]()
    return npc
  }
}
const types = [
  // 冉遗鱼
  async function ranYiYu () {
    const texture = await getTexture('../../assets/ran-yi-yu.png', require('../../assets/ran-yi-yu.png'))
    return {
      texture,
      healthValue: HEALTH_VALUE,
      delicious: 1
    }
  },
  // 蛊雕
  async function guDiao () {
    const texture = await getTexture('../../assets/gu-diao.png', require('../../assets/gu-diao.png'))
    return {
      texture,
      healthValue: 80,
      delicious: 1.5
    }
  },
  // 暴鲤龙
  async function gyarados () {
    const texture = await getTexture('../../assets/gyarados.png', require('../../assets/gyarados.png'))
    return {
      texture,
      healthValue: 120,
      delicious: 2
    }
  },
  // 穷奇
  async function qiongQi () {
    const texture = await getTexture('../../assets/qiong-qi.png', require('../../assets/qiong-qi.png'))
    return {
      texture,
      healthValue: 180,
      delicious: 2.5
    }
  },
  // 刑天
  async function xingTian () {
    const texture = await getTexture('../../assets/xing-tian.png', require('../../assets/xing-tian.png'))
    return {
      texture,
      healthValue: 270,
      delicious: 3
    }
  }
]

