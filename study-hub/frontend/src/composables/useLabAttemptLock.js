import { onBeforeUnmount, ref } from 'vue'

/**
 * Evita dobles clic / carrera: tras un acierto no se vuelve a puntuar
 * hasta que arranca el siguiente ítem.
 */
export function useLabAttemptLock() {
  const locked = ref(false)
  let timer = null

  function clear() {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }
  }

  function unlockForNext() {
    locked.value = false
  }

  function lockAfterCorrect(delayMs, onNext) {
    locked.value = true
    clear()
    timer = setTimeout(() => {
      timer = null
      unlockForNext()
      onNext?.()
    }, delayMs)
  }

  function canCheck() {
    return !locked.value
  }

  onBeforeUnmount(clear)

  return { locked, canCheck, unlockForNext, lockAfterCorrect, clearTimer: clear }
}
