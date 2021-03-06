import { HEALTH_VALUE } from '../constant/index'
export interface ShanhaichingInfo {
  name: string
  introduce: string
  textureName: string
  img: string
}
export interface ShanhaichingNPCInfo extends ShanhaichingInfo {
  healthValue: number
  delicious: number
}
const infos: Array<ShanhaichingInfo> = [
  {
    name: '冉遗鱼',
    introduce:
      '冉遗鱼是古代中国神话中的怪鱼。英鞮山，涴水从这座山发源，然后向北流入陵羊泽。水里有很多冉遗鱼，这种鱼长着鱼身、蛇头，还有六只脚，他的眼睛形状如同马的耳朵，吃了这种鱼可以使人不患梦魇症，还可以防御凶灾。出自《山海经》',
    textureName: 'ran-yi-yu',
    img: require('../../assets/images/ran-yi-yu.png'),
  },
  {
    name: '蛊雕',
    introduce:
      '蛊雕又称纂雕，是一种似鸟非鸟的食人怪兽，样子像雕，头上长角，叫声像婴儿的哭啼声，是古代中国神话传说中的一种怪兽',
    textureName: 'gu-diao',
    img: require('../../assets/images/gu-diao.png'),
  },
  {
    name: '暴鲤龙',
    introduce:
      '体型拥有超过六公尺的巨大身体，性情极为暴躁，抚摸它头上的角可以让它变得温和。可一旦暴动，不烧烬一切凶暴血液就绝不会平静。留有曾经连续一个月暴走的记录，非常凶暴的宝可梦。',
    textureName: 'gyarados',
    img: require('../../assets/images/gyarados.png'),
  },
  {
    name: '穷奇',
    introduce:
      '据说穷奇经常飞到打斗的现场，将有理的一方吃掉，将忠诚的人鼻子咬掉；如果有人犯下恶行，穷奇会捕捉野兽送给他，并且鼓励他多做坏事。古人也把那种不重心意、远君子近小人的人称为穷奇。',
    textureName: 'qiong-qi',
    img: require('../../assets/images/qiong-qi.png'),
  },
  {
    name: '刑天',
    introduce:
      '刑天，是中国远古神话传说人物，手使一柄巨斧和盾牌，身强力壮，体型巨大的上古巨人，炎帝手下大将，和黄帝争位，被斩去头颅，失了首级后，以双乳为眼，肚脐为口，再战黄帝。',
    textureName: 'xing-tian',
    img: require('../../assets/images/xing-tian.png'),
  },
]
const shanhaichingNPCInfo: Array<ShanhaichingNPCInfo> = infos.map(
  (info, index) => {
    return {
      ...info,
      healthValue: index * 0.6 * HEALTH_VALUE + HEALTH_VALUE,
      delicious: index * 0.1 + 0.5,
    }
  }
)
export default shanhaichingNPCInfo
export const bossInfo: ShanhaichingNPCInfo = {
  name: '犼',
  introduce:
    '体型拥有超过六公尺的巨大身体，性情极为暴躁，抚摸它头上的角可以让它变得温和。可一旦暴动，不烧烬一切凶暴血液就绝不会平静。留有曾经连续一个月暴走的记录，非常凶暴的宝可梦。',
  textureName: 'hou',
  img: require('../../assets/images/hou.png'),
  healthValue: infos.length * HEALTH_VALUE,
  delicious: infos.length,
}
