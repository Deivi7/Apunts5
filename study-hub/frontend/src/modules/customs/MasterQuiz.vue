<template>
  <div class="quiz-card" style="margin: 0;">
    <template v-if="!finished">
      <div class="quiz-meta" style="display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.85rem;">
        <span style="font-size: 0.85rem; font-weight: 800; color: var(--primary);">
          Pregunta {{ idx + 1 }} de {{ questions.length }}
        </span>
        <button type="button" class="ex-btn" @click="restart">🔄 Reiniciar</button>
      </div>

      <div class="quiz-question-text" style="font-size: 1.15rem; font-weight: 700; margin-bottom: 1rem;">
        {{ current.question }}
      </div>

      <div class="quiz-options-list" style="display: grid; gap: 0.55rem;">
        <button
          v-for="(opt, i) in options"
          :key="opt.text + i"
          type="button"
          class="quiz-option-btn"
          :class="{ correct: answered && opt.isCorrect, incorrect: answered && chosen === i && !opt.isCorrect }"
          :disabled="answered"
          @click="select(i)"
        >
          <span style="width: 26px; height: 26px; border-radius: 50%; background: var(--border-color); display: inline-flex; align-items: center; justify-content: center; font-size: 0.85rem; font-weight: 800; margin-right: 0.45rem;">
            {{ String.fromCharCode(65 + i) }}
          </span>
          <span>{{ opt.text }}</span>
        </button>
      </div>

      <div
        v-if="answered"
        class="quiz-explanation-box active"
        :style="{ background: lastOk ? 'rgba(16,185,129,0.12)' : 'var(--accent-rose-bg)', color: lastOk ? '#065f46' : '#9f1239', marginTop: '1rem', padding: '0.85rem', borderRadius: 'var(--radius-md)' }"
      >
        <strong>{{ lastOk ? '¡Respuesta Correcta! 🌟' : '¡Vaya! No es correcto.' }}</strong><br>
        {{ current.hint }}
      </div>

      <div v-if="answered" class="flash-actions" style="margin-top: 1rem;">
        <button type="button" class="ex-btn ex-btn-primary" @click="next">
          {{ idx + 1 < questions.length ? 'Siguiente pregunta →' : 'Ver resultado 🏆' }}
        </button>
      </div>
    </template>

    <div v-else style="text-align: center; padding: 1.5rem 0.5rem;">
      <div style="font-size: 3rem; margin-bottom: 0.35rem;">🏆</div>
      <h2 style="font-size: 1.6rem; font-weight: 800; color: var(--primary); margin: 0 0 0.5rem;">¡Enhorabuena!</h2>
      <p style="font-size: 1.1rem; font-weight: 800; color: var(--accent-green); margin: 0 0 0.75rem;">
        Puntuación: {{ score }} de {{ questions.length }} aciertos
      </p>
      <button type="button" class="ex-btn ex-btn-primary" @click="restart">🔄 Intentar mejorar</button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { MASTER_QUIZ, shuffle } from '@/modules/castellano/comunicacionData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const bank = computed(() => props.exercise?.content?.questions || MASTER_QUIZ)
const questions = ref([])
const options = ref([])
const idx = ref(0)
const answered = ref(false)
const chosen = ref(-1)
const lastOk = ref(false)
const score = ref(0)
const finished = ref(false)

const current = computed(() => questions.value[idx.value] || bank.value[0])

function dealOptions() {
  const q = current.value
  options.value = shuffle(
    q.options.map((text, origIdx) => ({ text, isCorrect: origIdx === q.correct })),
  )
}

const pickCount = computed(
  () => props.exercise?.content?.questionCount
    ?? props.exercise?.config?.questionCount
    ?? bank.value.length,
)

function restart() {
  questions.value = shuffle(bank.value).slice(0, pickCount.value)
  idx.value = 0
  score.value = 0
  finished.value = false
  answered.value = false
  chosen.value = -1
  dealOptions()
}

restart()

function select(i) {
  if (answered.value) return
  answered.value = true
  chosen.value = i
  lastOk.value = !!options.value[i]?.isCorrect
  if (lastOk.value) score.value += 1
  emit('update:modelValue', { idx: idx.value, score: score.value })
}

function next() {
  if (idx.value + 1 < questions.value.length) {
    idx.value += 1
    answered.value = false
    chosen.value = -1
    dealOptions()
    return
  }
  finished.value = true
  const max = props.exercise?.maxScore || questions.value.length
  emit('complete', {
    score: score.value,
    _grade: {
      score: score.value,
      maxScore: max,
      feedback: `Quiz maestro: ${score.value}/${questions.value.length}`,
    },
  })
}
</script>
