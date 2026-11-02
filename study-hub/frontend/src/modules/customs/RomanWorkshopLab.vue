<template>
  <div class="ws-lab">
    <p class="match-hint">Taller oficial: converteix romans ↔ decimals i tria l’opció correcta (23 reptes).</p>

    <h4 style="margin: 1rem 0 0.5rem;">Activitat I: valor en xifres</h4>
    <div class="exercises-subgrid" style="display: grid; gap: 0.65rem;">
      <div v-for="row in romanToDec" :key="row.id" class="ex-block">
        <label class="ex-prompt">{{ row.prompt }} =</label>
        <input v-model="answers[row.id]" type="number" class="input-hub" placeholder="Valor…">
        <p v-if="checked[row.id]" class="match-hint" :class="rowOk(row) ? 'feedback-ok' : 'feedback-bad'">
          {{ rowOk(row) ? '✓ Correcte' : `✗ Hauria de ser ${row.answer}` }}
        </p>
      </div>
    </div>

    <h4 style="margin: 1.25rem 0 0.5rem;">Activitat II: escriu en romans</h4>
    <div class="exercises-subgrid" style="display: grid; gap: 0.65rem;">
      <div v-for="row in decToRoman" :key="row.id" class="ex-block">
        <label class="ex-prompt">{{ row.prompt }} →</label>
        <input v-model="answers[row.id]" type="text" class="input-hub" placeholder="En romans…">
        <p v-if="checked[row.id]" class="match-hint" :class="rowOk(row) ? 'feedback-ok' : 'feedback-bad'">
          {{ rowOk(row) ? '✓ Correcte' : `✗ Hauria de ser ${row.answer}` }}
        </p>
      </div>
    </div>

    <h4 style="margin: 1.25rem 0 0.5rem;">Activitat III: tria l’opció correcta</h4>
    <div v-for="q in choices" :key="q.id" class="ex-block" style="margin-bottom: 0.75rem;">
      <p class="ex-prompt">{{ q.prompt }}</p>
      <div class="choice-row">
        <button
          v-for="opt in q.options"
          :key="opt"
          type="button"
          class="quiz-option-btn"
          :class="choiceClass(q, opt)"
          @click="pickChoice(q.id, opt)"
        >
          {{ opt }}
        </button>
      </div>
    </div>

    <button type="button" class="ex-btn ex-btn-primary" @click="checkAll">✓ Comprovar taller</button>
    <p v-if="feedback" class="match-hint" :class="feedbackOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.65rem;">
      {{ feedback }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  ROMAN_WORKSHOP_CHOICES,
  ROMAN_WORKSHOP_DEC_TO_ROMAN,
  ROMAN_WORKSHOP_ROMAN_TO_DEC,
} from '@/modules/projecte/pasdeltempsData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const romanToDec = computed(() => props.exercise?.content?.romanToDec || ROMAN_WORKSHOP_ROMAN_TO_DEC)
const decToRoman = computed(() => props.exercise?.content?.decToRoman || ROMAN_WORKSHOP_DEC_TO_ROMAN)
const choices = computed(() => props.exercise?.content?.choices || ROMAN_WORKSHOP_CHOICES)

const answers = ref({})
const choicePicks = ref({})
const checked = ref({})
const feedback = ref('')
const feedbackOk = ref(false)

watch(() => props.exercise?.id, () => {
  answers.value = {}
  choicePicks.value = {}
  checked.value = {}
  feedback.value = ''
})

function normText(v) {
  return String(v || '').trim().toUpperCase()
}

function rowOk(row) {
  const raw = answers.value[row.id]
  if (raw == null || raw === '') return false
  const accepts = row.accept || [row.answer]
  if (typeof raw === 'number' || /^\d+$/.test(String(raw))) {
    return accepts.map(String).includes(String(raw).trim())
  }
  return accepts.map(normText).includes(normText(raw))
}

function pickChoice(id, opt) {
  choicePicks.value = { ...choicePicks.value, [id]: opt }
}

function choiceClass(q, opt) {
  const picked = choicePicks.value[q.id]
  if (!checked.value[q.id]) return picked === opt ? 'is-selected' : ''
  if (opt === q.correct) return 'correct'
  if (picked === opt) return 'incorrect'
  return ''
}

function checkAll() {
  const ids = [...romanToDec.value, ...decToRoman.value].map((r) => r.id)
  const nextChecked = {}
  ids.forEach((id) => { nextChecked[id] = true })
  choices.value.forEach((q) => { nextChecked[q.id] = true })
  checked.value = nextChecked

  let ok = 0
  const total = ids.length + choices.value.length
  ids.forEach((id) => {
    const row = [...romanToDec.value, ...decToRoman.value].find((r) => r.id === id)
    if (row && rowOk(row)) ok += 1
  })
  choices.value.forEach((q) => {
    if (choicePicks.value[q.id] === q.correct) ok += 1
  })

  feedbackOk.value = ok === total
  feedback.value = feedbackOk.value
    ? `Excel·lent! ${ok}/${total} encerts al taller.`
    : `${ok}/${total} encerts. Revisa els errors marcats.`

  const max = props.exercise?.maxScore || total
  emit('complete', {
    score: (ok / total) * max,
    _grade: { score: (ok / total) * max, maxScore: max, feedback: feedback.value },
  })
}
</script>
