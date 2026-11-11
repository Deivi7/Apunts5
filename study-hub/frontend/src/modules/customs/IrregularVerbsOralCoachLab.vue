<template>
  <div class="iv-oral-coach">
    <!-- CABECERA DEL ENTRENADOR ORAL -->
    <div class="iv-coach-header">
      <div class="iv-coach-avatar" :class="{ speaking: isTeacherSpeaking, listening: isListening }">
        <span>{{ isTeacherSpeaking ? '🗣️' : isListening ? '🎙️' : '🧑‍🏫' }}</span>
      </div>
      <div class="iv-coach-intro">
        <h4>Speaking Coach · El Profe te pregunta y te corrige en voz alta</h4>
        <p>
          Escucha la pregunta en inglés, responde en voz alta (de <strong>Presente → Pasado</strong> o de <strong>Pasado → Presente</strong>) y el profe te corregirá la pronunciación al instante.
        </p>
      </div>
      <div class="iv-coach-scores">
        <span class="iv-score-badge">🔥 Racha: {{ streak }}</span>
        <span class="iv-score-badge">✅ Aciertos: {{ correctTotal }}</span>
      </div>
    </div>

    <!-- CONFIGURACIÓN: DIRECCIÓN + FAMILIA + AUTO-MIC -->
    <div class="iv-coach-settings">
      <div class="iv-setting-group">
        <label>🔄 Dirección de la pregunta:</label>
        <div class="iv-dir-tabs">
          <button
            type="button"
            class="iv-dir-btn"
            :class="{ active: direction === 'p2past' }"
            @click="changeDirection('p2past')"
          >
            Presente → Pasado
          </button>
          <button
            type="button"
            class="iv-dir-btn"
            :class="{ active: direction === 'past2p' }"
            @click="changeDirection('past2p')"
          >
            Pasado → Presente
          </button>
          <button
            type="button"
            class="iv-dir-btn"
            :class="{ active: direction === 'both' }"
            @click="changeDirection('both')"
          >
            🔀 Bidireccional (Ambos)
          </button>
        </div>
      </div>

      <div class="iv-setting-group">
        <label>📚 Familia de verbos:</label>
        <select v-model="selectedFamilyId" class="iv-select" @change="pickNewQuestion(false)">
          <option value="all">🏆 Todas las familias (57 verbos)</option>
          <option v-for="fam in VERB_FAMILIES" :key="fam.id" :value="fam.id">
            {{ fam.icon }} {{ fam.title }}
          </option>
        </select>
      </div>

      <label class="iv-automic-toggle">
        <input v-model="autoListenAfterQuestion" type="checkbox" />
        <span>🎙️ Abrir micrófono automáticamente tras la pregunta del profe</span>
      </label>
    </div>

    <!-- TARJETA DEL DIÁLOGO ORAL -->
    <div v-if="currentVerb" class="iv-coach-stage">
      <!-- Burbuja del Profe -->
      <div class="iv-speech-bubble teacher">
        <div class="iv-bubble-top">
          <span class="iv-speaker-tag">🧑‍🏫 Teacher asks ({{ askPast ? 'Present → Past' : 'Past → Present' }}):</span>
          <button type="button" class="iv-repeat-q-btn" @click="askQuestionOutLoud">
            🔊 Escuchar pregunta del profe
          </button>
        </div>

        <p class="iv-teacher-question">
          «{{ teacherQuestionText }}»
        </p>

        <div class="iv-coach-target-pill">
          <span>Verbo preguntado:</span>
          <strong>{{ promptDisplay }}</strong>
          <small>({{ currentVerb.es }})</small>
        </div>
      </div>

      <!-- Zona de respuesta por voz del alumno -->
      <div class="iv-student-response-zone">
        <div class="iv-mic-controls">
          <button
            type="button"
            class="iv-big-action-btn ask"
            @click="askQuestionOutLoud"
          >
            🗣️ 1. Que el profe me pregunte en voz alta
          </button>

          <button
            type="button"
            class="iv-big-action-btn mic"
            :class="{ listening: isListening }"
            :disabled="!speechSupported"
            @click="toggleListening"
          >
            <span>{{ isListening ? '🛑 Escuchando tu voz...' : '🎙️ 2. Responder en voz alta' }}</span>
          </button>
        </div>

        <p v-if="studentTranscript" class="iv-transcript-pill">
          🗣️ Tu respuesta por voz: <strong>"{{ studentTranscript }}"</strong>
        </p>

        <!-- Alternativa escrita por si el micrófono no está disponible -->
        <form class="iv-coach-fallback-form" @submit.prevent="submitManualAnswer">
          <input
            v-model="manualAnswer"
            type="text"
            class="iv-write-input"
            :placeholder="askPast ? 'O escribe aquí el PASADO si no usas micrófono...' : 'O escribe aquí el PRESENTE si no usas micrófono...'"
          />
          <button type="submit" class="iv-check-btn" :disabled="!manualAnswer.trim()">
            Responder
          </button>
        </form>
      </div>

      <!-- CORRECCIÓN EN VOZ ALTA DEL PROFE -->
      <div v-if="coachFeedback" class="iv-speech-bubble correction" :class="wasCorrect ? 'ok' : 'ko'">
        <div class="iv-bubble-top">
          <strong>{{ wasCorrect ? '🌟 Teacher says (¡Correcto!):' : '📢 Teacher corrects you (Escucha y repite):' }}</strong>
          <button type="button" class="iv-repeat-q-btn" @click="speakCorrectionAgain">
            🔊 Volver a oír la corrección
          </button>
        </div>
        <p class="iv-correction-text">«{{ coachFeedback }}»</p>
        <div class="iv-pair-summary">
          Present: <strong>{{ currentVerb.present }}</strong> ↔ Past: <strong>{{ currentVerb.past }}</strong>
          <span>({{ currentVerb.es }})</span>
        </div>

        <div class="iv-fb-actions" style="margin-top: 0.65rem;">
          <button
            v-if="!wasCorrect"
            type="button"
            class="iv-retry-btn"
            @click="repeatCurrentQuestion"
          >
            🔁 Volver a intentar esta misma pregunta ({{ promptDisplay }})
          </button>
          <button
            v-if="wasCorrect"
            type="button"
            class="iv-next-btn"
            @click="pickNewQuestion(true)"
          >
            ▶️ Siguiente pregunta diferente ahora →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onBeforeUnmount } from 'vue'
import { VERB_FAMILIES, ALL_IRREGULAR_VERBS } from '../amco/irregularVerbsData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const direction = ref('both') // 'p2past' | 'past2p' | 'both'
const selectedFamilyId = ref('all')
const autoListenAfterQuestion = ref(true)

const askPast = ref(true)
const currentVerb = ref(null)

const isTeacherSpeaking = ref(false)
const isListening = ref(false)
const speechSupported = ref(false)
const studentTranscript = ref('')
const manualAnswer = ref('')

const coachFeedback = ref('')
const lastSpokenCorrection = ref('')
const wasCorrect = ref(false)
const streak = ref(0)
const correctTotal = ref(0)

// Pesos para priorizar los verbos fallados
const weights = reactive({})
ALL_IRREGULAR_VERBS.forEach((v) => {
  weights[v.present] = 2
})

let recognition = null
let autoFlowTimer = null
const recentPresents = ref([])

function clearAutoFlowTimer() {
  if (autoFlowTimer) {
    clearTimeout(autoFlowTimer)
    autoFlowTimer = null
  }
}

const pool = computed(() => {
  if (selectedFamilyId.value === 'all') return ALL_IRREGULAR_VERBS
  const fam = VERB_FAMILIES.find((f) => f.id === selectedFamilyId.value)
  return fam ? fam.verbs : ALL_IRREGULAR_VERBS
})

const promptDisplay = computed(() => {
  if (!currentVerb.value) return ''
  return askPast.value ? currentVerb.value.present : currentVerb.value.past
})

const expectedDisplay = computed(() => {
  if (!currentVerb.value) return ''
  return askPast.value ? currentVerb.value.past : currentVerb.value.present
})

const teacherQuestionText = computed(() => {
  if (!currentVerb.value) return ''
  if (askPast.value) {
    return `What is the PAST form of "${currentVerb.value.present}"?`
  }
  return `What is the PRESENT form of "${currentVerb.value.past}"?`
})

const teacherQuestionSpoken = computed(() => {
  if (!currentVerb.value) return ''
  if (askPast.value) {
    return `What is the past form of: ${currentVerb.value.present}?`
  }
  const pastSpoken = currentVerb.value.pastTts || currentVerb.value.past
  return `What is the present form of: ${pastSpoken}?`
})

function speakWithCallback(text, rate = 0.92, onEnd = null) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onEnd) onEnd()
    return
  }
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = rate
    isTeacherSpeaking.value = true
    utter.onend = () => {
      isTeacherSpeaking.value = false
      if (onEnd) onEnd()
    }
    utter.onerror = () => {
      isTeacherSpeaking.value = false
    }
    window.speechSynthesis.speak(utter)
  } catch {
    isTeacherSpeaking.value = false
  }
}

function askQuestionOutLoud() {
  clearAutoFlowTimer()
  stopListening()
  coachFeedback.value = ''
  studentTranscript.value = ''
  speakWithCallback(teacherQuestionSpoken.value, 0.92, () => {
    if (autoListenAfterQuestion.value && speechSupported.value) {
      startListening()
    }
  })
}

function repeatCurrentQuestion() {
  clearAutoFlowTimer()
  stopListening()
  studentTranscript.value = ''
  manualAnswer.value = ''
  coachFeedback.value = ''
  askQuestionOutLoud()
}

function speakCorrectionAgain() {
  if (!lastSpokenCorrection.value) return
  speakWithCallback(lastSpokenCorrection.value, 0.9)
}

function pickWeightedVerb(list, excludePresents = []) {
  let candidates = list.filter((v) => !excludePresents.includes(v.present))
  if (!candidates.length && excludePresents.length > 0) {
    candidates = list.filter((v) => v.present !== excludePresents[0])
  }
  if (!candidates.length) candidates = list

  const bag = []
  candidates.forEach((v) => {
    const w = weights[v.present] || 2
    for (let i = 0; i < w; i += 1) bag.push(v)
  })
  return bag[Math.floor(Math.random() * bag.length)] || candidates[0]
}

function pickNewQuestion(speakNow = false) {
  clearAutoFlowTimer()
  stopListening()
  if (direction.value === 'p2past') askPast.value = true
  else if (direction.value === 'past2p') askPast.value = false
  else askPast.value = Math.random() < 0.5

  const prev = currentVerb.value?.present || ''
  if (prev) {
    recentPresents.value = [prev, ...recentPresents.value.filter((p) => p !== prev)].slice(0, 3)
  }
  currentVerb.value = pickWeightedVerb(pool.value, recentPresents.value)
  studentTranscript.value = ''
  manualAnswer.value = ''
  coachFeedback.value = ''
  lastSpokenCorrection.value = ''

  if (speakNow) {
    askQuestionOutLoud()
  }
}

function changeDirection(dir) {
  direction.value = dir
  pickNewQuestion(false)
}

function evaluateAnswer(candidatesList) {
  if (!currentVerb.value) return
  clearAutoFlowTimer()
  const validList = askPast.value
    ? [
        ...(currentVerb.value.pastHomophones || []),
        ...(currentVerb.value.acceptedWrittenPast || []),
        currentVerb.value.past.toLowerCase(),
      ]
    : [
        ...(currentVerb.value.presentHomophones || []),
        currentVerb.value.present.toLowerCase(),
      ]

  const isOk = candidatesList.some((cand) => {
    const clean = cand.trim().toLowerCase()
    const words = clean.split(/\s+/)
    return validList.includes(clean) || words.some((w) => validList.includes(w))
  })

  wasCorrect.value = isOk
  const pastSpoken = currentVerb.value.pastTts || currentVerb.value.past
  const presentSpoken = currentVerb.value.present

  if (isOk) {
    streak.value += 1
    correctTotal.value += 1
    weights[currentVerb.value.present] = Math.max(1, (weights[currentVerb.value.present] || 2) - 1)

    if (askPast.value) {
      coachFeedback.value = `Great job! The past of "${currentVerb.value.present}" is "${currentVerb.value.past}"! Pasando a una pregunta diferente...`
      lastSpokenCorrection.value = `Great job! The past of ${presentSpoken} is ${pastSpoken}!`
    } else {
      coachFeedback.value = `Awesome! The present of "${currentVerb.value.past}" is "${currentVerb.value.present}"! Pasando a una pregunta diferente...`
      lastSpokenCorrection.value = `Awesome! The present of ${pastSpoken} is ${presentSpoken}!`
    }

    const max = props.exercise?.maxScore || 20
    if (correctTotal.value >= 5) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: `${correctTotal.value} respuestas orales verificadas por el Speaking Coach!`,
        },
      })
    }

    // Al acertar, tras el elogio del profe salta automáticamente a otra pregunta diferente
    speakWithCallback(lastSpokenCorrection.value, 0.95, () => {
      autoFlowTimer = setTimeout(() => {
        pickNewQuestion(true)
      }, 650)
    })
  } else {
    streak.value = 0
    weights[currentVerb.value.present] = Math.min(8, (weights[currentVerb.value.present] || 2) + 3)

    // Si falla, NO cambia de pregunta: corrige y repite la misma pregunta hasta que la acierte
    if (askPast.value) {
      coachFeedback.value = `Almost! The past of "${currentVerb.value.present}" is "${currentVerb.value.past}". Repetimos la misma pregunta: What is the PAST form of "${currentVerb.value.present}"?`
      lastSpokenCorrection.value = `Almost! Listen carefully: the past of ${presentSpoken} is ${pastSpoken}. Let's repeat the question: ${teacherQuestionSpoken.value}`
    } else {
      coachFeedback.value = `Not quite! The present of "${currentVerb.value.past}" is "${currentVerb.value.present}". Repetimos la misma pregunta: What is the PRESENT form of "${currentVerb.value.past}"?`
      lastSpokenCorrection.value = `Not quite! Listen carefully: the present of ${pastSpoken} is ${presentSpoken}. Let's repeat the question: ${teacherQuestionSpoken.value}`
    }

    speakWithCallback(lastSpokenCorrection.value, 0.9, () => {
      if (autoListenAfterQuestion.value && speechSupported.value) {
        startListening()
      }
    })
  }
}

function submitManualAnswer() {
  if (!manualAnswer.value.trim()) return
  studentTranscript.value = manualAnswer.value.trim()
  evaluateAnswer([manualAnswer.value.trim()])
  manualAnswer.value = ''
}

function initRecognition() {
  if (typeof window === 'undefined') return
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) {
    speechSupported.value = false
    return
  }
  speechSupported.value = true
  recognition = new SR()
  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.interimResults = false
  recognition.maxAlternatives = 5

  recognition.onresult = (event) => {
    isListening.value = false
    const res = event.results?.[0]
    if (!res) return
    const alts = []
    for (let i = 0; i < res.length; i += 1) {
      alts.push(res[i].transcript.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, ''))
    }
    studentTranscript.value = alts[0] || ''
    evaluateAnswer(alts)
  }

  recognition.onerror = () => {
    isListening.value = false
  }

  recognition.onend = () => {
    isListening.value = false
  }
}

function startListening() {
  if (!speechSupported.value || !recognition || isListening.value) return
  try {
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    isTeacherSpeaking.value = false
    isListening.value = true
    recognition.start()
  } catch {
    isListening.value = false
  }
}

function stopListening() {
  if (recognition && isListening.value) {
    try {
      recognition.stop()
    } catch {
      // ignore
    }
  }
  isListening.value = false
}

function toggleListening() {
  if (isListening.value) stopListening()
  else startListening()
}

onMounted(() => {
  initRecognition()
  pickNewQuestion(false)
})

onBeforeUnmount(() => {
  clearAutoFlowTimer()
  stopListening()
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
})
</script>

