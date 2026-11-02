<template>
  <div class="text-hunt-grid">
    <div v-for="cat in categories" :key="cat.id" class="hunt-category-box">
      <div class="hunt-category-title">
        <span>🔹</span> {{ cat.title }} (mín. {{ cat.min }})
      </div>
      <div class="hunt-pills-container">
        <span
          v-for="word in cat.options"
          :key="word"
          class="hunt-word-chip"
          :class="{ selected: isSelected(cat.id, word) }"
          @click="toggle(cat.id, word)"
        >
          {{ word }}
        </span>
      </div>
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

const categories = computed(() => {
  const c = props.exercise?.content?.categories
  if (Array.isArray(c)) return c
  return Object.entries(c || {}).map(([id, v]) => ({ id, ...v }))
})

const selected = ref({})
const feedback = ref('')
const feedbackOk = ref(false)

watch(() => props.exercise?.id, () => {
  selected.value = {}
  feedback.value = ''
})

function isSelected(catId, word) {
  return (selected.value[catId] || []).includes(word)
}

function toggle(catId, word) {
  const set = new Set(selected.value[catId] || [])
  if (set.has(word)) set.delete(word)
  else set.add(word)
  selected.value = { ...selected.value, [catId]: [...set] }
}

function check() {
  let okCats = 0
  categories.value.forEach((cat) => {
    const count = (selected.value[cat.id] || []).length
    if (count >= cat.min) okCats += 1
  })
  const max = props.exercise?.maxScore || categories.value.length
  feedbackOk.value = okCats === categories.value.length
  feedback.value = feedbackOk.value
    ? 'Molt ben trobat! Has cobert les tres categories.'
    : `Completa el mínim de seleccions a cada categoria (${okCats}/${categories.value.length} categories ok).`
  emit('complete', {
    score: (okCats / categories.value.length) * max,
    _grade: { score: (okCats / categories.value.length) * max, maxScore: max, feedback: feedback.value },
  })
}
</script>
