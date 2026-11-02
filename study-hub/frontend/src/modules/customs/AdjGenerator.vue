<template>
  <div class="adj-gen">
    <div class="adj-gen-modes">
      <button
        type="button"
        class="mode-pill"
        :class="{ on: mode === 'fem' }"
        @click="setMode('fem')"
      >
        Femení (Enxaneta 17)
      </button>
      <button
        type="button"
        class="mode-pill"
        :class="{ on: mode === 'plural' }"
        @click="setMode('plural')"
      >
        Plural (Enxaneta 99)
      </button>
      <span class="adj-gen-meta">Encerts: {{ correctCount }} / {{ targetCorrect }}</span>
      <button type="button" class="ex-btn" @click="pickRandom">🎲 Nou repte</button>
    </div>

    <template v-if="current && mode === 'fem'">
      <p class="ex-prompt" style="margin: 0;">
        {{ current.base }} → {{ current.prompt }}
        <span style="color: var(--primary); font-weight: 800;">…</span>
      </p>
      <p class="match-hint" style="margin: 0;">Escriu només la forma de l'adjectiu en femení.</p>
    </template>
    <template v-else-if="current">
      <p class="ex-prompt" style="margin: 0;">
        Singular: <strong>{{ current.sing }}</strong>
      </p>
      <p class="match-hint" style="margin: 0;">Escriu el sintagma complet en plural.</p>
    </template>

    <div class="accent-input-row">
      <input
        ref="inputEl"
        v-model="answer"
        type="text"
        class="input-hub"
        :placeholder="mode === 'fem' ? 'Escriu el femení…' : 'Plural complet…'"
        autocomplete="off"
        @keydown.enter.prevent="check"
      >
      <button type="button" class="ex-btn ex-btn-primary" @click="check">Comprova</button>
    </div>

    <div class="accent-keyboard">
      <button
        v-for="ch in keyboard"
        :key="ch"
        type="button"
        class="accent-key"
        @click="insertChar(ch)"
      >
        {{ ch === '·' ? '·' : ch }}
      </button>
    </div>

    <p v-if="feedback" class="feedback-msg" :class="lastOk ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import {
  ACCENT_KEYBOARD,
  ADJ_FEM_DATA,
  ADJ_PLURAL_DATA,
  normalizeText,
  shuffle,
} from '@/modules/catala/tema2Data.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const initialMode = props.exercise?.content?.mode || 'fem'
const mode = ref(initialMode === 'plural' ? 'plural' : 'fem')
const keyboard = ACCENT_KEYBOARD

const femBank = computed(() => props.exercise?.content?.femItems || ADJ_FEM_DATA)
const pluralBank = computed(() => props.exercise?.content?.pluralItems || ADJ_PLURAL_DATA)
const activeBank = computed(() => (mode.value === 'fem' ? femBank.value : pluralBank.value))

const inputEl = ref(null)
const queue = ref([])
const current = ref(null)
const answer = ref('')
const feedback = ref('')
const lastOk = ref(false)
const correctCount = ref(0)

const targetCorrect = computed(() => {
  const max = props.exercise?.maxScore || 6
  return Math.min(max, activeBank.value.length)
})

function refillQueue() {
  queue.value = shuffle(activeBank.value)
}

function setMode(next) {
  if (mode.value === next) return
  mode.value = next
  correctCount.value = 0
  feedback.value = ''
  refillQueue()
  pickRandom()
}

function pickRandom() {
  if (!queue.value.length) refillQueue()
  current.value = queue.value.pop() || activeBank.value[0]
  answer.value = ''
  feedback.value = ''
  lastOk.value = false
  inputEl.value?.focus()
  emit('update:modelValue', { mode: mode.value, correctCount: correctCount.value })
}

function insertChar(ch) {
  const el = inputEl.value
  if (!el) {
    answer.value += ch
    return
  }
  const start = el.selectionStart ?? answer.value.length
  const end = el.selectionEnd ?? answer.value.length
  answer.value = answer.value.slice(0, start) + ch + answer.value.slice(end)
  el.focus()
  const pos = start + ch.length
  requestAnimationFrame(() => el.setSelectionRange(pos, pos))
}

function check() {
  if (!current.value) return
  const expected = normalizeText(current.value.sol)
  const val = normalizeText(answer.value)
  lastOk.value = val === expected
  if (lastOk.value) {
    correctCount.value += 1
    feedback.value = `🎉 Correcte! «${current.value.sol}». (${current.value.tip})`
    const max = props.exercise?.maxScore || targetCorrect.value
    const score = Math.min(max, correctCount.value)
    emit('update:modelValue', { mode: mode.value, correctCount: correctCount.value, score })
    if (correctCount.value >= targetCorrect.value) {
      emit('complete', {
        _grade: {
          score,
          maxScore: max,
          feedback: `${correctCount.value} formes correctes (${mode.value === 'fem' ? 'femení' : 'plural'}).`,
        },
      })
      return
    }
    setTimeout(() => pickRandom(), 700)
  } else {
    feedback.value = `❌ Error. La forma correcta és «${current.value.sol}». (${current.value.tip})`
  }
}

watch(
  () => props.exercise?.id,
  () => {
    mode.value = props.exercise?.content?.mode === 'plural' ? 'plural' : 'fem'
    correctCount.value = 0
    refillQueue()
    pickRandom()
  },
)

onMounted(() => {
  refillQueue()
  pickRandom()
})
</script>

<style scoped>
.adj-gen { display: grid; gap: 0.85rem; max-width: 640px; }
.adj-gen-modes { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.mode-pill {
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  border-radius: 999px;
  padding: 0.28rem 0.65rem;
  font-weight: 800;
  font-size: 0.78rem;
  cursor: pointer;
  font-family: inherit;
}
.mode-pill.on { background: var(--primary); color: #fff; border-color: var(--primary); }
.adj-gen-meta { font-size: 0.85rem; font-weight: 800; color: var(--primary); margin-left: auto; }
.accent-input-row { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.accent-input-row .input-hub { flex: 1; min-width: 180px; }
.accent-keyboard { display: flex; flex-wrap: wrap; gap: 0.35rem; }
.accent-key {
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  border-radius: var(--radius-sm);
  padding: 0.35rem 0.55rem;
  font-weight: 800;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.9rem;
}
</style>
