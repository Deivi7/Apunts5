import { UI_PREF_KEYS } from '@shared/constants/modes.js'

/** Keys that may be written to localStorage */
export const ALLOWED_LOCAL_STORAGE_KEYS = Object.freeze([
  UI_PREF_KEYS.DARK,
  UI_PREF_KEYS.MUTED,
  // sessionStorage se usa para token online; localStorage académico sigue prohibido
])

const FORBIDDEN_KEY_PATTERNS = [
  /xp/i,
  /streak/i,
  /progress/i,
  /attempt/i,
  /score/i,
  /grade/i,
  /answer/i,
  /result/i,
  /mastered/i,
  /solved/i,
  /draft/i,
]

export function isAllowedLocalStorageKey(key) {
  return ALLOWED_LOCAL_STORAGE_KEYS.includes(key)
}

export function isForbiddenAcademicKey(key) {
  return FORBIDDEN_KEY_PATTERNS.some((re) => re.test(String(key || '')))
}

/**
 * Install a runtime guard that blocks academic persistence in local mode.
 * Preferencias UI permitidas pasan; el resto se bloquea con warning.
 */
export function installLocalPersistenceGuard({ isLocalMode }) {
  if (typeof window === 'undefined' || !window.localStorage) return () => {}

  const originalSetItem = window.localStorage.setItem.bind(window.localStorage)

  window.localStorage.setItem = (key, value) => {
    const local = typeof isLocalMode === 'function' ? isLocalMode() : true
    if (local && isForbiddenAcademicKey(key) && !isAllowedLocalStorageKey(key)) {
      console.warn(`[study-hub] Bloqueado localStorage académico en modo local: ${key}`)
      return
    }
    if (local && !isAllowedLocalStorageKey(key) && isForbiddenAcademicKey(key)) {
      console.warn(`[study-hub] Bloqueado localStorage no permitido: ${key}`)
      return
    }
    // En modo local solo prefs UI conocidas (y claves no académicas de terceros se dejan)
    if (local && isForbiddenAcademicKey(key)) return
    return originalSetItem(key, value)
  }

  return () => {
    window.localStorage.setItem = originalSetItem
  }
}

/** Pure helper for tests: simulate whether a write would be blocked */
export function wouldBlockLocalWrite(key, isLocal = true) {
  if (!isLocal) return false
  if (isAllowedLocalStorageKey(key)) return false
  return isForbiddenAcademicKey(key)
}
