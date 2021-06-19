import * as PIXI from 'pixi.js'
export const getDocumentHeight = () => document.documentElement.clientHeight
export const getDocumentWidth = () => document.documentElement.clientWidth
export function loaderPromise (...arr) {
  return new Promise(function (resolve) {
    PIXI.Loader.shared
    .add(...arr)
    .load(resolve)
  })
}
export async function getTexture (key, img) {
  const resources = PIXI.Loader.shared.resources
  if (!resources[key]) {
    await loaderPromise(key, img)
  }
  return resources[key].texture
}
export function hitTestRectangle(r1, r2) {
  let combinedHalfWidths, combinedHalfHeights, vx, vy;

  // 获取中点
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  // 获取半径
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  // 两个物体中点的距离
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  // 接触距离
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  // x中点距离 < x接触距离 && y中点距离 < x接触距离
  return Math.abs(vx) < combinedHalfWidths &&
        Math.abs(vy) < combinedHalfHeights
}