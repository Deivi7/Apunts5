<template>
  <div class="vue-panel ex-player">
    <div style="display: flex; justify-content: space-between; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 0.75rem;">
      <div>
        <h3>{{ exercise.title }}</h3>
        <p v-if="exercise.instructions" class="panel-desc" style="margin-bottom: 0;">
          {{ exercise.instructions }}
        </p>
      </div>
      <span class="ex-type-pill">{{ typeLabel }}</span>
    </div>

    <component
      :is="renderer"
      :exercise="exercise"
      :model-value="answers"
      :grade-result="lastResult"
      @update:model-value="onAnswers"
      @submit="onSubmit"
      @complete="onComplete"
    />

    <div v-if="showCheckButton" class="exercise-actions">
      <button
        v-if="!lastResult"
        type="button"
        class="btn-check-answer"
        @click="onSubmit"
      >
        Comprobar
      </button>
      <button
        v-else
        type="button"
        class="btn-secondary-quiet"
        @click="onRetry"
      >
        Reintentar
      </button>
      <button v-if="hint" type="button" class="btn-secondary-quiet" @click="showHint = !showHint">Pista</button>
    </div>
    <div v-else-if="hint" class="exercise-actions">
      <button type="button" class="btn-secondary-quiet" @click="showHint = !showHint">Pista</button>
    </div>

    <p v-if="showHint && hint" class="feedback-msg" style="color: var(--accent-amber, #f59e0b);">💡 {{ hint }}</p>
    <p v-if="feedback" class="feedback-msg" :class="lastResult?.isCorrect ? 'feedback-ok' : 'feedback-bad'">
      {{ feedback }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { resolveRenderer } from './registry'
import { gradeExercise } from '@/grading/registry'
import { useLocalSessionStore } from '@/stores/localSession'
import { useSound } from '@/composables/useSound'

const TYPE_LABELS = {
  multiple_choice: 'Opción múltiple',
  true_false: 'Verdadero / Falso',
  fill_blank: 'Completar',
  matching: 'Emparejar',
  ordering: 'Ordenar',
  memory: 'Memoria',
  custom: 'Actividad',
}

const props = defineProps({
  exercise: { type: Object, required: true },
})

const emit = defineEmits(['graded', 'complete'])

const renderer = computed(() => resolveRenderer(props.exercise.type))
const typeLabel = computed(
  () => TYPE_LABELS[props.exercise.type] || props.exercise.content?.component || props.exercise.type,
)
const answers = ref({})
const feedback = ref('')
const lastResult = ref(null)
const showHint = ref(false)
const hint = computed(() => props.exercise.config?.hint || props.exercise.content?.hint || '')
const localSession = useLocalSessionStore()
const { play } = useSound()

const showCheckButton = computed(() => {
  if (props.exercise.config?.hideCheck) return false
  if (props.exercise.type === 'memory') return false
  const custom = props.exercise.content?.component || props.exercise.config?.component
  // Customs con botón propio de comprobar / flujo continuo
  if ([
    'AlphabetOrder', 'AlphaOrderLab', 'DragClassify', 'AgesDragLab', 'RomanWorkshopLab',
    'CategorySorterTimed', 'ContextSynonymLab', 'RomanDetectiveLab', 'FlashcardsSpeak', 'MentalSprint',
    'RomanConverter', 'CenturyCalculator', 'MultiplicationBoard', 'DivisionBoard',
    'PemdasGenerator', 'PracticeWorksheet', 'ProblemsLab', 'CoordinateClickMap',
    'RadarCaptureLab', 'CoordGridGenerator', 'MapPointsHub', 'ConstellationCanvas',
    'ContinentsOceansLab', 'WindRoseSpeak', 'TheoryTrueFalse',
    'ComicWorkshop', 'CircuitExplorer', 'SituationsLab', 'RaeSimulator', 'AbbreviationLab',
    'DictTypesLab', 'MasterQuiz', 'PunctuationSorter', 'PunctuationWorkshop',
    'EmailComposer', 'TimedChoiceLab', 'RomanClockLab', 'PrintableRomanSheet',
    'SyllableTonicaLab', 'SyllableSplitLab', 'GenderNumberLab', 'PillChoiceLab',
    'WordChipHuntLab', 'EmatInfiniteLab', 'PapInfiniteTrainer',
    'VerbLab', 'SpaceMissionLab',
    'AccentGenerator', 'AdjGenerator', 'PolisemiaFitxa', 'WordwallAccentLab',
  ].includes(custom)) {
    return false
  }
  return true
})

watch(
  () => props.exercise.id,
  () => {
    answers.value = {}
    feedback.value = ''
    lastResult.value = null
    showHint.value = false
  },
)

function onAnswers(value) {
  answers.value = value
}

function applyGrade(graded) {
  lastResult.value = graded
  feedback.value = graded.feedback || `${Math.round(graded.score)}/${graded.maxScore}`
  localSession.setFeedback(feedback.value)
  if (graded.isCorrect) {
    play('correct')
    const xp = props.exercise.config?.xp || Math.round(graded.score)
    localSession.addXp(xp)
    localSession.markCompleted(props.exercise.id)
  } else {
    play('error')
    localSession.resetStreak()
  }
  emit('graded', graded)
}

function onSubmit() {
  const graded = gradeExercise(props.exercise, answers.value)
  applyGrade(graded)
}

function onRetry() {
  answers.value = {}
  feedback.value = ''
  lastResult.value = null
  showHint.value = false
}

function onComplete(payload) {
  answers.value = { ...answers.value, ...payload }
  if (payload?._grade) {
    applyGrade({
      ...payload._grade,
      isCorrect: (payload._grade.score || 0) >= (payload._grade.maxScore || 1) * 0.99,
    })
  } else {
    onSubmit()
  }
  emit('complete', payload)
}
</script>
