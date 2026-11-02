<template>
  <div class="alpha-lab-card" style="margin: 0; box-shadow: none; border: none; padding: 0;">
    <div class="section-header" style="border: none; margin-bottom: 1rem; padding: 0;">
      <div>
        <h3 style="font-size: 1.25rem; margin: 0;">Desafío Práctico: ¿Quién es quién?</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin: 0.25rem 0 0;">
          Caso {{ index + 1 }} de {{ cases.length }} · Aciertos: {{ score }}
        </p>
      </div>
      <button type="button" class="ex-btn" @click="next">🔄 Siguiente Caso</button>
    </div>

    <div style="background: var(--bg-main); border: 2px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1.25rem;">
      <div style="font-size: 0.85rem; font-weight: 800; color: var(--primary); text-transform: uppercase;">SITUACIÓN REAL:</div>
      <div style="font-size: 1.15rem; font-weight: 700; margin: 0.5rem 0;">«{{ current.scenario }}»</div>
      <div style="font-size: 0.95rem; font-weight: 600; color: var(--text-muted);">{{ current.question }}</div>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem;">
      <button
        v-for="opt in options"
        :key="opt"
        type="button"
        class="quiz-option-btn"
        :class="{ correct: answered && opt === current.correct, incorrect: answered && chosen === opt && opt !== current.correct }"
        :disabled="answered"
        @click="check(opt)"
      >
        {{ opt }}
      </button>
    </div>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 1rem;">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { COMM_SITUATIONS, shuffle } from '@/modules/castellano/comunicacionData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const cases = computed(() => props.exercise?.content?.cases || COMM_SITUATIONS)
const index = ref(0)
const options = ref([])
const answered = ref(false)
const chosen = ref('')
const feedback = ref('')
const ok = ref(false)
const score = ref(0)
const solved = ref(new Set())

const current = computed(() => cases.value[index.value] || cases.value[0])

function load() {
  answered.value = false
  chosen.value = ''
  feedback.value = ''
  options.value = shuffle(current.value.options || [])
}

watch(() => props.exercise?.id, () => {
  index.value = 0
  score.value = 0
  solved.value = new Set()
  load()
}, { immediate: true })

function check(opt) {
  if (answered.value) return
  answered.value = true
  chosen.value = opt
  ok.value = opt === current.value.correct
  if (ok.value) {
    score.value += 1
    solved.value.add(index.value)
    feedback.value = `¡Excelente razonamiento! "${current.value.correct}" es correcto (+15 XP).`
  } else {
    feedback.value = `La respuesta adecuada era: "${current.value.correct}".`
  }
  emit('update:modelValue', { index: index.value, score: score.value, solved: [...solved.value] })
  maybeComplete()
}

function next() {
  index.value = (index.value + 1) % cases.value.length
  load()
}

function maybeComplete() {
  if (solved.value.size < cases.value.length) return
  const max = props.exercise?.maxScore || cases.value.length
  emit('complete', {
    score: score.value,
    _grade: {
      score: Math.min(score.value, max),
      maxScore: max,
      feedback: `Casos reales: ${score.value}/${cases.value.length}`,
    },
  })
}
</script>
