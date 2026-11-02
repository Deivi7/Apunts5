<template>
  <div class="du-lab">
    <div class="du-row">
      <button
        v-for="k in kinds"
        :key="k.id"
        type="button"
        class="level-pill"
        :class="{ on: kind === k.id }"
        @click="setKind(k.id)"
      >
        {{ k.label }}
      </button>
      <button type="button" class="ex-btn" @click="newItem">🎲 Un altre</button>
    </div>

    <div class="du-ladder">
      <span
        v-for="(u, i) in units"
        :key="u"
        :class="{ on: u === fromU || u === toU }"
      >{{ u }}</span>
    </div>

    <p class="match-hint" style="margin:0">
      Converteix <strong class="du-num">{{ formatCa(value) }} {{ fromU }}</strong>
      a <strong>{{ toU }}</strong>.
      ({{ steps >= 0 ? `baixa ${steps} graó(ns) → ×${10 ** steps}` : `puja ${-steps} graó(ns) → ÷${10 ** -steps}` }})
    </p>

    <form class="du-row" @submit.prevent="check">
      <input v-model="answer" class="input-hub" placeholder="Valor en la nova unitat" autocomplete="off">
      <button type="submit" class="ex-btn ex-btn-primary">Comprovar</button>
    </form>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  LENGTH_UNITS,
  MASS_UNITS,
  CAPACITY_UNITS,
  answersMatch,
  convertMetric,
  formatCa,
  stepsBetween,
} from '@/modules/mates/decimalsUnitatsMath.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const kinds = [
  { id: 'length', label: 'Longitud' },
  { id: 'mass', label: 'Massa' },
  { id: 'capacity', label: 'Capacitat' },
]

const kind = ref('length')
const value = ref(1)
const fromU = ref('m')
const toU = ref('cm')
const answer = ref('')
const feedback = ref('')
const ok = ref(false)
const correctCount = ref(0)
const needed = 4

const units = computed(() => {
  if (kind.value === 'mass') return MASS_UNITS
  if (kind.value === 'capacity') return CAPACITY_UNITS
  return LENGTH_UNITS
})

const steps = computed(() => stepsBetween(fromU.value, toU.value, kind.value))

const expected = computed(() => convertMetric(value.value, fromU.value, toU.value, kind.value))

function pick() {
  const list = units.value
  let a = Math.floor(Math.random() * list.length)
  let b = Math.floor(Math.random() * list.length)
  while (b === a) b = Math.floor(Math.random() * list.length)
  fromU.value = list[a]
  toU.value = list[b]
  value.value = Number(((Math.floor(Math.random() * 90) + 1) / (Math.random() > 0.5 ? 1 : 10)).toFixed(2))
  answer.value = ''
  feedback.value = ''
  ok.value = false
}

function setKind(id) {
  kind.value = id
  pick()
}

function newItem() {
  pick()
}

function check() {
  ok.value = answersMatch(answer.value, expected.value)
  feedback.value = ok.value
    ? `Correcte! ${formatCa(value.value)} ${fromU.value} = ${formatCa(expected.value)} ${toU.value}`
    : `Revisa els graons. Resposta: ${formatCa(expected.value)} ${toU.value}`
  emit('update:modelValue', { answer: answer.value })
  if (ok.value) {
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: { score: max, maxScore: max, feedback: `${correctCount.value} conversions correctes.` },
      })
    }
    setTimeout(() => pick(), 700)
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
