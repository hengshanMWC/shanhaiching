import { ref, computed } from 'vue'
// idle-空闲，ing-游戏中， pause-暂停
export const state = ref('idle')
export const isIdle = computed(() => state.value === 'idle')
export const isIng = computed(() => state.value === 'ing')
export const isPause = computed(() => state.value === 'pause')
export function idleMode () {
  state.value = 'idle'
}
export function ingMode () {
  state.value = 'ing'
}
export function pauseMode () {
  state.value = 'pause'
}