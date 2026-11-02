<template>
  <aside class="app-sidebar">
    <div class="sidebar-header">
      <span class="sidebar-topic-label">Navegación</span>
      <div class="sidebar-topic-title">Secciones del tema</div>
      <div class="sidebar-progress-container">
        <div class="sidebar-progress-meta">
          <span>Sesión local</span>
          <span>{{ localSession.xp }} XP</span>
        </div>
        <div class="sidebar-progress-bar">
          <div class="sidebar-progress-fill" :style="{ width: progressWidth }" />
        </div>
      </div>
    </div>

    <nav class="sidebar-nav-list">
      <button
        v-for="(section, idx) in sections"
        :key="section.id"
        type="button"
        class="sidebar-item-btn"
        :class="{ active: section.id === activeSection }"
        @click="emit('select', section.id)"
      >
        <div class="sidebar-btn-left">
          <span class="sidebar-btn-icon" aria-hidden="true">{{ sectionIcon(section, idx) }}</span>
          <div class="sidebar-btn-text">
            <span class="sidebar-btn-title">{{ displayTitle(section, idx) }}</span>
            <span v-if="section.desc" class="sidebar-btn-desc">{{ section.desc }}</span>
          </div>
        </div>
        <span v-if="section.badge" class="sidebar-btn-badge">{{ section.badge }}</span>
      </button>
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useLocalSessionStore } from '@/stores/localSession'

defineProps({
  sections: { type: Array, required: true },
  activeSection: { type: String, required: true },
})

const emit = defineEmits(['select'])
const localSession = useLocalSessionStore()

const progressWidth = computed(() => `${Math.min(100, localSession.xp)}%`)

const ROLE_FALLBACK = {
  theory: '📖',
  interactive: '🎮',
  docs: '📥',
}

function sectionIcon(section, idx) {
  if (section?.icon) return section.icon
  const fromTitle = String(section?.title || '').match(
    /^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)/u,
  )
  if (fromTitle) return fromTitle[1]
  if (section?.role && ROLE_FALLBACK[section.role]) return ROLE_FALLBACK[section.role]
  return String(idx + 1)
}

function displayTitle(section, idx) {
  const raw = String(section?.title || '')
  // Quitar emoji inicial si ya va en el icono (evitar duplicar)
  let cleaned = raw
    .replace(/^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)\s*/u, '')
    .trim()
  // Algunos manifests legacy ponen el título real en desc y el emoji en title
  if (!cleaned) {
    cleaned = String(section?.desc || '')
      .replace(/^(\p{Extended_Pictographic}(?:\uFE0F|\u200D\p{Extended_Pictographic})*)\s*/u, '')
      .trim()
  }
  // Si el título no empieza por número, numerar como el legacy "1. …"
  if (/^\d+[\.\)]\s*/.test(cleaned)) return cleaned
  return cleaned ? `${idx + 1}. ${cleaned}` : `${idx + 1}.`
}
</script>
