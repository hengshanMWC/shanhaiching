import { ref, computed } from 'vue'
// 是否空闲
export const isIdle = ref(true)
// 空闲模式：是否初始化。true即为游戏结束，init是为了做一个初始化的东西
export const isInit = ref(true)
// 是否胜利
export const isSuccess = ref(false)
// 非空闲（游戏中）：是否暂停
export const isPause = ref(false)
export const isPlayed 
  // 非初始化 && 空闲
  = computed(() => !isInit.value && isIdle.value)
// 游戏时间
export const gameTime = ref(0)
let time
export function startGameTime () {
  pauseGameTime()
  time = setTimeout(() => {
    gameTime.value += 1
    startGameTime()
  }, 1000)
}
export function pauseGameTime () {
  clearTimeout(time)
}
// 游戏积分
export const gameValue = ref(0)