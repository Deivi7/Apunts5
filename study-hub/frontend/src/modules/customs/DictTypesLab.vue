<template>
  <div>
    <div class="alpha-lab-card" style="text-align: center; margin-bottom: 1.5rem;">
      <span class="badge-pill">⚡ Mini-Juego: ¿A qué diccionario acudirías?</span>
      <h3 style="font-size: 1.25rem; margin: 0.6rem 0;">Situaciones Cotidianas de Consulta</h3>
      <p style="font-size: 1.05rem; font-weight: 700; color: var(--primary); margin-bottom: 1rem;">
        {{ scenario.scenario }}
      </p>
      <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
        <button
          v-for="opt in scenarioOpts"
          :key="opt"
          type="button"
          class="ex-btn"
          :disabled="scenarioLocked"
          @click="checkScenario(opt)"
        >
          {{ opt }}
        </button>
      </div>
      <p v-if="scenarioFb" class="feedback-msg" :class="scenarioOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.85rem;">
        {{ scenarioFb }}
      </p>
      <p class="match-hint">Situación {{ scenarioIdx + 1 }}/{{ scenarios.length }}</p>
    </div>

    <div class="alpha-lab-card" style="margin: 0;">
      <div style="display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1rem;">
        <div>
          <span class="badge-pill" style="background: var(--accent-amber); color: #78350f; border: none;">🔬 Reto XTEC Diccio 6</span>
          <h3 style="font-size: 1.25rem; margin-top: 0.4rem;">Clasifica el Artículo Real</h3>
        </div>
        <button type="button" class="ex-btn" @click="nextArticle">🔄 Siguiente Fragmento</button>
      </div>

      <div style="background: #fffdf5; border: 2px dashed #d97706; border-radius: var(--radius-lg); padding: 1.25rem; margin-bottom: 1rem; font-family: Georgia, serif; color: #1c1917;">
        <div style="font-size: 0.78rem; font-weight: 800; font-family: sans-serif; text-transform: uppercase; color: #b45309; margin-bottom: 0.5rem;">
          FRAGMENTO AUTÉNTICO
        </div>
        <div style="font-size: 1.1rem; line-height: 1.55; font-style: italic;">{{ article.snippet }}</div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.65rem;">
        <button
          v-for="opt in articleOpts"
          :key="opt"
          type="button"
          class="quiz-option-btn"
          :class="{ correct: articleAnswered && opt === article.correct, incorrect: articleAnswered && articleChosen === opt && opt !== article.correct }"
          :disabled="articleAnswered"
          @click="checkArticle(opt)"
        >
          {{ opt }}
        </button>
      </div>
      <p v-if="articleFb" class="feedback-msg" :class="articleOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.85rem;">
        {{ articleFb }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { DICT_SCENARIOS, XTEC_REAL_ARTICLES, shuffle } from '@/modules/castellano/comunicacionData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const scenarios = DICT_SCENARIOS
const articles = XTEC_REAL_ARTICLES

const scenarioIdx = ref(0)
const scenarioOpts = ref([])
const scenarioLocked = ref(false)
const scenarioFb = ref('')
const scenarioOk = ref(false)
const scenarioHits = ref(0)

const articleIdx = ref(0)
const articleOpts = ref([])
const articleAnswered = ref(false)
const articleChosen = ref('')
const articleFb = ref('')
const articleOk = ref(false)
const articleHits = ref(0)

const scenario = computed(() => scenarios[scenarioIdx.value])
const article = computed(() => articles[articleIdx.value])

function loadScenario() {
  scenarioLocked.value = false
  scenarioFb.value = ''
  scenarioOpts.value = shuffle(scenario.value.options)
}

function loadArticle() {
  articleAnswered.value = false
  articleChosen.value = ''
  articleFb.value = ''
  articleOpts.value = shuffle(article.value.options)
}

watch(() => props.exercise?.id, () => {
  scenarioIdx.value = 0
  articleIdx.value = 0
  scenarioHits.value = 0
  articleHits.value = 0
  loadScenario()
  loadArticle()
}, { immediate: true })

function checkScenario(opt) {
  if (scenarioLocked.value) return
  scenarioLocked.value = true
  scenarioOk.value = opt === scenario.value.correct
  if (scenarioOk.value) {
    scenarioHits.value += 1
    scenarioFb.value = `¡Correcto! Se usa el ${scenario.value.correct}.`
    setTimeout(() => {
      scenarioIdx.value = (scenarioIdx.value + 1) % scenarios.length
      loadScenario()
      maybeComplete()
    }, 1400)
  } else {
    scenarioFb.value = `La opción adecuada era: ${scenario.value.correct}.`
    setTimeout(() => {
      scenarioLocked.value = false
      scenarioFb.value = ''
    }, 1600)
  }
  sync()
}

function checkArticle(opt) {
  if (articleAnswered.value) return
  articleAnswered.value = true
  articleChosen.value = opt
  articleOk.value = opt === article.value.correct
  if (articleOk.value) {
    articleHits.value += 1
    articleFb.value = `¡Excelente análisis! ${article.value.correct}: ${article.value.hint}`
  } else {
    articleFb.value = `Pertenecía a un ${article.value.correct}. ${article.value.hint}`
  }
  sync()
  maybeComplete()
}

function nextArticle() {
  articleIdx.value = (articleIdx.value + 1) % articles.length
  loadArticle()
}

function sync() {
  emit('update:modelValue', {
    scenarioHits: scenarioHits.value,
    articleHits: articleHits.value,
  })
}

function maybeComplete() {
  if (scenarioHits.value < 4 || articleHits.value < 4) return
  const max = props.exercise?.maxScore || 20
  const score = Math.min(max, scenarioHits.value + articleHits.value)
  emit('complete', {
    scenarioHits: scenarioHits.value,
    articleHits: articleHits.value,
    _grade: { score, maxScore: max, feedback: `Tipos de diccionario: ${score} aciertos` },
  })
}
</script>
