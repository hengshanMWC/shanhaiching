<template>
  <div class="diaLogue">
    <div class="diaLogue-box">
      <div class="content">
        <p>{{ text }}</p>
      </div>
      <img v-if="leftImg" class="left-img" :src="leftImg" alt="你" />
      <img v-if="rightImg" class="right-img" :src="rightImg" alt="他" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiaLogue',
  props: {
    leftImg: String,
    rightImg: String,
    text: String,
  },
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.diaLogue {
  position: absolute;
  bottom: 0;
  left: 0;
  .diaLogue-box {
    position: relative;
    width: 100vw;
    background: #eee;
    height: 300px;
  }
}
</style>
