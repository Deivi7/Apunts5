<template>
  <div class="prob-lab">
    <div class="prob-header">
      <div>
        <span class="prob-cat">{{ current.catName }}</span>
        <h4 class="prob-title">{{ current.title }}</h4>
        <p class="prob-meta">Problema {{ current.id }} · Aciertos: {{ score }} · Banco: {{ problems.length }}</p>
      </div>
      <div class="prob-nav">
        <button type="button" class="ex-btn" @click="pickRandom">🎲 Aleatorio</button>
        <button type="button" class="ex-btn" @click="next">➡ Siguiente</button>
      </div>
    </div>

    <div class="prob-card">
      <p class="prob-statement">{{ current.statement }}</p>
      <p v-if="hintVisible" class="match-hint" style="margin: 0.65rem 0 0;">💡 {{ current.hint }}</p>
    </div>

    <form class="prob-form" @submit.prevent="check">
      <label class="prob-answer-label">
        Respuesta numérica ({{ current.unit }})
        <input v-model="answer" type="text" class="input-hub prob-input" placeholder="?" autocomplete="off">
      </label>
      <button type="button" class="ex-btn" @click="hintVisible = !hintVisible">Pista</button>
      <button type="submit" class="ex-btn ex-btn-primary">Comprobar</button>
    </form>

    <p v-if="feedback" class="feedback-msg" :class="lastOk ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
    <p v-if="score >= minComplete" class="feedback-ok" style="margin: 0;">
      Has completado el mínimo de {{ minComplete }} problemas. Sigue practicando o cambia de pestaña.
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { OPERATIONS_PROBLEMS } from '@/modules/mates/operacionesData.js'
import { answersMatch } from '@/modules/mates/operacionesMath.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const problems = computed(() => props.exercise?.content?.problems || OPERATIONS_PROBLEMS)
const minComplete = props.exercise?.content?.minComplete || 12

const index = ref(0)
const answer = ref('')
const feedback = ref('')
const lastOk = ref(false)
const score = ref(0)
const solved = ref(new Set())
const hintVisible = ref(false)
const sessionDone = ref(false)

const current = computed(() => problems.value[index.value] || problems.value[0])

watch(
  () => props.exercise?.id,
  () => {
    index.value = 0
    score.value = 0
    solved.value = new Set()
    sessionDone.value = false
    resetRound()
  },
  { immediate: true },
)

function resetRound() {
  answer.value = ''
  feedback.value = ''
  lastOk.value = false
  hintVisible.value = false
}

function next() {
  index.value = (index.value + 1) % problems.value.length
  resetRound()
}

function pickRandom() {
  index.value = Math.floor(Math.random() * problems.value.length)
  resetRound()
}

function maybeFinish() {
  if (sessionDone.value || score.value < minComplete) return
  sessionDone.value = true
  const max = props.exercise?.maxScore || minComplete
  emit('complete', {
    _grade: {
      score: Math.min(max, score.value),
      maxScore: max,
      feedback: `Banco de problemas: ${score.value} aciertos (mínimo ${minComplete}).`,
    },
  })
}

function check() {
  lastOk.value = answersMatch(current.value.ans, answer.value)
  if (lastOk.value) {
    if (!solved.value.has(current.value.id)) {
      solved.value.add(current.value.id)
      score.value += 1
    }
    feedback.value = `¡Correcto! La respuesta es ${current.value.ans} ${current.value.unit}.`
  } else {
    feedback.value = `Todavía no coincide. Repasa los datos del enunciado o usa la pista.`
  }
  emit('update:modelValue', { score: score.value, solved: [...solved.value], lastId: current.value.id })
  maybeFinish()
  if (lastOk.value) setTimeout(() => pickRandom(), 700)
}
</script>

<style scoped>
.prob-lab { display: grid; gap: 0.85rem; max-width: 640px; }
.prob-header { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem; }
.prob-cat {
  font-size: 0.72rem; font-weight: 800; color: var(--primary); text-transform: uppercase;
}
.prob-title { margin: 0.2rem 0 0; font-size: 1.1rem; }
.prob-meta { margin: 0.25rem 0 0; font-size: 0.82rem; color: var(--text-muted); font-weight: 600; }
.prob-nav { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: flex-start; }
.prob-card {
  border: 1px solid var(--border-color); border-radius: 16px; padding: 1.1rem 1.15rem;
  background: linear-gradient(180deg, var(--bg-card), color-mix(in srgb, var(--primary) 4%, var(--bg-card)));
}
.prob-statement { margin: 0; font-size: 1rem; line-height: 1.55; font-weight: 600; }
.prob-form { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: end; }
.prob-answer-label { display: grid; gap: 0.25rem; font-size: 0.78rem; font-weight: 800; color: var(--text-muted); flex: 1 1 12rem; }
.prob-input { max-width: 10rem; font-weight: 800; font-size: 1.05rem; }
</style>
