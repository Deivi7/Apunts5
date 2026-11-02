<template>
  <div>
    <div class="gn-table-wrapper">
      <table class="gn-table">
        <thead>
          <tr>
            <th v-for="col in columns" :key="col">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.id">
            <td class="gn-word-cell">{{ row.label }}</td>
            <td v-if="row.note" style="font-size: 0.88rem; color: var(--text-muted);">{{ row.note }}</td>
            <td>
              <button
                v-for="opt in options"
                :key="opt.value"
                type="button"
                class="btn-pill-choice"
                :class="pillClass(row, opt.value)"
                @click="choose(row.id, opt.value)"
              >
                {{ opt.label }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
const options = computed(() => props.exercise?.content?.options || [
  { value: 'a', label: 'A' },
  { value: 'b', label: 'B' },
])
const columns = computed(() => props.exercise?.content?.columns || ['Paraula', 'Tria'])
const picked = ref({})
const checked = ref(false)
const feedback = ref('')
const feedbackOk = ref(false)

watch(() => props.exercise?.id, () => {
  picked.value = {}
  checked.value = false
  feedback.value = ''
})

function choose(id, val) {
  picked.value = { ...picked.value, [id]: val }
}

function pillClass(row, val) {
  if (!checked.value) return picked.value[row.id] === val ? 'active' : ''
  if (val === row.correct) return 'correct'
  if (picked.value[row.id] === val) return 'wrong'
  return ''
}

function check() {
  checked.value = true
  let ok = 0
  rows.value.forEach((row) => {
    if (picked.value[row.id] === row.correct) ok += 1
  })
  const max = props.exercise?.maxScore || rows.value.length
  feedbackOk.value = ok === rows.value.length
  feedback.value = feedbackOk.value
    ? `Molt bé! ${ok}/${rows.value.length}.`
    : `${ok}/${rows.value.length} encerts.`
  emit('complete', {
    score: (ok / rows.value.length) * max,
    _grade: { score: (ok / rows.value.length) * max, maxScore: max, feedback: feedback.value },
  })
}
</script>
