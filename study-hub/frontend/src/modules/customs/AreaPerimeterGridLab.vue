<template>
  <div class="pa-lab">
    <div class="pa-row">
      <button
        type="button"
        class="pa-pill"
        :class="{ on: mode === 'explore' }"
        @click="mode = 'explore'"
      >
        📐 Explorador visual (Quadrat / Rectangle)
      </button>
      <button
        type="button"
        class="pa-pill"
        :class="{ on: mode === 'challenge' }"
        @click="startChallenge"
      >
        🎯 Repte de càlcul ({{ correctCount }}/{{ needed }})
      </button>
    </div>

    <!-- MODO 1: EXPLORADOR VISUAL -->
    <template v-if="mode === 'explore'">
      <div class="pa-controls">
        <div class="pa-slider-group">
          <label>
            Base (amplada): <strong>{{ base }} cm</strong>
          </label>
          <input v-model.number="base" type="range" min="2" max="12" step="1">
        </div>
        <div class="pa-slider-group">
          <label>
            Altura: <strong>{{ height }} cm</strong>
          </label>
          <input v-model.number="height" type="range" min="2" max="10" step="1">
        </div>
        <button type="button" class="ex-btn" @click="makeSquare">
          ⬛ Fer-lo Quadrat ({{ base }}×{{ base }})
        </button>
      </div>

      <div class="pa-stage">
        <div class="pa-grid-wrapper">
          <div class="pa-dim-top">Base = {{ base }} cm</div>
          <div class="pa-grid-mid">
            <div class="pa-dim-side">Altura = {{ height }} cm</div>
            <div
              class="pa-unit-grid"
              :style="{
                gridTemplateColumns: `repeat(${base}, 26px)`,
                gridTemplateRows: `repeat(${height}, 26px)`,
              }"
            >
              <div
                v-for="n in base * height"
                :key="n"
                class="pa-unit-cell"
              />
            </div>
          </div>
        </div>

        <div class="pa-stats-card">
          <div class="pa-shape-tag">
            {{ base === height ? '⬛ QUADRAT (4 costats iguals)' : '▭ RECTANGLE (costats iguals 2 a 2)' }}
          </div>

          <div class="pa-stat-box perim">
            <div class="pa-stat-title">🚧 PERÍMETRE (La tanca exterior)</div>
            <div class="pa-stat-formula">
              <span v-if="base === height">
                {{ base }} + {{ base }} + {{ base }} + {{ base }} = 4 × {{ base }}
              </span>
              <span v-else>
                {{ base }} + {{ base }} + {{ height }} + {{ height }}
              </span>
            </div>
            <div class="pa-stat-result">{{ 2 * (base + height) }} cm</div>
          </div>

          <div class="pa-stat-box area">
            <div class="pa-stat-title">🟩 ÀREA (Els quadradets de dins)</div>
            <div class="pa-stat-formula">
              {{ base }} columnes × {{ height }} files = {{ base }} × {{ height }}
            </div>
            <div class="pa-stat-result">{{ base * height }} cm²</div>
          </div>
        </div>
      </div>
    </template>

    <!-- MODO 2: REPTE DE CÀLCUL -->
    <template v-else>
      <div v-if="challenge" class="pa-stage">
        <div class="pa-grid-wrapper">
          <div class="pa-dim-top">Base = {{ challenge.b }} cm</div>
          <div class="pa-grid-mid">
            <div class="pa-dim-side">Altura = {{ challenge.h }} cm</div>
            <div
              class="pa-unit-grid"
              :style="{
                gridTemplateColumns: `repeat(${challenge.b}, 24px)`,
                gridTemplateRows: `repeat(${challenge.h}, 24px)`,
              }"
            >
              <div
                v-for="n in challenge.b * challenge.h"
                :key="n"
                class="pa-unit-cell"
              />
            </div>
          </div>
        </div>

        <div class="pa-stats-card">
          <div class="pa-shape-tag">
            {{ challenge.b === challenge.h ? `⬛ Quadrat de costat ${challenge.b} cm` : `▭ Rectangle de ${challenge.b} cm × ${challenge.h} cm` }}
          </div>

          <form class="pa-challenge-form" @submit.prevent="checkChallenge">
            <label class="pa-input-row">
              <span>🚧 Perímetre (cm):</span>
              <input
                v-model="ansPerim"
                type="number"
                class="input-hub"
                placeholder="Suma dels 4 costats"
                :disabled="locked"
              >
            </label>

            <label class="pa-input-row">
              <span>🟩 Àrea (cm²):</span>
              <input
                v-model="ansArea"
                type="number"
                class="input-hub"
                placeholder="Base × Altura"
                :disabled="locked"
              >
            </label>

            <div class="pa-row" style="margin-top:0.35rem">
              <button type="submit" class="ex-btn ex-btn-primary" :disabled="locked">
                Comprovar
              </button>
              <button type="button" class="ex-btn" :disabled="locked" @click="nextChallenge">
                🎲 Una altra figura
              </button>
            </div>
          </form>

          <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'" style="margin-top:0.5rem">
            {{ feedback }}
          </p>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useLabAttemptLock } from '@/composables/useLabAttemptLock.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const { locked, canCheck, unlockForNext, lockAfterCorrect, clearTimer } = useLabAttemptLock()

const mode = ref('explore')
const base = ref(6)
const height = ref(4)

const challenge = ref(null)
const ansPerim = ref('')
const ansArea = ref('')
const feedback = ref('')
const ok = ref(false)
const correctCount = ref(0)
const needed = 4

function makeSquare() {
  height.value = base.value
}

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function nextChallenge() {
  clearTimer()
  unlockForNext()
  const isSq = Math.random() < 0.4
  const b = randInt(3, 10)
  const h = isSq ? b : randInt(2, 9)
  challenge.value = { b, h, p: 2 * (b + h), a: b * h }
  ansPerim.value = ''
  ansArea.value = ''
  feedback.value = ''
  ok.value = false
}

function startChallenge() {
  mode.value = 'challenge'
  if (!challenge.value) nextChallenge()
}

function checkChallenge() {
  if (!challenge.value || !canCheck()) return
  const pOk = Number(ansPerim.value) === challenge.value.p
  const aOk = Number(ansArea.value) === challenge.value.a
  ok.value = pOk && aOk

  if (ok.value) {
    feedback.value = `Perfecte! Perímetre = ${challenge.value.p} cm i Àrea = ${challenge.value.a} cm².`
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: `${correctCount.value} figures calculades (perímetre i àrea)!`,
        },
      })
    }
    lockAfterCorrect(900, nextChallenge)
  } else if (!pOk && !aOk) {
    feedback.value = `Revisa tots dos: el perímetre és ${challenge.value.p} cm (suma dels 4 costats) i l'àrea és ${challenge.value.a} cm² (${challenge.value.b} × ${challenge.value.h}).`
  } else if (!pOk) {
    feedback.value = `L'àrea (${challenge.value.a} cm²) està molt bé! Però el perímetre és ${challenge.value.p} cm (${challenge.value.b} + ${challenge.value.b} + ${challenge.value.h} + ${challenge.value.h}).`
  } else {
    feedback.value = `El perímetre (${challenge.value.p} cm) està molt bé! Però l'àrea és ${challenge.value.a} cm² (${challenge.value.b} × ${challenge.value.h}).`
  }
}
</script>

