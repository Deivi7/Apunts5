<template>
  <div class="topic-panel-html vue-panel" v-html="safeHtml" />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  html: { type: String, default: '' },
  contentBase: { type: String, default: '' },
})

/**
 * Contenido didáctico del panel (cuentos, teoría, fichas).
 * Se eliminan scripts y cascarones interactivos legacy;
 * la práctica Vue va en ExercisePlayer debajo.
 */
function sanitizePanelHtml(raw) {
  let html = String(raw || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')

  const base = String(props.contentBase || '').replace(/\/$/, '')
  if (base) {
    html = html
      .replace(/(src|href)=("|'|\s*)(?:\.\/)?img\//gi, `$1=$2${base}/img/`)
      .replace(/(src|href)=("|'|\s*)(?:\.\/)?extracted\//gi, `$1=$2${base}/extracted/`)
  }

  // Contenedores vacíos / inyección JS legacy
  const emptyIds = [
    'cards-container',
    'sentences-workshop-container',
    'sorter-phrase',
    'sorter-buttons',
    'quiz-options',
    'quiz-question',
    'quiz-explanation',
    'alpha-pool',
    'alpha-slots',
    'alpha-exercise-view',
    'memory-board',
    'comm-case-options',
    'dict-challenge-buttons',
    'real-article-options',
    'abbr-game-options',
    'abbr-cards-grid',
    'rae-display-container',
    'datealpie-questions-container',
  ]
  for (const id of emptyIds) {
    html = html.replace(
      new RegExp(`<div[^>]*id="${id}"[^>]*>[\\s\\S]*?<\\/div>`, 'gi'),
      '',
    )
  }

  html = html
    .replace(/<div[^>]*id="[^"]*(?:questions-container|quiz-container|exercise-area)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*class="[^"]*(?:datealpie-q-card|quiz-card)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<button\b[^>]*class="[^"]*(?:choice-btn|btn-check|btn-check-answer|btn-check-exercise|btn-primary|btn-score|btn-secondary|filter-pill|punct-btn|char-btn|quick-word-btn|quiz-option-btn|alpha-tab-btn|alpha-level-btn)[^"]*"[^>]*>[\s\S]*?<\/button>/gi, '')
    .replace(/<div[^>]*class="[^"]*feedback-msg[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/<div[^>]*id="[^"]*(?:score-display|badge-|btn-next-quiz)[^"]*"[^>]*>[\s\S]*?<\/div>/gi, '')
    .replace(/Cargando(?: caso| fragmento| pregunta| ejercicio)?(?:\.\.\.|…)?/gi, '')
    .replace(/<textarea\b[^>]*>[\s\S]*?<\/textarea>/gi, '')
    .replace(/<input\b[^>]*(?:id|class)="[^"]*(?:ws-input|panel-text|mail-|rae-search|abbr-search|card-search)[^"]*"[^>]*>/gi, '')

  return html
}

const safeHtml = computed(() => sanitizePanelHtml(props.html))
</script>

<style>
.topic-panel-html :deep(.section-header) {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}
.topic-panel-html :deep(.section-title) {
  font-family: 'Outfit', sans-serif;
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 0.25rem;
}
.topic-panel-html :deep(.section-subtitle) {
  color: var(--text-muted);
  font-size: 0.9rem;
  margin: 0;
}
.topic-panel-html :deep(a.btn-drive),
.topic-panel-html :deep(.pdf-btn-open),
.topic-panel-html :deep(a.resource-card) {
  text-decoration: none;
}
.topic-panel-html :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: var(--radius-md);
}
</style>
