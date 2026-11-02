<template>
  <div>
    <div class="flash-actions" style="margin-bottom: 1rem;">
      <button type="button" class="ex-btn" @click="regen">🎲 Nueva ficha</button>
      <button type="button" class="ex-btn" @click="showSolutions = !showSolutions">
        {{ showSolutions ? 'Ocultar soluciones' : 'Mostrar soluciones' }}
      </button>
      <button type="button" class="ex-btn ex-btn-primary" @click="markDone">✅ Ya la practiqué</button>
    </div>

    <div class="alpha-lab-card" style="margin-bottom: 1rem;">
      <h3 style="margin: 0 0 0.65rem; font-size: 1.05rem;">1. Decimal → romano</h3>
      <div style="display: grid; gap: 0.35rem;">
        <div v-for="row in decToRom" :key="'d'+row.n" style="display: flex; justify-content: space-between; gap: 1rem; border-bottom: 1px dashed var(--border-color); padding: 0.25rem 0;">
          <span><strong>{{ row.n }}</strong> = __________</span>
          <span v-if="showSolutions" style="color: var(--primary); font-weight: 800;">{{ row.roman }}</span>
        </div>
      </div>
    </div>

    <div class="alpha-lab-card" style="margin: 0;">
      <h3 style="margin: 0 0 0.65rem; font-size: 1.05rem;">2. Romano → decimal</h3>
      <div style="display: grid; gap: 0.35rem;">
        <div v-for="row in romToDec" :key="'r'+row.roman" style="display: flex; justify-content: space-between; gap: 1rem; border-bottom: 1px dashed var(--border-color); padding: 0.25rem 0;">
          <span><strong>{{ row.roman }}</strong> = __________</span>
          <span v-if="showSolutions" style="color: var(--primary); font-weight: 800;">{{ row.n }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete'])

const ROMAN = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRoman(num) {
  let n = num
  let out = ''
  for (const [v, s] of ROMAN) {
    while (n >= v) {
      out += s
      n -= v
    }
  }
  return out
}

const showSolutions = ref(false)
const decToRom = ref([])
const romToDec = ref([])

function pickNums(count, max = 1999) {
  const set = new Set()
  while (set.size < count) set.add(1 + Math.floor(Math.random() * max))
  return [...set]
}

function regen() {
  showSolutions.value = false
  decToRom.value = pickNums(9, 1990).map((n) => ({ n, roman: toRoman(n) }))
  romToDec.value = pickNums(9, 1500).map((n) => ({ n, roman: toRoman(n) }))
}

regen()

function markDone() {
  const max = props.exercise?.maxScore || 10
  emit('complete', {
    _grade: { score: max, maxScore: max, feedback: 'Ficha imprimible practicada' },
  })
}
</script>
