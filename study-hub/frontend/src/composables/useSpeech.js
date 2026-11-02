/**
 * TTS fiable: en Chrome/Edge, cancel() + speak() inmediato recorta el inicio.
 * Retrasa el speak y elige una voz compatible con el idioma.
 */
let speakTimer = null

function pickVoice(lang) {
  if (!window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices() || []
  if (!voices.length) return null
  const base = String(lang || 'es-ES').toLowerCase()
  const short = base.slice(0, 2)
  return (
    voices.find((v) => v.lang?.toLowerCase() === base)
    || voices.find((v) => v.lang?.toLowerCase().startsWith(short))
    || voices.find((v) => v.lang?.toLowerCase().includes(short))
    || null
  )
}

export function speakText(text, { lang = 'es-ES', rate = 0.92, pitch = 1 } = {}) {
  if (!window.speechSynthesis || !text) return
  const utterText = String(text).trim()
  if (!utterText) return

  if (speakTimer) clearTimeout(speakTimer)
  window.speechSynthesis.cancel()

  // Chrome a veces deja el motor en pause tras cancel
  try {
    window.speechSynthesis.resume()
  } catch {
    /* ignore */
  }

  speakTimer = setTimeout(() => {
    const utter = new SpeechSynthesisUtterance(utterText)
    utter.lang = lang
    utter.rate = rate
    utter.pitch = pitch
    const voice = pickVoice(lang)
    if (voice) {
      utter.voice = voice
      utter.lang = voice.lang || lang
    }
    window.speechSynthesis.speak(utter)
  }, 80)
}

/** Precarga voces (Chrome las carga async). */
export function warmSpeechVoices() {
  if (!window.speechSynthesis) return
  window.speechSynthesis.getVoices()
  window.speechSynthesis.addEventListener?.('voiceschanged', () => {
    window.speechSynthesis.getVoices()
  }, { once: true })
}
