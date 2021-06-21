import { ref } from 'vue'
// 是否空闲
export const isIdle = ref(true)
// 空闲模式：是否初始化。true即为游戏结束，init是为了做一个初始化的东西
export const isInit = ref(true)
// 是否胜利
export const isSuccess = ref(false)
// 非空闲（游戏中）：是否暂停
export const isPause = ref(false)
// 游戏时间
export const gameTime = ref(0)