<template>
  <div class="flashcards-lab">
    <div class="flashcards-toolbar">
      <div class="search-box" style="flex: 1; min-width: 200px;">
        <span class="search-icon">🔍</span>
        <input
          v-model="search"
          type="search"
          class="search-input"
          :placeholder="searchPlaceholder"
          autocomplete="off"
        >
      </div>
      <p class="ex-meta" style="margin: 0;">
        {{ filtered.length }} / {{ cards.length }} · Dominadas: {{ masteredCount }}
      </p>
    </div>

    <div v-if="filters.length" class="filter-group">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="filter-pill"
        :class="{ active: category === f.id }"
        @click="category = f.id"
      >
        {{ f.label }}
      </button>
    </div>

    <div v-if="!filtered.length" style="text-align: center; padding: 2.5rem; color: var(--text-muted);">
      <div style="font-size: 2.5rem; margin-bottom: 0.35rem;">🔍</div>
      <p style="font-weight: 700; margin: 0;">No hay tarjetas con ese criterio.</p>
    </div>

    <div v-else class="cards-grid">
      <div
        v-for="card in filtered"
        :key="cardKey(card)"
        class="card-wrapper"
        :class="{ flipped: !!flipped[cardKey(card)] }"
        @click="onCardClick($event, card)"
      >
        <div class="card-inner">
          <div class="card-face card-front" :class="card.category ? `cat-${card.category}` : ''">
            <div class="card-top-row">
              <span class="category-tag">{{ card.categoryName || card.category || 'Tarjeta' }}</span>
              <button type="button" class="audio-btn" title="Escuchar" @click.stop="speak(card)">🔊</button>
            </div>
            <div v-if="frontSymbol(card)" class="card-visual-symbol">{{ frontSymbol(card) }}</div>
            <div v-else-if="card.icon" class="card-visual-icon">{{ card.icon }}</div>
            <div>
              <h3 class="card-term">{{ card.term }}</h3>
              <div v-if="card.phonetic" class="card-phonetic">{{ card.phonetic }}</div>
            </div>
            <div class="card-hint-click">
              <span>👆 {{ flipHint }}</span>
            </div>
          </div>

          <div class="card-face card-back">
            <div class="card-back-title">
              <span>{{ card.translation || card.term }}</span>
              <button type="button" class="audio-btn" title="Escuchar" @click.stop="speak(card)">🔊</button>
            </div>
            <div class="card-back-def">{{ card.definition }}</div>
            <div v-if="card.tip" class="card-back-tip">💡 <strong>{{ tipLabel }}:</strong> {{ card.tip }}</div>
            <div v-if="card.example" class="card-back-ex">«{{ card.example }}»</div>
            <button
              type="button"
              class="mastered-btn"
              :class="{ active: !!mastered[cardKey(card)] }"
              @click.stop="toggleMastered(card)"
            >
              {{ mastered[cardKey(card)] ? '✓ Dominada' : 'Marcar como dominada' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { speakText, warmSpeechVoices } from '@/composables/useSpeech'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

onMounted(() => warmSpeechVoices())

const cards = computed(() => props.exercise?.content?.cards || [])
const lang = computed(() => props.exercise?.config?.lang || props.exercise?.content?.lang || 'es-ES')
const searchPlaceholder = computed(
  () => props.exercise?.content?.searchPlaceholder || 'Buscar tarjeta…',
)
const flipHint = computed(
  () => props.exercise?.content?.flipHint || 'Toca para voltear',
)
const tipLabel = computed(
  () => props.exercise?.content?.tipLabel || 'Clave',
)

const search = ref('')
const category = ref('all')
const flipped = ref({})
const mastered = ref({})
const masteredCount = computed(() => Object.keys(mastered.value).filter((k) => mastered.value[k]).length)

const filters = computed(() => {
  const custom = props.exercise?.content?.filters
  if (custom?.length) return custom
  const cats = new Map()
  for (const c of cards.value) {
    if (!c.category) continue
    const id = c.category
    const label = c.categoryName || id
    cats.set(id, (cats.get(id) || { id, label, count: 0 }))
    cats.get(id).count += 1
  }
  if (!cats.size) return []
  const list = [...cats.values()].map((c) => ({
    id: c.id,
    label: `${c.label} (${c.count})`,
  }))
  return [{ id: 'all', label: `✨ Todas (${cards.value.length})` }, ...list]
})

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  return cards.value.filter((c) => {
    const matchCat = category.value === 'all' || c.category === category.value
    if (!matchCat) return false
    if (!q) return true
    return [c.term, c.definition, c.translation, c.tip, c.example, c.phonetic]
      .filter(Boolean)
      .some((t) => String(t).toLowerCase().includes(q))
  })
})

watch(
  () => props.exercise?.id,
  () => {
    search.value = ''
    category.value = 'all'
    flipped.value = {}
    mastered.value = {}
  },
)

function cardKey(card) {
  return card.id || card.term
}

function frontSymbol(card) {
  return card.symbol || ''
}

function onCardClick(e, card) {
  if (e.target.closest('button')) return
  const key = cardKey(card)
  flipped.value = { ...flipped.value, [key]: !flipped.value[key] }
}

function speak(card) {
  const text = card.speak || card.term
  speakText(text, {
    lang: lang.value,
    rate: lang.value.startsWith('en') ? 0.88 : 0.95,
  })
}

function sync() {
  const keys = Object.keys(mastered.value).filter((k) => mastered.value[k])
  emit('update:modelValue', {
    mastered: keys,
    known: keys.length,
  })
}

function toggleMastered(card) {
  const key = cardKey(card)
  mastered.value = { ...mastered.value, [key]: !mastered.value[key] }
  sync()
  const total = Math.max(cards.value.length, 1)
  if (masteredCount.value >= total) {
    const max = props.exercise?.maxScore || total
    emit('complete', {
      mastered: Object.keys(mastered.value).filter((k) => mastered.value[k]),
      _grade: {
        score: max,
        maxScore: max,
        feedback: `¡Dominaste las ${total} tarjetas!`,
      },
    })
  }
}
</script>

<style scoped>
.flashcards-lab {
  display: grid;
  gap: 1rem;
}
.flashcards-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
  justify-content: space-between;
}
.flashcards-lab :deep(.search-box) {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  background: var(--bg-main);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full, 999px);
  padding: 0.35rem 0.85rem;
}
.flashcards-lab :deep(.search-input) {
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
  font: inherit;
  color: var(--text-main);
}
</style>
