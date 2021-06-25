export default [
  {
    time: 0,
    handler (next) {
      next()
    },
    pause () {
      this.time()
    }
  }
]