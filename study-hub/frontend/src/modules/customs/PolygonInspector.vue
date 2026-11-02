<template>
  <div class="du-lab">
    <svg class="du-poly-svg" viewBox="0 0 220 140" aria-label="Trapezi isòsceles">
      <polygon
        points="40,30 180,30 150,110 70,110"
        fill="rgba(15,118,110,0.15)"
        stroke="#0f766e"
        stroke-width="3"
      />
      <text x="95" y="24" font-size="11" font-weight="700">9 cm</text>
      <text x="95" y="128" font-size="11" font-weight="700">6 cm</text>
      <text x="28" y="75" font-size="11" font-weight="700">6</text>
      <text x="175" y="75" font-size="11" font-weight="700">6</text>
      <line x1="40" y1="30" x2="150" y2="110" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 3" />
      <line x1="180" y1="30" x2="70" y2="110" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 3" />
    </svg>

    <p class="match-hint" style="margin:0">
      Trapezi isòsceles de l'examen: bases 9 cm i 6 cm, laterals 6 cm.
    </p>

    <div v-if="q" class="quiz-question-text" style="font-weight:700">{{ q.prompt }}</div>

    <div class="du-row" style="flex-direction:column;align-items:stretch">
      <button
        v-for="opt in q?.options || []"
        :key="opt"
        type="button"
        class="ex-btn"
        :class="{
          'ex-btn-primary': answered && opt === q.correct,
        }"
        :disabled="answered"
        @click="select(opt)"
      >
        {{ opt }}
      </button>
    </div>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
    <button v-if="answered" type="button" class="ex-btn ex-btn-primary" @click="next">
      {{ idx + 1 < questions.length ? 'Següent →' : 'Reiniciar' }}
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const questions = [
  { prompt: 'Quants vèrtexs té?', options: ['3', '4', '5', '6'], correct: '4' },
  { prompt: 'Quants costats té?', options: ['3', '4', '5'], correct: '4' },
  { prompt: 'Quantes diagonals té?', options: ['1', '2', '3', '4'], correct: '2' },
  { prompt: 'Perímetre (9+6+6+6)?', options: ['21 cm', '27 cm', '24 cm', '30 cm'], correct: '27 cm' },
  { prompt: 'Quants costats paral·lels?', options: ['0', '2 (un parell)', '4 (dos parells)'], correct: '2 (un parell)' },
  { prompt: 'És un paral·lelogram?', options: ['Sí', 'No'], correct: 'No' },
  { prompt: 'És còncau o convex?', options: ['Còncau', 'Convex'], correct: 'Convex' },
  { prompt: 'Classificació:', options: ['Paral·lelogram', 'Trapezi', 'Triangle', 'Rombe'], correct: 'Trapezi' },
]

const idx = ref(0)
const answered = ref(false)
const ok = ref(false)
const feedback = ref('')
const score = ref(0)

const q = computed(() => questions[idx.value])

function select(opt) {
  if (answered.value) return
  answered.value = true
  ok.value = opt === q.value.correct
  if (ok.value) score.value += 1
  feedback.value = ok.value
    ? 'Correcte!'
    : `No: la resposta és «${q.value.correct}».`
  emit('update:modelValue', { idx: idx.value, score: score.value })
}

function next() {
  if (idx.value + 1 >= questions.length) {
    const max = props.exercise?.maxScore || 12
    const s = Math.round((score.value / questions.length) * max)
    emit('complete', {
      _grade: {
        score: s,
        maxScore: max,
        feedback: `${score.value}/${questions.length} sobre el trapezi.`,
      },
    })
    idx.value = 0
    score.value = 0
  } else {
    idx.value += 1
  }
  answered.value = false
  ok.value = false
  feedback.value = ''
}
</script>
