<template>
  <div class="du-lab">
    <div class="du-row">
      <button
        v-for="p in places"
        :key="p.id"
        type="button"
        class="level-pill"
        :class="{ on: place === p.value }"
        @click="setPlace(p.value)"
      >
        {{ p.label }}
      </button>
      <button type="button" class="ex-btn" :disabled="locked" @click="newItem">🎲 Un altre</button>
    </div>

    <p class="match-hint" style="margin:0">
      Arrodoneix <strong class="du-num">{{ current?.n }}</strong>
      a la {{ placeLabel }} més propera.
    </p>

    <p class="match-hint">
      Mira el dígit just a la dreta de l'ordre demanat:
      si és 0–4 mantens; si és 5–9 puges.
    </p>

    <form class="du-row" @submit.prevent="check">
      <input v-model="answer" class="input-hub" type="text" placeholder="Nombre arrodonit" autocomplete="off" :disabled="locked">
      <button type="submit" class="ex-btn ex-btn-primary" :disabled="locked">Comprovar</button>
    </form>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useLabAttemptLock } from '@/composables/useLabAttemptLock.js'
import {
  answersMatch,
  generateRoundingItem,
  roundToNearestInt,
  roundToPlace,
} from '@/modules/mates/decimalsUnitatsMath.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const { locked, canCheck, unlockForNext, lockAfterCorrect, clearTimer } = useLabAttemptLock()

const places = [
  { id: 'd', label: 'Desena', value: 10 },
  { id: 'c', label: 'Centena', value: 100 },
  { id: 'm', label: 'Miler', value: 1000 },
  { id: 'u', label: 'Enter', value: 1 },
]

const place = ref(10)
const current = ref(null)
const answer = ref('')
const feedback = ref('')
const ok = ref(false)
const correctCount = ref(0)
const needed = 4

const placeLabel = computed(() => places.find((p) => p.value === place.value)?.label?.toLowerCase() || '')

function expected() {
  if (!current.value) return NaN
  if (place.value === 1) {
    // enter: genera decimal
    return roundToNearestInt(current.value.n)
  }
  return roundToPlace(current.value.n, place.value)
}

function pick() {
  clearTimer()
  unlockForNext()
  if (place.value === 1) {
    const base = Math.floor(Math.random() * 40) + 10
    const frac = Math.floor(Math.random() * 100) / 100
    current.value = { n: Number((base + frac).toFixed(2)), place: 1 }
  } else {
    current.value = generateRoundingItem()
    current.value.place = place.value
    current.value.n = Math.floor(Math.random() * (place.value * 90)) + place.value
  }
  answer.value = ''
  feedback.value = ''
  ok.value = false
}

function setPlace(v) {
  place.value = v
  pick()
}

function newItem() {
  if (locked.value) return
  pick()
}

function check() {
  if (!canCheck()) return
  const exp = expected()
  ok.value = answersMatch(answer.value, exp)
  feedback.value = ok.value
    ? `Correcte! ${current.value.n} → ${exp}`
    : `No coincideix. La resposta és ${exp}.`
  emit('update:modelValue', { answer: answer.value })
  if (ok.value) {
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: { score: max, maxScore: max, feedback: `${correctCount.value} arrodoniments correctes.` },
      })
    }
    lockAfterCorrect(700, pick)
  }
}

onMounted(pick)
</script>

<style scoped>
.level-pill {
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  border-radius: 999px;
  padding: 0.28rem 0.65rem;
  font-weight: 800;
  font-size: 0.78rem;
  cursor: pointer;
  font-family: inherit;
}
.level-pill.on {
  background: var(--du-primary, #0f766e);
  color: #fff;
  border-color: transparent;
}
</style>
