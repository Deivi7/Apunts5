<template>
  <div class="fe-lab">
    <div class="fe-row">
      <button
        type="button"
        class="fe-pill"
        :class="{ on: mode === 'findY' }"
        @click="setMode('findY')"
      >
        🎯 Troba la sortida (y)
      </button>
      <button
        type="button"
        class="fe-pill"
        :class="{ on: mode === 'findX' }"
        @click="setMode('findX')"
      >
        ⏪ Troba l'entrada (x)
      </button>
      <button
        type="button"
        class="fe-pill"
        :class="{ on: mode === 'findRule' }"
        @click="setMode('findRule')"
      >
        🕵️ Descobreix la norma (?)
      </button>
      <button type="button" class="ex-btn" :disabled="locked" @click="newItem">
        🎲 Nou repte
      </button>
    </div>

    <div v-if="item" class="fe-robot-stage">
      <!-- direcció dreta: x -> y -->
      <template v-if="item.dir === 'right'">
        <div class="fe-box" :class="{ unknown: mode === 'findX' }">
          <span class="fe-box-label">ENTRA (x)</span>
          <strong class="fe-box-val">{{ mode === 'findX' ? 'x = ?' : item.x }}</strong>
        </div>

        <div class="fe-arrow">──►</div>

        <div class="fe-robot-body" :class="{ unknown: mode === 'findRule' }">
          <div class="fe-robot-eyes">🤖</div>
          <div class="fe-robot-badge">
            {{ mode === 'findRule' ? 'Norma ?' : item.ruleStr }}
          </div>
        </div>

        <div class="fe-arrow">──►</div>

        <div class="fe-box" :class="{ unknown: mode === 'findY' }">
          <span class="fe-box-label">SURT (y)</span>
          <strong class="fe-box-val">{{ mode === 'findY' ? 'y = ?' : item.y }}</strong>
        </div>
      </template>

      <!-- direcció esquerra: y <- x (com a la pàg. 57) -->
      <template v-else>
        <div class="fe-box" :class="{ unknown: mode === 'findY' }">
          <span class="fe-box-label">SURT (y)</span>
          <strong class="fe-box-val">{{ mode === 'findY' ? 'y = ?' : item.y }}</strong>
        </div>

        <div class="fe-arrow">◄──</div>

        <div class="fe-robot-body" :class="{ unknown: mode === 'findRule' }">
          <div class="fe-robot-eyes">🤖</div>
          <div class="fe-robot-badge">
            {{ mode === 'findRule' ? 'Norma ?' : item.ruleStr }}
          </div>
        </div>

        <div class="fe-arrow">◄──</div>

        <div class="fe-box" :class="{ unknown: mode === 'findX' }">
          <span class="fe-box-label">ENTRA (x)</span>
          <strong class="fe-box-val">{{ mode === 'findX' ? 'x = ?' : item.x }}</strong>
        </div>
      </template>
    </div>

    <p v-if="item" class="match-hint" style="margin:0">
      <span v-if="item.dir === 'left'">
        ⚠️ <strong>Atenció a la fletxa inversa (◄──):</strong> el nombre entra per la dreta i surt per l'esquerra!
      </span>
      <span v-else>
        ➡️ La fletxa va d'esquerra a dreta: entra <strong>x</strong>, s'aplica la norma i surt <strong>y</strong>.
      </span>
    </p>

    <form class="fe-row" @submit.prevent="check">
      <div class="fe-quick-signs" v-if="mode === 'findRule'">
        <button type="button" class="ex-btn" @click="prependSign('+')">+</button>
        <button type="button" class="ex-btn" @click="prependSign('-')">−</button>
      </div>
      <input
        v-model="answer"
        class="input-hub"
        :placeholder="mode === 'findRule' ? 'Ex: +15 o -8' : 'Escriu el nombre…'"
        autocomplete="off"
        :disabled="locked"
      >
      <button type="submit" class="ex-btn ex-btn-primary" :disabled="locked">
        Comprovar
      </button>
      <button type="button" class="ex-btn" @click="showHint = !showHint">
        💡 Pista
      </button>
    </form>

    <p v-if="showHint && item" class="match-hint">
      {{ item.hint }}
    </p>
    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">
      {{ feedback }}
    </p>
    <p class="match-hint" style="margin:0">
      Robots resolts: <strong>{{ correctCount }} / {{ needed }}</strong>
    </p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useLabAttemptLock } from '@/composables/useLabAttemptLock.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const { locked, canCheck, unlockForNext, lockAfterCorrect, clearTimer } = useLabAttemptLock()

const mode = ref('findY')
const item = ref(null)
const answer = ref('')
const feedback = ref('')
const ok = ref(false)
const showHint = ref(false)
const correctCount = ref(0)
const needed = 5

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function buildItem() {
  const isSub = Math.random() < 0.3
  const delta = isSub ? -randInt(4, 18) : randInt(5, 35)
  const x = isSub ? randInt(Math.abs(delta) + 2, 45) : randInt(0, 35)
  const y = x + delta
  const ruleStr = delta >= 0 ? `+${delta}` : `${delta}`
  const dir = Math.random() < 0.4 ? 'left' : 'right'

  let hint = ''
  if (mode.value === 'findY') {
    hint = `Aplica la norma directament a l'entrada: ${x} ${delta >= 0 ? '+ ' + delta : '− ' + Math.abs(delta)} = ${y}.`
  } else if (mode.value === 'findX') {
    const inv = delta >= 0 ? `− ${delta}` : `+ ${Math.abs(delta)}`
    hint = `Truc del cangur (operació contrària): com que surt ${y} amb norma ${ruleStr}, fem ${y} ${inv} = ${x}.`
  } else {
    hint = `De ${x} fins a ${y}, quant hem sumat o restat? (${y} − ${x} = ${ruleStr}).`
  }

  return { x, y, delta, ruleStr, dir, hint }
}

function pick() {
  clearTimer()
  unlockForNext()
  item.value = buildItem()
  answer.value = ''
  feedback.value = ''
  ok.value = false
  showHint.value = false
}

function setMode(m) {
  mode.value = m
  pick()
}

function newItem() {
  if (locked.value) return
  pick()
}

function prependSign(s) {
  const clean = answer.value.replace(/^[+-−]/, '').trim()
  answer.value = `${s}${clean}`
}

function check() {
  if (!item.value || !canCheck()) return
  const raw = answer.value.trim().replace('−', '-')
  const num = Number(raw.replace(/^\+/, ''))

  let expected = item.value.y
  if (mode.value === 'findX') expected = item.value.x
  if (mode.value === 'findRule') expected = item.value.delta

  ok.value = raw !== '' && !Number.isNaN(num) && num === expected

  const expectedLabel = mode.value === 'findRule' ? item.value.ruleStr : String(expected)
  feedback.value = ok.value
    ? `Molt bé! Entra ${item.value.x} amb norma (${item.value.ruleStr}) → Surt ${item.value.y}.`
    : `Revisa-ho: la resposta correcta és ${expectedLabel}.`

  emit('update:modelValue', { answer: answer.value, ok: ok.value })

  if (ok.value) {
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: `${correctCount.value} robots de funcions resolts!`,
        },
      })
    }
    lockAfterCorrect(800, pick)
  }
}

onMounted(pick)
</script>

