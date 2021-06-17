<template>
  <div class="container">
    <div ref="pixiContainer" id="pixi"></div>
    <div v-if="!start" @click="handleStart" class="start-btn">开始</div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { createPixiApp } from './pixi'
export default {
  setup () {
    const pixiContainer = ref(null)
    const start = ref(false)
    function handleStart () {
      start.value = true
    }
    onMounted(async () => {
      const app = await createPixiApp()
      pixiContainer.value.appendChild(app.view)
    })
    return {
      pixiContainer,
      start,
      handleStart
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
<style lang="scss" scoped>
.start-btn {
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
</style>
