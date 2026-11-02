<template>
  <div class="gn-table-wrapper">
    <table class="gn-table">
      <thead>
        <tr>
          <th>Nom</th>
          <th>Gènere</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.word">
          <td class="gn-word-cell">{{ row.word }}</td>
          <td>
            <button
              v-for="opt in genderOpts"
              :key="opt.val"
              type="button"
              class="btn-pill-choice"
              :class="pillClass(row.word, 'g', opt.val, row.gender)"
              @click="set(row.word, 'g', opt.val)"
            >
              {{ opt.val }}
            </button>
          </td>
          <td>
            <button
              v-for="opt in numberOpts"
              :key="opt.val"
              type="button"
              class="btn-pill-choice"
              :class="pillClass(row.word, 'n', opt.val, row.number)"
              @click="set(row.word, 'n', opt.val)"
            >
              {{ opt.val }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button type="button" class="ex-btn ex-btn-primary" style="margin-top: 0.75rem;" @click="check">
      Comprovar
    </button>
    <p v-if="feedback" class="match-hint" :class="feedbackOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.65rem;">
      {{ feedback }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const rows = computed(() => props.exercise?.content?.rows || [])
const genderOpts = [{ val: 'M' }, { val: 'F' }]
const numberOpts = [{ val: 'S' }, { val: 'P' }]
const choices = ref({})
const checked = ref(false)
const feedback = ref('')
const feedbackOk = ref(false)

watch(() => props.exercise?.id, () => {
  choices.value = {}
  checked.value = false
  feedback.value = ''
})

function key(word, kind) {
  return `${kind}-${word}`
}

function set(word, kind, val) {
  choices.value = { ...choices.value, [key(word, kind)]: val }
}

function pillClass(word, kind, val, correct) {
  const chosen = choices.value[key(word, kind)]
  if (!checked.value) return chosen === val ? 'active' : ''
  if (val === correct) return 'correct'
  if (chosen === val) return 'wrong'
  return ''
}

function check() {
  checked.value = true
  let ok = 0
  const total = rows.value.length * 2
  rows.value.forEach((row) => {
    if (choices.value[key(row.word, 'g')] === row.gender) ok += 1
    if (choices.value[key(row.word, 'n')] === row.number) ok += 1
  })
  const max = props.exercise?.maxScore || rows.value.length
  feedbackOk.value = ok === total
  feedback.value = feedbackOk.value
    ? `Excel·lent! ${rows.value.length}/${rows.value.length} paraules completes.`
    : `${ok}/${total} encerts. Opcions en verd = solució.`
  emit('complete', {
    score: (ok / total) * max,
    _grade: { score: (ok / total) * max, maxScore: max, feedback: feedback.value },
  })
}
</script>
