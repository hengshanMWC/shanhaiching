import { Loader } from 'pixi.js'
export const getDocumentHeight = () => document.documentElement.clientHeight
export const getDocumentWidth = () => document.documentElement.clientWidth
export function loaderPromise (...arr) {
  return new Promise(function (resolve) {
    Loader.shared
    .add(...arr)
    .load(resolve)
  })
}