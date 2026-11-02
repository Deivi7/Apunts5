import { defineStore } from 'pinia'
import { UI_PREF_KEYS } from '@shared/constants/modes.js'

export const useUiPrefsStore = defineStore('uiPrefs', {
  state: () => ({
    dark: false,
    muted: false,
  }),
  actions: {
    hydrate() {
      this.dark = localStorage.getItem(UI_PREF_KEYS.DARK) === 'true'
      this.muted = localStorage.getItem(UI_PREF_KEYS.MUTED) === 'true'
      this.applyDarkClass()
    },
    toggleDark() {
      this.dark = !this.dark
      localStorage.setItem(UI_PREF_KEYS.DARK, String(this.dark))
      this.applyDarkClass()
    },
    toggleMute() {
      this.muted = !this.muted
      localStorage.setItem(UI_PREF_KEYS.MUTED, String(this.muted))
    },
    applyDarkClass() {
      // Misma convención que el hub legacy
      document.body.classList.toggle('dark-mode', this.dark)
      document.documentElement.classList.toggle('dark', this.dark)
    },
  },
})
