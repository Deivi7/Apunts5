<template>
  <div class="infinite-arena">
    <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
      <button
        v-for="m in modes"
        :key="m.id"
        type="button"
        class="ex-btn"
        :class="{ 'ex-btn-primary': mode === m.id }"
        @click="setMode(m.id)"
      >
        {{ m.label }}
      </button>
      <span class="match-hint" style="margin-left: auto;">Racha: {{ streak }} 🔥</span>
    </div>

    <p class="match-hint">{{ instruction }}</p>
    <p style="font-size: 1.35rem; font-weight: 800; text-align: center; margin: 0.75rem 0;">
      {{ displayWord }}
    </p>

    <div id="arena-options-container" style="display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center;">
      <button
        v-for="(opt, idx) in optionButtons"
        :key="idx"
        type="button"
        class="ex-btn"
        :class="optClass(idx, opt)"
        :disabled="locked"
        @click="opt.action()"
      >
        {{ opt.label }}
      </button>
    </div>

    <p v-if="feedback" class="match-hint" :class="lastOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.75rem;">
      {{ feedback }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { DIGRAPH_PAIRS, INFINITE_WORDS, shuffle } from '@/modules/catala/posat_a_prova_1Data.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const modes = [
  { id: 'tonica', label: 'Síl·laba tònica' },
  { id: 'digraf', label: 'Dígrafs' },
  { id: 'concrets', label: 'Concret / abstracte' },
]

const mode = ref('tonica')
const locked = ref(false)
const feedback = ref('')
const lastOk = ref(false)
const streak = ref(0)
const hits = ref(0)
const target = props.exercise?.maxScore || 8

const wordBank = shuffle(INFINITE_WORDS)
let wordIdx = 0
const currentWord = ref(wordBank[0])
const currentDigraf = ref(DIGRAPH_PAIRS[Math.floor(Math.random() * DIGRAPH_PAIRS.length)])
const chosenWrong = ref(-1)

const instruction = computed(() => {
  if (mode.value === 'tonica') return 'Clica la síl·laba tònica (truc del crit):'
  if (mode.value === 'digraf') return 'Aquest dígraf es separa a final de línia?'
  return 'Nom concret (físic) o abstracte (idea / sentiment)?'
})

const displayWord = computed(() => {
  if (mode.value === 'digraf') return currentDigraf.value.pair
  return currentWord.value.word
})

function nextWord() {
  wordIdx = (wordIdx + 1) % wordBank.length
  currentWord.value = wordBank[wordIdx]
}

function nextRound(delay = 900) {
  locked.value = false
  chosenWrong.value = -1
  feedback.value = ''
  if (mode.value === 'digraf') {
    currentDigraf.value = DIGRAPH_PAIRS[Math.floor(Math.random() * DIGRAPH_PAIRS.length)]
  } else {
    nextWord()
  }
  setTimeout(() => {}, delay)
}

function setMode(id) {
  mode.value = id
  nextRound(0)
}

function success(msg) {
  locked.value = true
  lastOk.value = true
  feedback.value = msg
  streak.value += 1
  hits.value += 1
  if (hits.value >= target) {
    emit('complete', {
      score: target,
      _grade: { score: target, maxScore: target, feedback: `Entrenador: ${target} encerts.` },
    })
  }
  setTimeout(nextRound, 900)
}

function fail(msg) {
  locked.value = true
  lastOk.value = false
  feedback.value = msg
  streak.value = 0
  setTimeout(nextRound, 2200)
}

function checkTonica(idx) {
  if (locked.value) return
  if (idx === currentWord.value.tonic) {
    success('Molt bé! +1 encert.')
  } else {
    chosenWrong.value = idx
    fail(`La tònica és «${currentWord.value.syllables[currentWord.value.tonic]}».`)
  }
}

function checkDigraf(sep) {
  if (locked.value) return
  if (sep === currentDigraf.value.sep) success('Exacte!')
  else {
    fail(currentDigraf.value.sep ? 'SÍ es separa (germans barallats).' : 'MAI es separa (millors amics).')
  }
}

function checkType(t) {
  if (locked.value) return
  if (t === currentWord.value.type) success('Molt ben deduït!')
  else fail(`Era ${currentWord.value.type === 'concrets' ? 'concret' : 'abstracte'}.`)
}

const optionButtons = computed(() => {
  if (mode.value === 'tonica') {
    return currentWord.value.syllables.map((s, idx) => ({
      label: s,
      correct: idx === currentWord.value.tonic,
      action: () => checkTonica(idx),
    }))
  }
  if (mode.value === 'digraf') {
    return [
      { label: '✂️ Es separa', correct: currentDigraf.value.sep, action: () => checkDigraf(true) },
      { label: '🤝 Mai es separa', correct: !currentDigraf.value.sep, action: () => checkDigraf(false) },
    ]
  }
  return [
    { label: '🧱 Concret', correct: currentWord.value.type === 'concrets', action: () => checkType('concrets') },
    { label: '💭 Abstracte', correct: currentWord.value.type === 'abstractes', action: () => checkType('abstractes') },
  ]
})

function optClass(idx, opt) {
  if (!locked.value) return ''
  if (opt.correct) return 'ex-btn-primary'
  if (chosenWrong.value === idx) return 'feedback-bad'
  return ''
}
</script>
