import { defineStore } from 'pinia'
import { useSessionModeStore } from './sessionMode'

const TOKEN_KEY = 'studyhub_auth_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null,
    user: null,
    loading: false,
    error: null,
  }),
  getters: {
    isAuthenticated: (s) => Boolean(s.token && s.user),
  },
  actions: {
    hydrate() {
      // Token only for online mode convenience; not academic results
      this.token = sessionStorage.getItem(TOKEN_KEY)
    },
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Login fallido')
        this.token = data.token
        this.user = data.user
        sessionStorage.setItem(TOKEN_KEY, data.token)
        useSessionModeStore().setOnline()
        return data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    async fetchMe() {
      if (!this.token) return null
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${this.token}` },
      })
      if (!res.ok) {
        this.logout()
        return null
      }
      const data = await res.json()
      this.user = data.user
      return data.user
    },
    async logout() {
      try {
        if (this.token) {
          await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { Authorization: `Bearer ${this.token}` },
          })
        }
      } catch {
        /* ignore */
      }
      this.token = null
      this.user = null
      sessionStorage.removeItem(TOKEN_KEY)
      useSessionModeStore().setLocal()
    },
  },
})
