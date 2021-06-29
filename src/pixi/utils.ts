import { Loader, Sprite } from 'pixi.js'
export const getDocumentHeight = (): number =>
  document.documentElement.clientHeight
export const getDocumentWidth = (): number =>
  document.documentElement.clientWidth

// export function loaderPromise (...arr: [Array<{
//   name: string;
//   url: string;
// }>] | [name: string, url: string]) {
//   return new Promise(function (resolve) {
//     Loader.shared
//       .add(...arr)
//       .load(resolve)
//   })
// }
export function getTexture(key: string, img: string) {
  const resources = Loader.shared.resources
  if (!resources[key]?.texture) {
    return new Promise(function (resolve) {
      Loader.shared.add(key, img).load(resolve)
    })
  }
  return resources[key].texture
}
export function hitTestRectangle(r1: Sprite, r2: Sprite) {
  let combinedHalfWidths, combinedHalfHeights, vx, vy
  const obj1 = {
    centerX: 0,
    centerY: 0,
    halfWidth: 0,
    halfHeight: 0,
  }
  const obj2 = {
    centerX: 0,
    centerY: 0,
    halfWidth: 0,
    halfHeight: 0,
  }
  // 获取中点
  obj1.centerX = r1.x + r1.width / 2
  obj1.centerY = r1.y + r1.height / 2
  obj2.centerX = r2.x + r2.width / 2
  obj2.centerY = r2.y + r2.height / 2

  // 获取半径
  obj1.halfWidth = r1.width / 2
  obj1.halfHeight = r1.height / 2
  obj2.halfWidth = r2.width / 2
  obj2.halfHeight = r2.height / 2

  // 两个物体中点的距离
  vx = obj1.centerX - obj2.centerX
  vy = obj1.centerY - obj2.centerY

  // 接触距离
  combinedHalfWidths = obj1.halfWidth + obj2.halfWidth
  combinedHalfHeights = obj1.halfHeight + obj2.halfHeight
  // x中点距离 < x接触距离 && y中点距离 < x接触距离
  return Math.abs(vx) < combinedHalfWidths && Math.abs(vy) < combinedHalfHeights
}
