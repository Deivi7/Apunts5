<template>
  <div class="emat-gen-lab">
    <div class="exam-exercise-card" style="margin-bottom: 1rem;">
      <h4 style="margin: 0 0 0.5rem;">🔢 División aleatoria</h4>
      <p class="match-hint" style="margin: 0 0 0.65rem;">Como el legacy: quociente y resto, luego «Nueva división».</p>
      <p style="font-family: 'JetBrains Mono', monospace; font-size: 1.2rem; font-weight: 800;">
        {{ divProblem.dividend }} ÷ {{ divProblem.divisor }}
      </p>
      <div class="math-input-row" style="flex-wrap: wrap; gap: 0.5rem; margin-top: 0.65rem;">
        <label>Cociente</label>
        <input v-model="divQ" type="number" class="input-hub" style="width: 90px;">
        <label>Resto</label>
        <input v-model="divR" type="number" class="input-hub" style="width: 90px;">
        <button type="button" class="ex-btn ex-btn-primary" @click="checkDiv">Comprobar</button>
        <button type="button" class="ex-btn" @click="newDiv">Nueva división</button>
      </div>
      <p v-if="divFb" class="match-hint" :class="divOk ? 'feedback-ok' : 'feedback-bad'">{{ divFb }}</p>
    </div>

    <div class="exam-exercise-card">
      <h4 style="margin: 0 0 0.5rem;">📐 Rectángulo aleatorio</h4>
      <p class="match-hint" style="margin: 0 0 0.65rem;">Perímetro (m) y área (m²).</p>
      <p style="font-weight: 700;">Base = {{ rect.base }} m · Altura = {{ rect.height }} m</p>
      <div class="math-input-row" style="flex-wrap: wrap; gap: 0.5rem; margin-top: 0.65rem;">
        <label>Perímetro</label>
        <input v-model="rectP" type="number" class="input-hub" style="width: 100px;">
        <label>Área</label>
        <input v-model="rectA" type="number" class="input-hub" style="width: 100px;">
        <button type="button" class="ex-btn ex-btn-primary" @click="checkRect">Comprobar</button>
        <button type="button" class="ex-btn" @click="newRect">Nuevo rectángulo</button>
      </div>
      <p v-if="rectFb" class="match-hint" :class="rectOk ? 'feedback-ok' : 'feedback-bad'">{{ rectFb }}</p>
    </div>

    <p v-if="roundsOk >= targetRounds" class="feedback-ok" style="margin-top: 0.85rem;">
      Entrenador completado: {{ roundsOk }} aciertos seguidos en ambos tipos.
    </p>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const targetRounds = props.exercise?.maxScore || 4
const roundsOk = ref(0)

const divisors = [8, 12, 14, 15, 18, 22, 25, 30]
const divProblem = reactive({ dividend: 480, divisor: 15, q: 32, r: 0 })
const divQ = ref('')
const divR = ref('')
const divFb = ref('')
const divOk = ref(false)

const rect = reactive({ base: 35, height: 12, p: 94, a: 420 })
const rectP = ref('')
const rectA = ref('')
const rectFb = ref('')
const rectOk = ref(false)

function newDiv() {
  const d = divisors[Math.floor(Math.random() * divisors.length)]
  const q = Math.floor(Math.random() * 40) + 12
  const r = Math.floor(Math.random() * d)
  divProblem.divisor = d
  divProblem.q = q
  divProblem.r = r
  divProblem.dividend = d * q + r
  divQ.value = ''
  divR.value = ''
  divFb.value = ''
}

function newRect() {
  const b = Math.floor(Math.random() * 30) + 15
  const h = Math.floor(Math.random() * 20) + 10
  rect.base = b
  rect.height = h
  rect.p = 2 * (b + h)
  rect.a = b * h
  rectP.value = ''
  rectA.value = ''
  rectFb.value = ''
}

newDiv()
newRect()

function maybeComplete() {
  if (roundsOk.value >= targetRounds) {
    emit('complete', {
      score: targetRounds,
      _grade: {
        score: targetRounds,
        maxScore: targetRounds,
        feedback: `Entrenador EMAT: ${targetRounds} rondas correctas.`,
      },
    })
  }
}

function checkDiv() {
  const q = parseInt(divQ.value, 10)
  const r = parseInt(divR.value, 10)
  divOk.value = q === divProblem.q && r === divProblem.r
  divFb.value = divOk.value
    ? `Correcto: ${q} y resto ${r}. Prueba: ${divProblem.divisor}×${q}+${r}=${divProblem.dividend}.`
    : `Solución: cociente ${divProblem.q}, resto ${divProblem.r}.`
  if (divOk.value) {
    roundsOk.value += 1
    maybeComplete()
    setTimeout(newDiv, 800)
  }
}

function checkRect() {
  const p = parseInt(rectP.value, 10)
  const a = parseInt(rectA.value, 10)
  rectOk.value = p === rect.p && a === rect.a
  rectFb.value = rectOk.value
    ? `Correcto: P=${p} m, A=${a} m².`
    : `Revisa: P=2×(${rect.base}+${rect.height})=${rect.p}; A=${rect.base}×${rect.height}=${rect.a}.`
  if (rectOk.value) {
    roundsOk.value += 1
    maybeComplete()
    setTimeout(newRect, 800)
  }
}
</script>
