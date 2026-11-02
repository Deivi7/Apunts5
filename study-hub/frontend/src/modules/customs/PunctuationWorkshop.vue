<template>
  <div>
    <div v-if="filters.length" class="filter-group" style="margin-bottom: 1rem;">
      <button
        v-for="f in filters"
        :key="f.id"
        type="button"
        class="filter-pill"
        :class="{ active: category === f.id }"
        @click="category = f.id"
      >
        {{ f.label }}
      </button>
    </div>

    <div v-for="(item, idx) in visible" :key="item.id" class="sentence-exercise-box" style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
        <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary);">
          FRASE {{ idx + 1 }} • {{ item.categoryLabel }}
        </span>
      </div>
      <div class="raw-sentence">«{{ item.raw }}»</div>
      <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.6rem;">
        💡 <strong>Pista:</strong> {{ item.hint }}
      </p>

      <div class="quick-punct-bar" style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.55rem; align-items: center;">
        <span style="font-size: 0.72rem; font-weight: 800; color: var(--text-muted); text-transform: uppercase;">Insertar:</span>
        <button v-for="s in signs" :key="s" type="button" class="punct-btn" @click="insert(item.id, s)">{{ s }}</button>
      </div>

      <input
        :ref="(el) => setRef(item.id, el)"
        v-model="answers[item.id]"
        type="text"
        class="exercise-input input-hub"
        placeholder="Escribe aquí la frase con los signos correctos…"
        style="width: 100%; margin-bottom: 0.55rem;"
      >

      <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
        <button type="button" class="ex-btn ex-btn-primary" @click="check(item)">✅ Comprobar</button>
        <button type="button" class="ex-btn" @click="reveal(item)">👀 Ver corrección</button>
      </div>
      <p v-if="feedback[item.id]" class="feedback-msg" :class="ok[item.id] ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.55rem;">
        {{ feedback[item.id] }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
// answers/feedback/ok as reactive objects; solved as ref map

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const signs = [',', '.', ';', ':', '...', '¿?', '¡!', '«»', '()']
const category = ref('all')
const answers = reactive({})
const feedback = reactive({})
const ok = reactive({})
const refs = {}
const solved = ref({})

const sentences = computed(() => props.exercise?.content?.sentences || [])
const filters = computed(() => props.exercise?.content?.filters || [
  { id: 'all', label: 'Todas' },
])

const visible = computed(() => {
  if (category.value === 'all') return sentences.value
  return sentences.value.filter((s) => s.category === category.value)
})

watch(() => props.exercise?.id, () => {
  category.value = 'all'
  Object.keys(answers).forEach((k) => delete answers[k])
  Object.keys(feedback).forEach((k) => delete feedback[k])
  Object.keys(ok).forEach((k) => delete ok[k])
  solved.value = {}
}, { immediate: true })

function setRef(id, el) {
  if (el) refs[id] = el
}

function normalize(text) {
  return String(text || '')
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/["«»“”]/g, '"')
    .toLowerCase()
}

function insert(id, char) {
  const el = refs[id]
  const cur = answers[id] || ''
  if (!el) {
    answers[id] = cur + char
    return
  }
  const start = el.selectionStart ?? cur.length
  const end = el.selectionEnd ?? start
  answers[id] = cur.slice(0, start) + char + cur.slice(end)
  requestAnimationFrame(() => {
    el.focus()
    const pos = start + char.length
    el.selectionStart = el.selectionEnd = pos
  })
}

function check(item) {
  const given = answers[item.id] || ''
  if (!given.trim()) {
    feedback[item.id] = 'Escribe la frase puntuada antes de comprobar.'
    ok[item.id] = false
    return
  }
  const pass = normalize(given) === normalize(item.solution)
  ok[item.id] = pass
  if (pass) {
    solved.value = { ...solved.value, [item.id]: true }
    feedback[item.id] = `✅ ¡Excelente! ${item.solution}`
  } else {
    feedback[item.id] = `⚠️ Revisa signos o mayúsculas. Solución: ${item.solution}`
  }
  const solvedIds = Object.keys(solved.value).filter((k) => solved.value[k])
  emit('update:modelValue', { answers: { ...answers }, solved: solvedIds })
  maybeComplete()
}

function reveal(item) {
  answers[item.id] = item.solution
  feedback[item.id] = `Solución oficial: ${item.solution}`
  ok[item.id] = true
}

function maybeComplete() {
  const solvedIds = Object.keys(solved.value).filter((k) => solved.value[k])
  if (solvedIds.length < sentences.value.length) return
  const max = props.exercise?.maxScore || sentences.value.length
  emit('complete', {
    solved: solvedIds,
    _grade: {
      score: max,
      maxScore: max,
      feedback: `Taller de puntuación: ${solvedIds.length}/${sentences.value.length}`,
    },
  })
}
</script>
