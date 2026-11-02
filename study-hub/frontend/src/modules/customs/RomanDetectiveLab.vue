<template>
  <div>
    <div style="display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
      <p class="match-hint" style="margin: 0;">
        Ronda {{ index + 1 }}/{{ rounds }} · Aciertos: {{ hits }}
      </p>
      <button type="button" class="ex-btn" @click="restart">🔄 Nueva ronda</button>
    </div>

    <p style="font-size: 1.2rem; font-weight: 800; margin: 0 0 0.5rem;">{{ current.display }}</p>
    <p class="ex-prompt">¿Está escrito correctamente en romano?</p>

    <div class="choice-row" style="margin-top: 0.75rem;">
      <button
        type="button"
        class="quiz-option-btn"
        :disabled="answered"
        :class="btnClass(true)"
        @click="answer(true)"
      >
        ✓ Sí, es correcto
      </button>
      <button
        type="button"
        class="quiz-option-btn"
        :disabled="answered"
        :class="btnClass(false)"
        @click="answer(false)"
      >
        ✗ No, hay error
      </button>
    </div>

    <p v-if="answered" class="match-hint" :class="lastOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.75rem;">
      {{ hint }}
    </p>

    <button v-if="finished" type="button" class="ex-btn ex-btn-primary" style="margin-top: 1rem;" @click="submit">
      Guardar puntuación
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const map = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRoman(num) {
  let n = Number(num)
  if (!n || n < 1 || n > 3999) return ''
  let out = ''
  for (const [v, s] of map) {
    while (n >= v) {
      out += s
      n -= v
    }
  }
  return out
}

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function wrongForm(correct, n) {
  const mutators = [
    () => correct.replace(/IV/g, 'IIII'),
    () => correct.replace(/IX/g, 'VIV'),
    () => correct.replace(/XC/g, 'LXL'),
    () => correct.replace(/XL/g, 'XXXX'),
    () => correct.replace(/CM/g, 'IM'),
    () => (n === 99 ? 'IC' : correct.replace(/I/g, 'II').slice(0, 8)),
    () => `${correct}I`,
    () => correct.replace(/V/g, 'VV'),
    () => (n >= 40 && n <= 49 ? 'IL' + toRoman(n - 40).replace(/^XL?/, '') : `X${correct}`),
  ]
  const pick = mutators[Math.floor(Math.random() * mutators.length)]()
  const cleaned = String(pick || correct).toUpperCase()
  return cleaned === correct ? `${correct}I` : cleaned
}

function buildRound() {
  const n = Math.floor(Math.random() * 3999) + 1
  const correct = toRoman(n)
  const isValid = Math.random() < 0.5
  const display = isValid ? correct : wrongForm(correct, n)
  return {
    n,
    correctRoman: correct,
    display,
    isValid,
    hint: isValid
      ? `Correcto: ${correct} = ${n}.`
      : `Error típico. La forma correcta para ${n} es ${correct}.`,
  }
}

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const rounds = computed(() => props.exercise?.content?.rounds || props.exercise?.config?.rounds || 10)
const deck = ref([])
const index = ref(0)
const hits = ref(0)
const answered = ref(false)
const lastOk = ref(false)
const picked = ref(null)
const hint = ref('')
const finished = ref(false)

const current = computed(() => deck.value[index.value] || buildRound())

function deal() {
  deck.value = Array.from({ length: rounds.value }, () => buildRound())
  index.value = 0
  hits.value = 0
  answered.value = false
  picked.value = null
  hint.value = ''
  finished.value = false
}

watch(() => props.exercise?.id, deal, { immediate: true })

function btnClass(val) {
  if (!answered.value) return ''
  const should = current.value.isValid
  if (val === should) return 'correct'
  if (picked.value === val) return 'incorrect'
  return ''
}

function answer(val) {
  if (answered.value) return
  answered.value = true
  picked.value = val
  lastOk.value = val === current.value.isValid
  if (lastOk.value) hits.value += 1
  hint.value = current.value.hint
  emit('update:modelValue', { hits: hits.value, index: index.value })

  setTimeout(() => {
    if (index.value + 1 >= deck.value.length) {
      finished.value = true
      return
    }
    index.value += 1
    answered.value = false
    picked.value = null
    hint.value = ''
  }, 900)
}

function restart() {
  deal()
}

function submit() {
  const max = props.exercise?.maxScore || rounds.value
  emit('complete', {
    hits: hits.value,
    _grade: {
      score: Math.min(hits.value, max),
      maxScore: max,
      feedback: `Detective romano: ${hits.value}/${rounds.value}`,
    },
  })
}
</script>
