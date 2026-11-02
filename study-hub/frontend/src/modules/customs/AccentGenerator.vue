<template>
  <div class="accent-gen">
    <div class="accent-gen-toolbar">
      <span class="accent-gen-meta">Encerts: {{ correctCount }} / {{ targetCorrect }}</span>
      <button type="button" class="ex-btn" @click="pickRandom">🎲 Nova paraula</button>
    </div>

    <p v-if="current" class="ex-prompt" style="margin: 0;">
      Escriu la paraula amb l'accent correcte (si cal):
      <strong style="color: var(--primary);">{{ current.mot }}</strong>
    </p>

    <div class="accent-input-row">
      <input
        ref="inputEl"
        v-model="answer"
        type="text"
        class="input-hub"
        placeholder="Escriu amb accent si cal…"
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
        {{ ch === '·' ? '· (punt volat)' : ch }}
      </button>
    </div>

    <p v-if="feedback" class="feedback-msg" :class="lastOk ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { ACCENT_KEYBOARD, ENXANETA44, normalizeText, shuffle } from '@/modules/catala/tema2Data.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const bank = computed(() => props.exercise?.content?.items || ENXANETA44)
const keyboard = ACCENT_KEYBOARD
const inputEl = ref(null)
const queue = ref([])
const current = ref(null)
const answer = ref('')
const feedback = ref('')
const lastOk = ref(false)
const correctCount = ref(0)

const targetCorrect = computed(() => {
  const max = props.exercise?.maxScore || 8
  return Math.min(max, bank.value.length)
})

function refillQueue() {
  queue.value = shuffle(bank.value)
}

function pickRandom() {
  if (!queue.value.length) refillQueue()
  current.value = queue.value.pop() || bank.value[0]
  answer.value = ''
  feedback.value = ''
  lastOk.value = false
  inputEl.value?.focus()
  emit('update:modelValue', { mot: current.value?.mot, correctCount: correctCount.value })
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
    feedback.value = `🎉 Molt bé! (${current.value.sol}). ${current.value.hint}`
    const max = props.exercise?.maxScore || targetCorrect.value
    const score = Math.min(max, correctCount.value)
    emit('update:modelValue', { correctCount: correctCount.value, score, last: current.value.num })
    if (correctCount.value >= targetCorrect.value) {
      emit('complete', {
        correctCount: correctCount.value,
        _grade: {
          score,
          maxScore: max,
          feedback: `${correctCount.value} paraules accentuades correctament.`,
        },
      })
      return
    }
    setTimeout(() => pickRandom(), 700)
  } else {
    feedback.value = `❌ Revisa-ho. La resposta correcta és «${current.value.sol}». (${current.value.hint})`
  }
}

onMounted(() => {
  refillQueue()
  pickRandom()
})
</script>

<style scoped>
.accent-gen { display: grid; gap: 0.85rem; max-width: 640px; }
.accent-gen-toolbar { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; justify-content: space-between; }
.accent-gen-meta { font-size: 0.85rem; font-weight: 800; color: var(--primary); }
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
.accent-key:hover { border-color: var(--primary); color: var(--primary); }
</style>
