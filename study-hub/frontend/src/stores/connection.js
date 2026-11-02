import { defineStore } from 'pinia'
import { CONNECTION_STATUS } from '@shared/constants/modes.js'
import { useSessionModeStore } from './sessionMode'

export const useConnectionStore = defineStore('connection', {
  state: () => ({
    status: CONNECTION_STATUS.CHECKING,
    lastCheckedAt: null,
    message: '',
    droppedFromOnline: false,
    offerLocalContinue: false,
  }),
  getters: {
    isOnline: (s) => s.status === CONNECTION_STATUS.ONLINE,
    isOffline: (s) => s.status === CONNECTION_STATUS.OFFLINE,
  },
  actions: {
    async checkHealth() {
      const session = useSessionModeStore()
      const wasOnlineSession = session.isOnline
      this.status = CONNECTION_STATUS.CHECKING
      try {
        const controller = new AbortController()
        const timer = setTimeout(() => controller.abort(), 2500)
        const res = await fetch('/api/health', { signal: controller.signal })
        clearTimeout(timer)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        this.status = CONNECTION_STATUS.ONLINE
        this.message = data?.status || 'ok'
        this.droppedFromOnline = false
        this.offerLocalContinue = false
      } catch (err) {
        this.status = CONNECTION_STATUS.OFFLINE
        this.message = err?.message || 'offline'
        if (wasOnlineSession) {
          this.droppedFromOnline = true
          this.offerLocalContinue = true
        } else if (session.isOnline) {
          session.setLocal()
        }
      } finally {
        this.lastCheckedAt = new Date().toISOString()
      }
    },
    acceptLocalContinue() {
      const session = useSessionModeStore()
      session.setLocal()
      this.offerLocalContinue = false
      this.droppedFromOnline = false
    },
    dismissLocalOffer() {
      this.offerLocalContinue = false
    },
    startPolling(intervalMs = 20000) {
      if (typeof window === 'undefined') return
      this.checkHealth()
      window.setInterval(() => this.checkHealth(), intervalMs)
      window.addEventListener('online', () => this.checkHealth())
      window.addEventListener('offline', () => {
        this.status = CONNECTION_STATUS.OFFLINE
        this.message = 'navigator.offline'
        const session = useSessionModeStore()
        if (session.isOnline) {
          this.droppedFromOnline = true
          this.offerLocalContinue = true
        }
      })
    },
  },
})
