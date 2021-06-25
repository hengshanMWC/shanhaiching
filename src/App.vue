<template>
  <div class="container">
    <div ref="pixiContainer" id="pixi"></div>
    <div class="top-right-box">
      <div class="game-status">
        <div class="game-time">{{gameTime}}</div>
        <div class="game-value">积分：{{gameValue}}</div>
      </div>
      <audio ref="bgm">
        <source src="./assets/audio/bgm.mp3" type="audio/mpeg" loop autoplay>
      </audio>
      <i v-if="isPlay" @click="isPlay = false" class="iconfont icon-bofangyinle"></i>
      <i v-else @click="isPlay = true" class="iconfont icon-guanbiyinle"></i>
      <i class="iconfont icon-a-shezhi"></i>
    </div>
    <div v-if="isIdle || isPause" class="center-box">
      <p v-if="isPlayed" class="end-text">{{ endText }}</p>
      <div v-if="isIdle" @click="handleStart" class="start-btn">山海经</div>
      <div v-else-if="isPause" @click="handleContinue" class="start-btn">继续</div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { getGame } from './pixi'
import {
    isInit,
    isIdle,
    isPause,
    isSuccess,
    isPlayed,
    gameTime,
    gameValue
} from './pixi/reactivity'
export default {
  setup () {
    const isPlay = ref(false)
    const bgm = ref(null)
    watch(isPlay, value => {
      if (value) {
        bgm.value.play()
      } else {
        bgm.value.pause()
      }
    })
    let game
    const pixiContainer = ref(null)
    function handleStart () {
      isIdle.value = false
      isInit.value = false
    }
    function handleContinue () {
      isPause.value = false
    }
    const endText = computed(() => isSuccess.value ? 
      '恭喜你！羽化成鲲！' 
      : '游戏结束，鲸落'
    )
    onMounted(async () => {
      game = getGame()
      await game.init()
      pixiContainer.value.appendChild(game.app.view)
    })
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
      bgm
    }
  }
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
.top-right-box > *{
  margin-right: 15px;
}
.game-time,
.game-value {
  text-align: center;
}
</style>
