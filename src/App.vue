<template>
  <div class="container">
    <div ref="pixiContainer" id="pixi"></div>
    <div class="top-right-box">
      <div class="game-status">
        <div class="game-time">{{ gameTime }}</div>
        <div class="game-value">积分：{{ gameValue }}</div>
      </div>
      <audio ref="bgm">
        <source src="./assets/audio/bgm.mp3" type="audio/mpeg" loop autoplay />
      </audio>
      <i v-if="isPlay" @click="bmgPause" class="iconfont icon-bofangyinle"></i>
      <i v-else @click="bmgPlay" class="iconfont icon-guanbiyinle"></i>
      <i class="iconfont icon-a-shezhi"></i>
    </div>
    <div v-if="isIdle || isPause" class="center-box">
      <p v-if="isPlayed" class="end-text">{{ endText }}</p>
      <div v-if="isIdle" @click="handleStart" class="start-btn">山海经</div>
      <div v-else-if="isPause" @click="handleContinue" class="start-btn">
        继续
      </div>
    </div>
    <DiaLogue></DiaLogue>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted, Ref } from 'vue'
import DiaLogue from './components/DiaLogue'
import { getGame } from './pixi'
import {
  isInit,
  isIdle,
  isPause,
  isSuccess,
  isPlayed,
  gameTime,
  gameValue,
} from './pixi/reactivity'
export default {
  components: {
    DiaLogue,
  },
  setup() {
    let game
    const bgm: Ref<HTMLElement> = ref(document.documentElement)
    const pixiContainer: Ref<HTMLElement> = ref(document.documentElement)
    const isPlay = ref(false)
    function handleStart() {
      isIdle.value = false
      isInit.value = false
    }
    function handleContinue() {
      isPause.value = false
    }
    const endText = computed(() =>
      isSuccess.value ? '恭喜你！羽化成鲲！' : '游戏结束，鲸落'
    )
    onMounted(async () => {
      bgm.value.addEventListener('play', () => {
        isPlay.value = true
      })
      bgm.value.addEventListener('pause', () => {
        isPlay.value = false
      })
      game = getGame()
      await game.init()
      pixiContainer.value.appendChild(game.app.view)
    })
    function bmgPlay() {
      ;(bgm.value as HTMLAudioElement).play()
    }
    function bmgPause() {
      ;(bgm.value as HTMLAudioElement).pause()
    }
    return {
      pixiContainer,
      handleStart,
      handleContinue,
      isIdle,
      isPause,
      isSuccess,
      isPlayed,
      gameTime,
      gameValue,
      endText,
      isPlay,
      bgm,
      bmgPlay,
      bmgPause,
    }
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  overflow: hidden;
}
#app {
}
</style>
<style scoped>
.center-box {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.end-text {
  color: #fff;
  font-size: 32px;
  margin-bottom: 20px;
}
.start-btn {
  background: #fff;
  width: 300px;
  height: 80px;
  font-size: 36px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-right-box {
  display: flex;
  align-items: center;
  color: #fff;
  position: absolute;
  top: 15px;
  right: 0;
}
.top-right-box .iconfont {
  font-size: 24px;
  cursor: pointer;
}
.top-right-box > * {
  margin-right: 15px;
}
.game-time,
.game-value {
  text-align: center;
}
</style>
