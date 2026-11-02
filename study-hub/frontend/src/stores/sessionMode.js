import { defineStore } from 'pinia'
import { SESSION_MODES } from '@shared/constants/modes.js'

export const useSessionModeStore = defineStore('sessionMode', {
  state: () => ({
    mode: SESSION_MODES.LOCAL,
  }),
  getters: {
    isLocal: (s) => s.mode === SESSION_MODES.LOCAL,
    isOnline: (s) => s.mode === SESSION_MODES.ONLINE,
  },
  actions: {
    setLocal() {
      this.mode = SESSION_MODES.LOCAL
    },
    setOnline() {
      this.mode = SESSION_MODES.ONLINE
    },
  },
})
