<template>
  <div class="container">
    <div ref="pixiContainer" id="pixi"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { createPixiApp } from './pixi'
export default {
  setup () {
    const pixiContainer = ref(null)
    onMounted(async () => {
      const app = await createPixiApp()
      pixiContainer.value.appendChild(app.view)
    })
    return {
      pixiContainer
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
