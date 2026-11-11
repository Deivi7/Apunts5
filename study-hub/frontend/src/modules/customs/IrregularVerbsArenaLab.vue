<template>
  <div class="iv-arena">
    <!-- BARRA SUPERIOR: RACHA, PROGRESO DEL NIVEL Y SONIDO -->
    <div class="iv-topbar">
      <div class="iv-stat-pill iv-streak" :class="{ hot: streak >= 3 }">
        <span>🔥</span>
        <div>
          <small>Racha (Streak)</small>
          <strong>{{ streak }} {{ streak === 1 ? 'acierto' : 'aciertos' }}</strong>
        </div>
      </div>

      <div class="iv-progress-wrap">
        <div class="iv-progress-head">
          <span>🎯 Dominio del nivel: <strong>{{ masteredCount }} / {{ activePool.length }}</strong> verbos</span>
          <span class="iv-xp-tag">⭐ {{ points }} pts</span>
        </div>
        <div class="iv-progress-bar">
          <div class="iv-progress-fill" :style="{ width: progressPct + '%' }"></div>
        </div>
      </div>

      <button
        type="button"
        class="iv-sound-toggle"
        :title="soundEnabled ? 'Sonido activado' : 'Silenciado'"
        @click="soundEnabled = !soundEnabled"
      >
        {{ soundEnabled ? '🔊 SFX On' : '🔇 SFX Off' }}
      </button>
    </div>

    <!-- SELECTOR DE NIVELES POR FAMILIAS FONÉTICAS -->
    <div class="iv-levels-strip">
      <button
        v-for="fam in VERB_FAMILIES"
        :key="fam.id"
        type="button"
        class="iv-level-chip"
        :class="{ active: selectedLevelId === fam.id }"
        :style="selectedLevelId === fam.id ? { background: fam.color, borderColor: fam.color, color: '#fff' } : {}"
        @click="selectLevel(fam.id)"
      >
        <span>{{ fam.icon }}</span>
        <span>{{ fam.shortTitle }}</span>
        <small>({{ fam.verbs.length }})</small>
      </button>

      <button
        type="button"
        class="iv-level-chip iv-level-all"
        :class="{ active: selectedLevelId === 'all' }"
        @click="selectLevel('all')"
      >
        <span>🏆</span>
        <span>Mix Todos (57)</span>
      </button>
    </div>

    <!-- REGLA FONÉTICA DEL NIVEL ACTUAL -->
    <div class="iv-family-banner" :style="{ borderLeftColor: currentFamilyMeta.color }">
      <div>
        <strong>{{ currentFamilyMeta.icon }} {{ currentFamilyMeta.title }}:</strong>
        <span>{{ currentFamilyMeta.rule }}</span>
      </div>
    </div>

    <!-- SELECTOR DE MODO DE JUEGO + DIRECCIÓN (PRESENTE <-> PASADO) -->
    <div class="iv-controls-row">
      <div class="iv-mode-tabs">
        <button
          type="button"
          class="iv-mode-tab"
          :class="{ active: gameMode === 'voice' }"
          @click="setGameMode('voice')"
        >
          🎙️ 1. Dilo en voz alta
        </button>
        <button
          type="button"
          class="iv-mode-tab"
          :class="{ active: gameMode === 'options' }"
          @click="setGameMode('options')"
        >
          ⚡ 2. Opciones rápidas (4)
        </button>
        <button
          type="button"
          class="iv-mode-tab"
          :class="{ active: gameMode === 'write' }"
          @click="setGameMode('write')"
        >
          ⌨️ 3. Modo escribir
        </button>
      </div>

      <div class="iv-dir-tabs">
        <button
          type="button"
          class="iv-dir-btn"
          :class="{ active: directionMode === 'p2past' }"
          @click="setDirection('p2past')"
        >
          Present → Past
        </button>
        <button
          type="button"
          class="iv-dir-btn"
          :class="{ active: directionMode === 'past2p' }"
          @click="setDirection('past2p')"
        >
          Past → Present
        </button>
        <button
          type="button"
          class="iv-dir-btn"
          :class="{ active: directionMode === 'mixed' }"
          @click="setDirection('mixed')"
        >
          🔀 Mixto ↔
        </button>
      </div>
    </div>

    <!-- TARJETA CENTRAL DE JUEGO -->
    <div v-if="currentVerb" class="iv-stage-card" :class="cardAnimClass">
      <!-- Confeti ligero al acertar -->
      <div v-if="showConfetti" class="iv-confetti-layer" aria-hidden="true">
        <span
          v-for="n in 18"
          :key="n"
          class="iv-confetti-piece"
          :style="confettiStyle(n)"
        ></span>
      </div>

      <div class="iv-prompt-header">
        <span class="iv-direction-badge" :class="activeAskPast ? 'to-past' : 'to-present'">
          {{ activeAskPast ? '🎯 Pasa de PRESENTE a PASADO (Present → Past)' : '⏪ Pasa de PASADO a PRESENTE (Past → Present)' }}
        </span>
        <span v-if="verbWeight(currentVerb.present) > 2" class="iv-repeat-badge">
          🔁 Refuerzo activo (fallado antes)
        </span>
      </div>

      <!-- VERBO MOSTRADO EN GRANDE -->
      <div class="iv-verb-showcase">
        <div class="iv-verb-label">
          {{ activeAskPast ? 'PRESENT (Infinitivo)' : 'PAST SIMPLE (Pasado)' }}
        </div>
        <div class="iv-verb-word-row">
          <h3 class="iv-verb-big">{{ promptWord }}</h3>
          <button
            type="button"
            class="iv-speak-mini"
            title="Escuchar pronunciación"
            @click="speakPromptWord"
          >
            🔊 Escuchar
          </button>
        </div>
        <div class="iv-verb-meaning">
          🇬🇧 Significado: <strong>«{{ currentVerb.es }}»</strong>
          <span v-if="currentVerb.note" class="iv-verb-note">· 💡 {{ currentVerb.note }}</span>
        </div>
      </div>

      <!-- ==================== MODO 1: VOZ ("DILO EN VOZ ALTA") ==================== -->
      <div v-if="gameMode === 'voice'" class="iv-mode-body iv-voice-body">
        <p class="iv-instruction">
          Pulsa el micrófono y pronuncia en inglés el
          <strong>{{ activeAskPast ? 'PASADO (Past)' : 'PRESENTE (Present)' }}</strong>
          de <strong>{{ promptWord }}</strong>:
        </p>

        <div class="iv-mic-zone">
          <button
            type="button"
            class="iv-mic-btn"
            :class="{ listening: isListening }"
            :disabled="!speechSupported || roundResolved"
            @click="toggleSpeechRecognition"
          >
            <span class="iv-mic-icon">{{ roundResolved && lastSuccess ? '🔒' : isListening ? '🛑' : '🎙️' }}</span>
            <span>{{ roundResolved && lastSuccess ? '¡Correcto! Cargando siguiente...' : isListening ? 'Escuchando... ¡Habla ahora!' : 'Pulsar y decir en inglés' }}</span>
          </button>

          <button
            type="button"
            class="iv-listen-model-btn"
            :disabled="roundResolved && lastSuccess"
            @click="speakTargetAnswer"
          >
            👂 Escuchar cómo se pronuncia
          </button>
        </div>

        <p v-if="spokenTranscript" class="iv-transcript-pill">
          🗣️ Has dicho: <strong>"{{ spokenTranscript }}"</strong>
        </p>

        <!-- Botón alternativo si el micrófono no está disponible o falla -->
        <div class="iv-mic-fallback">
          <span v-if="!speechSupported" class="iv-warn-text">
            ⚠️ Tu navegador no tiene reconocimiento de voz activo en este dispositivo.
          </span>
          <button
            type="button"
            class="iv-fallback-btn"
            :disabled="roundResolved"
            @click="showVoiceFallbackOptions = !showVoiceFallbackOptions"
          >
            {{ showVoiceFallbackOptions ? 'Ocultar botones de apoyo' : '🎛️ ¿Sin micrófono? Responder con botones rápidos' }}
          </button>
          <button
            type="button"
            class="iv-fallback-btn"
            :disabled="roundResolved"
            @click="setGameMode('options')"
          >
            ⚡ Cambiar a Modo 4 Opciones
          </button>
        </div>

        <div v-if="showVoiceFallbackOptions" class="iv-options-grid" style="margin-top: 0.75rem;">
          <button
            v-for="opt in currentOptions"
            :key="opt"
            type="button"
            class="iv-option-btn"
            :class="optionStateClass(opt)"
            :disabled="roundResolved"
            @click="submitOption(opt)"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <!-- ==================== MODO 2: OPCIONES RÁPIDAS (4 BOTONES) ==================== -->
      <div v-else-if="gameMode === 'options'" class="iv-mode-body">
        <p class="iv-instruction">
          Elige el <strong>{{ activeAskPast ? 'PASADO (Past)' : 'PRESENTE (Present)' }}</strong> correcto de <strong>{{ promptWord }}</strong>:
        </p>
        <div class="iv-options-grid">
          <button
            v-for="opt in currentOptions"
            :key="opt"
            type="button"
            class="iv-option-btn"
            :class="optionStateClass(opt)"
            :disabled="roundResolved"
            @click="submitOption(opt)"
          >
            {{ opt }}
          </button>
        </div>
      </div>

      <!-- ==================== MODO 3: ESCRIBIR ==================== -->
      <div v-else class="iv-mode-body">
        <p class="iv-instruction">
          Escribe el <strong>{{ activeAskPast ? 'PASADO (Past)' : 'PRESENTE (Present)' }}</strong> de <strong>{{ promptWord }}</strong> y pulsa Enter:
        </p>
        <form class="iv-write-form" @submit.prevent="submitWritten">
          <input
            ref="writeInputRef"
            v-model="writtenInput"
            type="text"
            class="iv-write-input"
            :placeholder="activeAskPast ? 'Escribe el pasado en inglés...' : 'Escribe el presente en inglés...'"
            :disabled="roundResolved"
            autocomplete="off"
            autocapitalize="none"
            spellcheck="false"
          />
          <button type="submit" class="iv-check-btn" :disabled="roundResolved || !writtenInput.trim()">
            ✅ Comprobar
          </button>
          <button
            type="button"
            class="iv-hint-btn"
            :disabled="roundResolved || hintUsed"
            @click="revealFirstLastHint"
          >
            💡 Pista (1ª y última letra)
          </button>
        </form>

        <div v-if="hintText" class="iv-hint-banner">
          💡 <strong>Pista:</strong> Empieza y termina así: <code class="iv-hint-code">{{ hintText }}</code>
        </div>
      </div>

      <!-- FEEDBACK Y BOTONES DE SIGUIENTE / REINTENTAR -->
      <div v-if="feedbackMsg" class="iv-feedback-box" :class="lastSuccess ? 'ok' : 'ko'">
        <div class="iv-fb-text">
          <strong>{{ lastSuccess ? '🎉 ¡Correcto!' : '💡 ¡Casi! Escucha y fíjate bien:' }}</strong>
          <span>{{ feedbackMsg }}</span>
        </div>
        <div class="iv-fb-actions">
          <button
            v-if="!lastSuccess"
            type="button"
            class="iv-retry-btn"
            @click="retryCurrentVerb"
          >
            🔄 Reintentar este mismo verbo
          </button>
          <button
            v-if="lastSuccess"
            type="button"
            class="iv-next-btn"
            @click="nextVerb"
          >
            Siguiente verbo →
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { VERB_FAMILIES, ALL_IRREGULAR_VERBS } from '../amco/irregularVerbsData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const selectedLevelId = ref('invariables')
const gameMode = ref('options')
const directionMode = ref('p2past') // 'p2past' | 'past2p' | 'mixed'
const activeAskPast = ref(true)

const streak = ref(0)
const points = ref(0)
const soundEnabled = ref(true)
const showConfetti = ref(false)
const cardAnimClass = ref('')

// Algoritmo de repetición adaptativa: peso y estado de dominio por verbo
const verbStats = reactive({})
ALL_IRREGULAR_VERBS.forEach((v) => {
  verbStats[v.present] = { weight: 2, mastered: false, fails: 0 }
})

const currentVerb = ref(null)
const currentOptions = ref([])
const writtenInput = ref('')
const writeInputRef = ref(null)
const hintUsed = ref(false)
const hintText = ref('')

const roundResolved = ref(false)
const lastSuccess = ref(false)
const selectedOption = ref('')
const feedbackMsg = ref('')

// Reconocimiento de voz
const speechSupported = ref(false)
const isListening = ref(false)
const spokenTranscript = ref('')
const showVoiceFallbackOptions = ref(false)
let recognitionInstance = null
let autoNextTimer = null

function clearAutoNextTimer() {
  if (autoNextTimer) {
    clearTimeout(autoNextTimer)
    autoNextTimer = null
  }
}

const currentFamilyMeta = computed(() => {
  if (selectedLevelId.value === 'all') {
    return {
      id: 'all',
      title: 'Nivel Boss · Todos los 57 Verbos Irregulares Mezclados',
      rule: 'Mezcla inteligente de las 7 familias: los verbos que falles saldrán más veces hasta que los domines.',
      icon: '🏆',
      color: '#4f46e5',
    }
  }
  return VERB_FAMILIES.find((f) => f.id === selectedLevelId.value) || VERB_FAMILIES[0]
})

const activePool = computed(() => {
  if (selectedLevelId.value === 'all') return ALL_IRREGULAR_VERBS
  const fam = VERB_FAMILIES.find((f) => f.id === selectedLevelId.value)
  return fam ? fam.verbs : ALL_IRREGULAR_VERBS
})

const masteredCount = computed(() =>
  activePool.value.filter((v) => verbStats[v.present]?.mastered).length,
)

const progressPct = computed(() => {
  if (!activePool.value.length) return 0
  return Math.round((masteredCount.value / activePool.value.length) * 100)
})

const promptWord = computed(() => {
  if (!currentVerb.value) return ''
  return activeAskPast.value ? currentVerb.value.present : currentVerb.value.past
})

const targetWord = computed(() => {
  if (!currentVerb.value) return ''
  return activeAskPast.value ? currentVerb.value.past : currentVerb.value.present
})

function verbWeight(presentKey) {
  return verbStats[presentKey]?.weight || 2
}

// ============================================================================
// WEB AUDIO API SOUND GENERATOR (Sin archivos externos)
// ============================================================================
function playTone(type) {
  if (!soundEnabled.value || typeof window === 'undefined') return
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    if (!AudioCtx) return
    const ctx = new AudioCtx()
    const now = ctx.currentTime

    if (type === 'success') {
      const notes = [523.25, 659.25, 783.99] // C5, E5, G5
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now + i * 0.08)
        gain.gain.setValueAtTime(0.14, now + i * 0.08)
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.22)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(now + i * 0.08)
        osc.stop(now + i * 0.08 + 0.24)
      })
    } else {
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'sine'
      osc.frequency.setValueAtTime(240, now)
      osc.frequency.linearRampToValueAtTime(180, now + 0.25)
      gain.gain.setValueAtTime(0.14, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.3)
    }
  } catch {
    // Ignore audio context restrictions
  }
}

// ============================================================================
// SPEECH SYNTHESIS (TTS en inglés)
// ============================================================================
function speakEnglish(text, rate = 0.92) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang = 'en-US'
    utter.rate = rate
    window.speechSynthesis.speak(utter)
  } catch {
    // Ignore TTS errors
  }
}

function speakPromptWord() {
  if (!currentVerb.value) return
  const spoken = activeAskPast.value
    ? currentVerb.value.present
    : currentVerb.value.pastTts || currentVerb.value.past
  speakEnglish(spoken)
}

function speakTargetAnswer() {
  if (!currentVerb.value) return
  const spoken = activeAskPast.value
    ? currentVerb.value.pastTts || currentVerb.value.past
    : currentVerb.value.present
  speakEnglish(spoken, 0.85)
}

// ============================================================================
// ALGORITMO DE SELECCIÓN ADAPTATIVA (Spaced Repetition en memoria)
// ============================================================================
function pickWeightedVerb(pool, excludePresent = '') {
  const candidates = pool.length > 1 ? pool.filter((v) => v.present !== excludePresent) : pool
  const weightedList = []
  candidates.forEach((v) => {
    const st = verbStats[v.present] || { weight: 2, mastered: false }
    const w = st.mastered ? 1 : Math.max(1, st.weight)
    for (let i = 0; i < w; i += 1) {
      weightedList.push(v)
    }
  })
  const randomIdx = Math.floor(Math.random() * weightedList.length)
  return weightedList[randomIdx] || candidates[0]
}

function buildOptionsForVerb(verb, askPast) {
  const correct = askPast ? verb.past : verb.present
  const sameFamPool = activePool.value
    .map((v) => (askPast ? v.past : v.present))
    .filter((w) => w !== correct)
  const globalPool = ALL_IRREGULAR_VERBS
    .map((v) => (askPast ? v.past : v.present))
    .filter((w) => w !== correct && !sameFamPool.includes(w))

  const shuffledFam = [...new Set(sameFamPool)].sort(() => Math.random() - 0.5)
  const shuffledGlobal = [...new Set(globalPool)].sort(() => Math.random() - 0.5)
  const distractors = [...shuffledFam, ...shuffledGlobal].slice(0, 3)

  return [correct, ...distractors].sort(() => Math.random() - 0.5)
}

function nextVerb() {
  clearAutoNextTimer()
  stopListening()
  if (directionMode.value === 'p2past') activeAskPast.value = true
  else if (directionMode.value === 'past2p') activeAskPast.value = false
  else activeAskPast.value = Math.random() < 0.5

  const prevKey = currentVerb.value?.present || ''
  currentVerb.value = pickWeightedVerb(activePool.value, prevKey)
  currentOptions.value = buildOptionsForVerb(currentVerb.value, activeAskPast.value)

  roundResolved.value = false
  lastSuccess.value = false
  selectedOption.value = ''
  writtenInput.value = ''
  hintUsed.value = false
  hintText.value = ''
  feedbackMsg.value = ''
  spokenTranscript.value = ''

  if (gameMode.value === 'write') {
    nextTick(() => writeInputRef.value?.focus())
  }
}

function retryCurrentVerb() {
  clearAutoNextTimer()
  stopListening()
  roundResolved.value = false
  lastSuccess.value = false
  selectedOption.value = ''
  writtenInput.value = ''
  feedbackMsg.value = ''
  spokenTranscript.value = ''
  if (gameMode.value === 'write') {
    nextTick(() => writeInputRef.value?.focus())
  }
}

function selectLevel(levelId) {
  selectedLevelId.value = levelId
  nextVerb()
}

function setGameMode(mode) {
  gameMode.value = mode
  showVoiceFallbackOptions.value = false
  retryCurrentVerb()
}

function setDirection(dir) {
  directionMode.value = dir
  nextVerb()
}

// ============================================================================
// VALIDACIÓN DE RESPUESTAS Y ACTUALIZACIÓN DE PESOS
// ============================================================================
function registerResult(isOk) {
  if (!currentVerb.value || roundResolved.value) return
  clearAutoNextTimer()
  stopListening()
  const st = verbStats[currentVerb.value.present]
  roundResolved.value = true
  lastSuccess.value = isOk

  const pairText = `${currentVerb.value.present} → ${currentVerb.value.past} (${currentVerb.value.es})`

  if (isOk) {
    streak.value += 1
    points.value += hintUsed.value ? 5 : 10
    if (!hintUsed.value) {
      st.weight = Math.max(1, st.weight - 1)
      st.mastered = true
    }
    feedbackMsg.value = `¡Genial! ${pairText}. Cargando siguiente verbo...`
    playTone('success')
    triggerCelebration()

    const max = props.exercise?.maxScore || 20
    if (points.value >= 40) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: `¡Excelente entrenamiento de verbos irregulares! Racha: ${streak.value}.`,
        },
      })
    }

    // Mantiene bloqueada la pregunta actual hasta que aparece la siguiente pregunta
    autoNextTimer = setTimeout(() => {
      nextVerb()
    }, 1100)
  } else {
    streak.value = 0
    st.fails += 1
    st.weight = Math.min(8, st.weight + 3) // Sale con mucha mayor frecuencia si falla
    st.mastered = false
    feedbackMsg.value = `La respuesta correcta es "${targetWord.value}" (${pairText}). ¡Escúchalo y vuelve a intentarlo!`
    playTone('error')
    speakTargetAnswer()
    cardAnimClass.value = 'iv-shake'
    setTimeout(() => {
      cardAnimClass.value = ''
    }, 500)
  }
}

function triggerCelebration() {
  cardAnimClass.value = 'iv-bounce'
  showConfetti.value = true
  setTimeout(() => {
    cardAnimClass.value = ''
    showConfetti.value = false
  }, 900)
}

function confettiStyle(n) {
  const colors = ['#f59e0b', '#10b981', '#3b82f6', '#ec4899', '#8b5cf6']
  const left = (n * 5.5) % 96
  const delay = (n % 5) * 0.05
  return {
    left: `${left}%`,
    background: colors[n % colors.length],
    animationDelay: `${delay}s`,
  }
}

// Modo Opciones
function submitOption(opt) {
  if (roundResolved.value) return
  selectedOption.value = opt
  const isOk = opt === targetWord.value
  registerResult(isOk)
}

function optionStateClass(opt) {
  if (!roundResolved.value) return ''
  if (opt === targetWord.value) return 'correct'
  if (opt === selectedOption.value && opt !== targetWord.value) return 'wrong'
  return ''
}

// Modo Escribir
function submitWritten() {
  if (roundResolved.value || !currentVerb.value) return
  const clean = writtenInput.value.trim().toLowerCase()
  if (!clean) return

  let isOk = false
  if (activeAskPast.value && currentVerb.value.acceptedWrittenPast) {
    isOk = currentVerb.value.acceptedWrittenPast.includes(clean)
  } else {
    isOk = clean === targetWord.value.toLowerCase()
  }
  registerResult(isOk)
}

function revealFirstLastHint() {
  if (!currentVerb.value) return
  hintUsed.value = true
  const word = targetWord.value
  if (word.length <= 2) {
    hintText.value = `${word[0]} _`
  } else {
    const middle = Array(word.length - 2).fill('_').join(' ')
    hintText.value = `${word[0].toUpperCase()} ${middle} ${word[word.length - 1].toUpperCase()}`
  }
}

// ============================================================================
// RECONOCIMIENTO DE VOZ (SpeechRecognition en-US)
// ============================================================================
function initSpeechRecognition() {
  if (typeof window === 'undefined') return
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition
  if (!SR) {
    speechSupported.value = false
    return
  }
  speechSupported.value = true
  recognitionInstance = new SR()
  recognitionInstance.lang = 'en-US'
  recognitionInstance.continuous = false
  recognitionInstance.interimResults = false
  recognitionInstance.maxAlternatives = 5

  recognitionInstance.onresult = (event) => {
    isListening.value = false
    if (roundResolved.value) return
    const results = event.results?.[0]
    if (!results) return
    const alternatives = []
    for (let i = 0; i < results.length; i += 1) {
      alternatives.push(results[i].transcript.trim().toLowerCase().replace(/[^a-z0-9\s-]/g, ''))
    }
    spokenTranscript.value = alternatives[0] || ''
    validateSpokenAlternatives(alternatives)
  }

  recognitionInstance.onerror = () => {
    isListening.value = false
  }

  recognitionInstance.onend = () => {
    isListening.value = false
  }
}

function validateSpokenAlternatives(alternatives) {
  if (!currentVerb.value || roundResolved.value) return
  const validList = activeAskPast.value
    ? currentVerb.value.pastHomophones || [currentVerb.value.past.toLowerCase()]
    : currentVerb.value.presentHomophones || [currentVerb.value.present.toLowerCase()]

  const matched = alternatives.some((alt) => {
    const words = alt.split(/\s+/)
    return validList.includes(alt) || words.some((w) => validList.includes(w))
  })
  registerResult(matched)
}

function toggleSpeechRecognition() {
  if (roundResolved.value || !speechSupported.value || !recognitionInstance) return
  if (isListening.value) {
    stopListening()
    return
  }
  feedbackMsg.value = ''
  spokenTranscript.value = ''
  try {
    isListening.value = true
    recognitionInstance.start()
  } catch {
    isListening.value = false
  }
}

function stopListening() {
  if (recognitionInstance && isListening.value) {
    try {
      recognitionInstance.stop()
    } catch {
      // ignore
    }
  }
  isListening.value = false
}

onMounted(() => {
  initSpeechRecognition()
  nextVerb()
})

onBeforeUnmount(() => {
  clearAutoNextTimer()
  stopListening()
})
</script>

