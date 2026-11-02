<template>
  <div class="alpha-lab-card" style="margin: 0; box-shadow: none; border: none; padding: 0;">
    <div style="display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
      <div>
        <h3 style="margin: 0; font-size: 1.15rem;">{{ title }}</h3>
        <p class="match-hint" style="margin: 0.25rem 0 0;">
          {{ finished ? 'Ronda acabada' : `Pregunta ${index + 1}/${questions.length}` }}
          · Aciertos: {{ hits }} · Tiempo: {{ remaining }}s
        </p>
      </div>
      <button type="button" class="ex-btn" @click="restart">🔄 Reiniciar</button>
    </div>

    <div v-if="!started && !finished" style="text-align: center; padding: 1.5rem 0;">
      <p class="match-hint">{{ seconds }} segundos · {{ questions.length }} preguntas</p>
      <button type="button" class="ex-btn ex-btn-primary" @click="start">▶️ Empezar</button>
    </div>

    <template v-else-if="!finished">
      <p style="font-size: 1.1rem; font-weight: 700; margin: 0 0 0.85rem;">{{ current.prompt || current.question }}</p>
      <div style="display: grid; gap: 0.55rem;">
        <button
          v-for="opt in options"
          :key="opt"
          type="button"
          class="quiz-option-btn"
          :disabled="answered"
          :class="{ correct: answered && opt === current.correct, incorrect: answered && chosen === opt && opt !== current.correct }"
          @click="pick(opt)"
        >
          {{ opt }}
        </button>
      </div>
    </template>

    <div v-else style="text-align: center; padding: 1.25rem 0;">
      <div style="font-size: 2.5rem;">🏆</div>
      <p style="font-weight: 800; font-size: 1.15rem;">{{ hits }} / {{ questions.length }} aciertos</p>
      <button type="button" class="ex-btn ex-btn-primary" @click="restart">🔄 Otra ronda</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue'

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const title = computed(() => props.exercise?.title || 'Contrarreloj')
const seconds = computed(() => props.exercise?.config?.seconds || props.exercise?.content?.seconds || 120)
const bank = computed(() => props.exercise?.content?.questions || [])

const questions = ref([])
const index = ref(0)
const options = ref([])
const answered = ref(false)
const chosen = ref('')
const hits = ref(0)
const started = ref(false)
const finished = ref(false)
const remaining = ref(0)
let timer = null

const current = computed(() => questions.value[index.value] || { prompt: '', correct: '', options: [] })

function clearTimer() {
  if (timer) clearInterval(timer)
  timer = null
}

function deal() {
  answered.value = false
  chosen.value = ''
  const q = current.value
  options.value = shuffle(q.options || [])
}

function start() {
  questions.value = shuffle(bank.value)
  index.value = 0
  hits.value = 0
  started.value = true
  finished.value = false
  remaining.value = seconds.value
  deal()
  clearTimer()
  timer = setInterval(() => {
    remaining.value -= 1
    if (remaining.value <= 0) finish()
  }, 1000)
}

function restart() {
  clearTimer()
  started.value = false
  finished.value = false
  remaining.value = seconds.value
}

function pick(opt) {
  if (answered.value || finished.value) return
  answered.value = true
  chosen.value = opt
  if (opt === current.value.correct) hits.value += 1
  emit('update:modelValue', { hits: hits.value, index: index.value })
  setTimeout(() => {
    if (index.value + 1 >= questions.value.length) finish()
    else {
      index.value += 1
      deal()
    }
  }, 700)
}

function finish() {
  clearTimer()
  finished.value = true
  started.value = false
  const max = props.exercise?.maxScore || questions.value.length
  emit('complete', {
    hits: hits.value,
    _grade: {
      score: Math.min(hits.value, max),
      maxScore: max,
      feedback: `Contrarreloj: ${hits.value}/${questions.value.length}`,
    },
  })
}

onBeforeUnmount(clearTimer)
</script>
