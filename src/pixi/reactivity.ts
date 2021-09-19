import { ref, computed, reactive } from 'vue'
import { Message } from './message'
// 是否空闲
export const isIdle = ref(true)
// 空闲模式：是否初始化。true即为游戏结束，init是为了做一个初始化的东西
export const isInit = ref(true)
// 是否胜利
export const isSuccess = ref(false)
// 非空闲（游戏中）：是否暂停
export const isPause = ref(false)
export const isPlayed =
  // 非初始化 && 空闲
  computed(() => !isInit.value && isIdle.value)
// 游戏时间
export const gameTime = ref(0)
let time: number
export function startGameTime(): void {
  pauseGameTime()
  time = setTimeout(() => {
    gameTime.value += 1
    startGameTime()
  }, 1000)
}
export function pauseGameTime(): void {
  clearTimeout(time)
}
// 游戏积分
export const gameValue = ref(0)
// 玩家数量
export const gamePlayerNumber = ref(1)
// 播放音乐
export const isPlay = ref(false)
const messageObject = {
  text: '',
  leftImg: '',
  rightImg: '',
}
export const store = {
  state: reactive({
    // 对话
    messageObject: messageObject,
    // 签名
    signShow: false,
    signValue: '',
  }),
  setMessageObject(obj: Message): void {
    this.state.messageObject = { ...messageObject, ...obj }
  },
  setSignShow(value = false): void {
    this.state.signShow = value
  },
  setSignValue(value = ''): void {
    this.state.signValue = value
  },
}
