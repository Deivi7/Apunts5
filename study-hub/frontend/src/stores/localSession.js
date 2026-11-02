import { defineStore } from 'pinia'

/**
 * Academic session state — MEMORY ONLY.
 * Never write XP / scores / answers to localStorage, IndexedDB or cookies.
 */
export const useLocalSessionStore = defineStore('localSession', {
  state: () => ({
    xp: 0,
    streak: 0,
    completedExerciseIds: [],
    lastFeedback: '',
  }),
  actions: {
    addXp(amount) {
      const n = Number(amount) || 0
      if (n <= 0) return
      this.xp += n
      this.streak += 1
    },
    resetStreak() {
      this.streak = 0
    },
    markCompleted(exerciseId) {
      if (!this.completedExerciseIds.includes(exerciseId)) {
        this.completedExerciseIds.push(exerciseId)
      }
    },
    setFeedback(text) {
      this.lastFeedback = text || ''
    },
    resetSession() {
      this.xp = 0
      this.streak = 0
      this.completedExerciseIds = []
      this.lastFeedback = ''
    },
  },
})
