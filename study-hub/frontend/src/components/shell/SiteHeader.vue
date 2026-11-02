<template>
  <header class="site-header">
    <div class="header-content">
      <RouterLink to="/" class="brand-badge" style="text-decoration: none; color: inherit;">
        <span class="brand-logo">🎓</span>
        <div style="display: flex; align-items: baseline; gap: 0.4rem;">
          <h1 class="brand-title">Álvaro Study Hub</h1>
          <span class="brand-subtitle">• Portal Vue</span>
        </div>
      </RouterLink>

      <div class="header-actions">
        <a
          class="btn-legacy-hub"
          :href="legacyUrl"
          title="Portal HTML clásico"
        >
          Portal clásico
        </a>
        <div class="score-pill-nav" title="XP de sesión (solo memoria)">
          <span>⭐</span>
          <span>{{ localSession.xp }} XP</span>
        </div>
        <ModeBadge />
        <button
          id="btn-toggle-sound"
          class="btn-icon-header"
          type="button"
          title="Sonidos"
          @click="uiPrefs.toggleMute()"
        >
          {{ uiPrefs.muted ? '🔇' : '🔊' }}
        </button>
        <button
          id="btn-toggle-dark"
          class="btn-icon-header"
          type="button"
          title="Modo Claro/Oscuro"
          @click="uiPrefs.toggleDark()"
        >
          🌓
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ModeBadge from './ModeBadge.vue'
import { useLocalSessionStore } from '@/stores/localSession'
import { useUiPrefsStore } from '@/stores/uiPrefs'
import { legacyHubUrl } from '@/lib/legacyHub.js'

const localSession = useLocalSessionStore()
const uiPrefs = useUiPrefsStore()
const legacyUrl = legacyHubUrl()
</script>
