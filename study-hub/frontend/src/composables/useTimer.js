import { ref, onUnmounted } from 'vue'

export function useTimer(initialSeconds = 120) {
  const remaining = ref(initialSeconds)
  const running = ref(false)
  let handle = null

  function clear() {
    if (handle) {
      clearInterval(handle)
      handle = null
    }
  }

  function start() {
    if (running.value) return
    running.value = true
    handle = setInterval(() => {
      if (remaining.value <= 0) {
        stop()
        return
      }
      remaining.value -= 1
    }, 1000)
  }

  function stop() {
    running.value = false
    clear()
  }

  function reset(seconds = initialSeconds) {
    stop()
    remaining.value = seconds
  }

  onUnmounted(clear)

  return { remaining, running, start, stop, reset }
}
