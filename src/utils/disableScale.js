export default () => {
  window.onload = function () {
    // 阻止双击放大
    let lastTouchEnd = 0
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    document.addEventListener('touchend', function (event) {
      const now = (new Date()).getTime()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    }, false)

    // 阻止双指放大
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
  }
}
