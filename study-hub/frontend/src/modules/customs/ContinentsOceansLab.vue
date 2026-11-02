<template>
  <div class="cont-lab">
    <div class="cont-modes">
      <button type="button" class="ex-btn" :class="{ 'ex-btn-primary': mode === 'explore' }" @click="setMode('explore')">🔍 Explorar</button>
      <button type="button" class="ex-btn" :class="{ 'ex-btn-primary': mode === 'paint' }" @click="setMode('paint')">🎨 Pintar</button>
      <button type="button" class="ex-btn" :class="{ 'ex-btn-primary': mode === 'quiz' }" @click="setMode('quiz')">❓ Quiz (10)</button>
    </div>

    <div v-if="mode === 'paint'" class="paint-palette">
      <button
        v-for="c in continentList"
        :key="'sw-' + c.id"
        type="button"
        class="swatch"
        :class="{ active: paintContId === c.id }"
        :style="{ background: c.color }"
        :title="c.colorName + ' → ' + c.name"
        @click="selectPaint(c)"
      >
        {{ c.icon }}
      </button>
      <p class="match-hint" style="margin: 0; flex: 1;">{{ paintFeedback }}</p>
    </div>

    <div v-if="mode === 'quiz'" class="quiz-banner">
      <strong>Pregunta {{ quizIndex + 1 }}/{{ CONTINENT_QUIZ.length }}:</strong>
      {{ currentQuiz?.text }}
      <span class="match-hint" style="display: block; margin-top: 0.25rem;">💡 {{ currentQuiz?.hint }}</span>
      <span style="font-weight: 800; margin-left: 0.5rem;">✅ {{ quizHits }}</span>
    </div>

    <div class="cont-map-wrap" v-if="paths">
      <svg viewBox="0 0 1000 500" class="cont-svg" aria-label="Mapamundi continents">
        <rect width="1000" height="500" fill="#0c4a6e" />
        <path
          v-for="c in continentList"
          :key="c.id"
          :d="paths[c.id]"
          :fill="fillFor(c.id)"
          :stroke="selectedId === c.id ? '#fbbf24' : '#0f172a'"
          :stroke-width="selectedId === c.id ? 2.5 : 0.8"
          class="cont-path"
          @click="onContinent(c.id)"
        />
        <text
          v-for="lab in CONTINENT_LABELS"
          :key="lab.text + lab.x"
          :x="lab.x"
          :y="lab.y"
          class="cont-label"
          @click="onContinent(lab.contId)"
        >{{ lab.text }}</text>
        <g
          v-for="(b, i) in OCEAN_BADGES"
          :key="'ob-' + i"
          class="ocean-badge"
          @click="onOcean(b.id)"
        >
          <rect :x="b.x - 70" :y="b.y - 12" width="140" height="22" rx="8" fill="rgba(15,23,42,0.55)" />
          <text :x="b.x" :y="b.y + 4" text-anchor="middle" class="ocean-text">{{ b.text }}</text>
        </g>
      </svg>
    </div>
    <p v-else class="match-hint">Carregant mapa SVG…</p>

    <div v-if="mode === 'explore' && exploreInfo" class="explore-card">
      <h4 style="margin: 0 0 0.35rem;">{{ exploreInfo.icon }} {{ exploreInfo.name }}</h4>
      <p v-if="exploreInfo.hemisferis"><strong>Hemisferis:</strong> {{ exploreInfo.hemisferis }}</p>
      <p v-if="exploreInfo.linees"><strong>Línies:</strong> {{ exploreInfo.linees }}</p>
      <p v-if="exploreInfo.oceans"><strong>Oceans:</strong> {{ exploreInfo.oceans }}</p>
      <p><strong>Curiositat:</strong> {{ exploreInfo.curiositat }}</p>
    </div>

    <p v-if="quizFb" class="feedback-msg" :class="quizOk ? 'feedback-ok' : 'feedback-bad'">{{ quizFb }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  CONTINENTS_DATA,
  CONTINENT_LABELS,
  CONTINENT_QUIZ,
  OCEAN_BADGES,
  OCEANS_DATA,
  SVG_PATHS_URL,
} from '@/modules/projecte/coordenadasData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const mode = ref('explore')
const paths = ref(null)
const selectedId = ref(null)
const exploreInfo = ref(null)
const painted = reactive({})
const paintColor = ref('#eab308')
const paintContId = ref('Americas')
const paintFeedback = ref('Tria un color de la paleta i pinta el continent correcte.')
const quizIndex = ref(0)
const quizHits = ref(0)
const quizFb = ref('')
const quizOk = ref(false)
const quizDone = ref(false)

const continentList = computed(() => Object.values(CONTINENTS_DATA))
const currentQuiz = computed(() => CONTINENT_QUIZ[quizIndex.value] || null)

onMounted(async () => {
  try {
    const res = await fetch(SVG_PATHS_URL)
    paths.value = await res.json()
  } catch {
    paths.value = {}
  }
})

function setMode(m) {
  mode.value = m
  quizFb.value = ''
  selectedId.value = null
  if (m === 'paint') {
    Object.keys(painted).forEach((k) => delete painted[k])
    paintFeedback.value = 'Tria un color i pinta cada continent amb el seu color de fitxa.'
  }
  if (m === 'quiz') {
    quizIndex.value = 0
    quizHits.value = 0
    quizDone.value = false
  }
}

function fillFor(id) {
  if (mode.value === 'paint') return painted[id] || '#94a3b8'
  if (mode.value === 'explore' && selectedId.value === id) return CONTINENTS_DATA[id].color
  return CONTINENTS_DATA[id]?.color || '#94a3b8'
}

function selectPaint(c) {
  paintContId.value = c.id
  paintColor.value = c.color
  paintFeedback.value = `Pinzell: ${c.colorName} per a ${c.name}`
}

function onContinent(id) {
  if (mode.value === 'explore') {
    selectedId.value = id
    exploreInfo.value = CONTINENTS_DATA[id]
  } else if (mode.value === 'paint') {
    painted[id] = paintColor.value
    const target = CONTINENTS_DATA[id]
    if (paintColor.value.toLowerCase() === target.color.toLowerCase()) {
      paintFeedback.value = `✨ ¡Molt bé! ${target.name} en ${target.colorName}.`
      const all = continentList.value.every(
        (c) => (painted[c.id] || '').toLowerCase() === c.color.toLowerCase(),
      )
      if (all) {
        paintFeedback.value = '🏆 ¡Tots els 6 continents amb els colors exactes!'
        emit('complete', {
          paint: true,
          _grade: { score: props.exercise?.maxScore || 6, maxScore: props.exercise?.maxScore || 6, feedback: 'Continents pintats' },
        })
      }
    } else {
      paintFeedback.value = `⚠️ ${target.name} hauria de ser ${target.colorName}.`
    }
  } else if (mode.value === 'quiz') {
    answerQuiz(id, false)
  }
}

function onOcean(id) {
  if (mode.value === 'explore') {
    selectedId.value = null
    exploreInfo.value = OCEANS_DATA[id]
  } else if (mode.value === 'quiz') {
    answerQuiz(id, true)
  }
}

function answerQuiz(id, isOcean) {
  if (quizDone.value || !currentQuiz.value) return
  const q = currentQuiz.value
  const ok = id === q.targetId && isOcean === q.isOcean
  quizOk.value = ok
  if (ok) {
    quizHits.value += 1
    quizFb.value = `✅ ${q.explanation}`
    if (quizIndex.value + 1 >= CONTINENT_QUIZ.length) {
      quizDone.value = true
      const max = props.exercise?.maxScore || 10
      emit('complete', {
        quizHits: quizHits.value,
        _grade: { score: quizHits.value, maxScore: max, feedback: `Quiz continents: ${quizHits.value}/10` },
      })
    } else {
      setTimeout(() => {
        quizIndex.value += 1
        quizFb.value = ''
      }, 900)
    }
  } else {
    quizFb.value = `❌ Incorrecte. ${q.hint}`
  }
  emit('update:modelValue', { quizHits: quizHits.value, quizIndex: quizIndex.value })
}
</script>

<style scoped>
.cont-lab { display: grid; gap: 0.75rem; }
.cont-modes { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.paint-palette { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.swatch {
  width: 42px; height: 42px; border-radius: 10px; border: 2px solid transparent;
  cursor: pointer; font-size: 0.85rem; display: grid; place-items: center;
}
.swatch.active { border-color: #fff; outline: 2px solid #0f172a; }
.quiz-banner {
  padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid var(--border-color);
  background: var(--bg-card); font-size: 0.92rem;
}
.cont-map-wrap {
  border-radius: 12px; overflow: hidden; border: 1px solid var(--border-color);
  background: #0c4a6e;
}
.cont-svg { width: 100%; height: auto; display: block; }
.cont-path { cursor: pointer; transition: fill 0.15s; }
.cont-path:hover { filter: brightness(1.08); }
.cont-label {
  fill: rgba(255,255,255,0.85); font-size: 11px; font-weight: 800;
  pointer-events: none; text-anchor: middle;
}
.ocean-badge { cursor: pointer; }
.ocean-text { fill: #e0f2fe; font-size: 10px; font-weight: 700; }
.explore-card {
  padding: 0.85rem 1rem; border-radius: 10px; border: 1px solid var(--border-color);
  background: var(--bg-card); font-size: 0.88rem; line-height: 1.5;
}
.explore-card p { margin: 0.25rem 0; }
</style>
