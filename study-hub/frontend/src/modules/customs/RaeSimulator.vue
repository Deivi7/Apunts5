<template>
  <div class="rae-simulator" style="margin: 0;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; flex-wrap: wrap; gap: 0.5rem;">
      <span class="badge-pill" style="background: var(--primary); color: white; border: none;">
        🔍 Simulador Interactivo DLE (escolar)
      </span>
      <span style="font-size: 0.85rem; font-weight: 700; color: var(--text-muted);">Palabras de clase</span>
    </div>

    <div class="rae-search-bar">
      <input
        v-model="term"
        type="text"
        class="rae-input"
        placeholder="Buscar palabra (ej. ventana, comer, comí, lápices, cóctel)..."
        @keydown.enter="search"
      >
      <button type="button" class="btn-primary" @click="search">🔎 Consultar</button>
    </div>

    <div class="rae-quick-words">
      <span style="font-size: 0.85rem; font-weight: 700; align-self: center; margin-right: 0.25rem;">Palabras del PDF:</span>
      <button v-for="w in quickWords" :key="w" type="button" class="quick-word-btn" @click="quick(w)">{{ w }}</button>
    </div>

    <div v-if="result" class="rae-result-card" style="margin-top: 1rem;">
      <div class="rae-word-title">{{ result.word }}</div>
      <div class="rae-etymology">{{ result.etymology }}</div>
      <div class="rae-pos-badge">{{ result.pos }}</div>
      <ol class="rae-senses-list">
        <li v-for="(s, i) in result.senses" :key="i" class="rae-sense-item">
          <span class="rae-sense-num">{{ i + 1 }}.</span>
          <span>{{ s }}</span>
        </li>
      </ol>
      <div style="margin-top: 1rem; padding: 0.75rem; background: var(--bg-card); border-radius: var(--radius-md); font-size: 0.85rem; border-left: 3px solid var(--accent-amber);">
        💡 <strong>Análisis Didáctico:</strong> {{ result.notes }}
      </div>
    </div>
    <div v-else-if="missed" class="rae-result-card" style="margin-top: 1rem; border-left-color: var(--accent-amber);">
      <div class="rae-word-title" style="color: var(--accent-amber);">🔍 «{{ missed }}»</div>
      <p style="margin: 0.5rem 0; font-size: 0.95rem;">
        No está en el simulador escolar. Consúltala en el DLE oficial:
      </p>
      <a :href="`https://dle.rae.es/${encodeURIComponent(missed)}`" target="_blank" class="btn-primary" style="margin-top: 0.5rem;">
        🌐 Ver en DLE.RAE.ES
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { DICT_DATABASE } from '@/modules/castellano/comunicacionData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const quickWords = ['ventana', 'comer', 'comí', 'lápices', 'cóctel', 'comunicar']
const term = ref('')
const result = ref(null)
const missed = ref('')
const found = ref(new Set())

function quick(w) {
  term.value = w
  search()
}

function search() {
  const raw = term.value.trim().toLowerCase()
  if (!raw) {
    result.value = null
    missed.value = ''
    return
  }
  const data = DICT_DATABASE[raw]
  if (data) {
    result.value = data
    missed.value = ''
    found.value.add(raw)
    emit('update:modelValue', { term: raw, found: [...found.value] })
    if (found.value.size >= 3) {
      const max = props.exercise?.maxScore || 10
      emit('complete', {
        found: [...found.value],
        _grade: { score: max, maxScore: max, feedback: `Simulador RAE: ${found.value.size} consultas` },
      })
    }
  } else {
    result.value = null
    missed.value = raw
  }
}
</script>
