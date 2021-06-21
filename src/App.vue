<template>
  <div class="container">
    <div ref="pixiContainer" id="pixi"></div>
    <div class="top-right-box">
      <div class="game-status">
        <div class="game-time">{{gameTime}}</div>
        <div class="game-value">积分：{{gameValue}}</div>
      </div>
    </div>
    <div v-if="isIdle" @click="handleStart" class="start-btn">开始</div>
    <div v-else-if="isPause" @click="handleContinue" class="start-btn">继续</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getGame } from './pixi'
import { isIdle, isPause, gameTime, gameValue } from './pixi/reactivity'
export default {
  setup () {
    let game
    const pixiContainer = ref(null)
    function handleStart () {
      gameTime.value = 0
      gameValue.value = 0
      isIdle.value = false
    }
    function handleContinue () {
      isPause.value = false
    }
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
      gameTime,
      gameValue
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
.start-btn {
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 80px;
  font-size: 36px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.top-right-box {
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
}
.game-status {
  margin: 15px;
}
.game-time,
.game-value {
  text-align: center;
}
</style>
