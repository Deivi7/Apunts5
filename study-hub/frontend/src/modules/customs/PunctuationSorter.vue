<template>
  <div class="alpha-lab-card" style="margin: 0; box-shadow: none; border: none; padding: 0;">
    <div style="display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem;">
      <div>
        <h3 style="margin: 0; font-size: 1.15rem;">Clasificador veloz de signos</h3>
        <p class="match-hint" style="margin: 0.25rem 0 0;">Caso {{ index + 1 }} / {{ cases.length }} · Aciertos: {{ hits }}</p>
      </div>
      <button type="button" class="ex-btn" @click="reshuffle">🔄 Nueva ronda</button>
    </div>

    <div style="background: var(--bg-main); border: 2px solid var(--border-color); border-radius: var(--radius-lg); padding: 1.1rem; margin-bottom: 1rem;">
      <div style="font-size: 0.8rem; font-weight: 800; color: var(--primary); text-transform: uppercase;">Frase</div>
      <p style="font-size: 1.1rem; font-weight: 700; margin: 0.4rem 0 0;">{{ current.phrase }}</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.65rem;">
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

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.85rem;">
      {{ feedback }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

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

const pool = ref([])
const index = ref(0)
const options = ref([])
const answered = ref(false)
const chosen = ref('')
const feedback = ref('')
const ok = ref(false)
const hits = ref(0)

const cases = computed(() => pool.value.length ? pool.value : (props.exercise?.content?.cases || []))
const current = computed(() => cases.value[index.value] || { phrase: '', correct: '', options: [], hint: '' })

function deal() {
  answered.value = false
  chosen.value = ''
  feedback.value = ''
  options.value = shuffle(current.value.options || [])
}

function reshuffle() {
  pool.value = shuffle(props.exercise?.content?.cases || [])
  index.value = 0
  hits.value = 0
  deal()
}

watch(() => props.exercise?.id, reshuffle, { immediate: true })

function check(opt) {
  if (answered.value) return
  answered.value = true
  chosen.value = opt
  ok.value = opt === current.value.correct
  if (ok.value) {
    hits.value += 1
    feedback.value = `¡Correcto! ${current.value.hint || ''}`
  } else {
    feedback.value = `Era «${current.value.correct}». ${current.value.hint || ''}`
  }
  emit('update:modelValue', { hits: hits.value, index: index.value })
  setTimeout(() => {
    if (index.value + 1 >= cases.value.length) {
      const max = props.exercise?.maxScore || cases.value.length
      emit('complete', {
        hits: hits.value,
        _grade: {
          score: Math.min(hits.value, max),
          maxScore: max,
          feedback: `Clasificador: ${hits.value}/${cases.value.length}`,
        },
      })
      reshuffle()
      return
    }
    index.value += 1
    deal()
  }, ok.value ? 1200 : 1800)
}
</script>
