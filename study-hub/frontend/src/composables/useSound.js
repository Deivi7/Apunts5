import { useUiPrefsStore } from '@/stores/uiPrefs'

let audioCtx = null

function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  return audioCtx
}

export function useSound() {
  function play(type = 'correct') {
    const prefs = useUiPrefsStore()
    if (prefs.muted) return
    try {
      const ctx = getCtx()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)
      if (type === 'correct') {
        osc.frequency.setValueAtTime(523.25, ctx.currentTime)
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3)
      } else {
        osc.frequency.setValueAtTime(200, ctx.currentTime)
        gain.gain.setValueAtTime(0.08, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.25)
      }
      osc.start()
      osc.stop(ctx.currentTime + 0.35)
    } catch {
      /* audio unavailable */
    }
  }

  return { play }
}
