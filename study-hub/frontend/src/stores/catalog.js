import { defineStore } from 'pinia'
import { parseCatalog } from '@shared/schemas/catalog.js'
import catalogJson from '@content/catalog/subjects.json'
import { cacheCatalogSnapshot, readCachedCatalog } from '@/offline/contentCache'

export const useCatalogStore = defineStore('catalog', {
  state: () => ({
    version: '',
    subjects: [],
    loaded: false,
    error: null,
    source: 'none',
  }),
  getters: {
    topicCount: (s) => s.subjects.reduce((acc, sub) => acc + (sub.topics?.length || 0), 0),
    getSubject: (s) => (id) => s.subjects.find((x) => x.id === id),
    getTopic: (s) => (subjectId, topicId) => {
      const subject = s.subjects.find((x) => x.id === subjectId)
      if (!subject) return null
      const topic = subject.topics.find((t) => t.id === topicId)
      if (!topic) return null
      return { subject, topic }
    },
  },
  actions: {
    applyCatalog(parsed, source) {
      this.version = parsed.version
      this.subjects = parsed.subjects
      this.loaded = true
      this.error = null
      this.source = source
    },
    async load() {
      try {
        const parsed = parseCatalog(catalogJson)
        this.applyCatalog(parsed, 'static-package')
        try {
          await cacheCatalogSnapshot(parsed)
        } catch (cacheErr) {
          console.warn('[catalog] no se pudo cachear en IndexedDB', cacheErr)
        }
      } catch (err) {
        try {
          const cached = await readCachedCatalog()
          if (cached?.subjects) {
            this.applyCatalog(
              { version: cached.version || 'cached', subjects: cached.subjects },
              'indexeddb-cache',
            )
            return
          }
        } catch {
          /* ignore */
        }
        this.error = err?.message || String(err)
        this.loaded = false
        this.source = 'none'
      }
    },
  },
})
