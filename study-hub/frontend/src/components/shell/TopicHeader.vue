<template>
  <header class="top-navbar">
    <div class="nav-left">
      <RouterLink to="/" class="btn-back-hub">← Portal</RouterLink>
      <span class="topic-badge-header">{{ subject.name }}</span>
      <span class="topic-badge-header" style="background: var(--primary-light); color: var(--primary);">
        {{ topic.shortTitle }}
      </span>
    </div>
    <div class="nav-right">
      <a class="btn-legacy-hub" :href="legacyUrl" title="Portal HTML clásico">Portal clásico</a>
      <div class="score-pill-nav" title="XP de sesión (solo memoria)">
        <span>⭐</span>
        <span>{{ localSession.xp }} XP</span>
      </div>
      <ModeBadge />
      <SoundToggle />
      <ThemeToggle />
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import ModeBadge from './ModeBadge.vue'
import ThemeToggle from './ThemeToggle.vue'
import SoundToggle from './SoundToggle.vue'
import { useLocalSessionStore } from '@/stores/localSession'
import { legacyHubUrl } from '@/lib/legacyHub.js'

defineProps({
  subject: { type: Object, required: true },
  topic: { type: Object, required: true },
  sections: { type: Array, default: () => [] },
  activeSection: { type: String, default: '' },
})

const localSession = useLocalSessionStore()
const legacyUrl = legacyHubUrl()
</script>
