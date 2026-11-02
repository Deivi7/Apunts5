<template>
  <div class="du-lab">
    <p class="match-hint" style="margin:0">
      Dígits: <strong>{{ digits.join(', ') }}</strong>.
      Omple el nombre natural i el decimal (1 xifra decimal) per maximitzar el producte.
    </p>

    <div class="du-digit-pool">
      <button
        v-for="(d, i) in pool"
        :key="'p'+i+d"
        type="button"
        :disabled="d === null"
        @click="selectPool(i)"
      >
        {{ d ?? '·' }}
      </button>
      <button type="button" class="ex-btn" @click="resetSlots">Neteja</button>
      <button type="button" class="ex-btn" @click="newDigits">🎲 Nous dígits</button>
    </div>

    <div class="du-row" style="align-items:flex-end">
      <div>
        <div class="match-hint">Natural (2 xifres)</div>
        <div class="du-row">
          <button type="button" class="du-slot" @click="fillSlot('n0')">{{ slots.n0 ?? '_' }}</button>
          <button type="button" class="du-slot" @click="fillSlot('n1')">{{ slots.n1 ?? '_' }}</button>
        </div>
      </div>
      <span style="font-size:1.4rem;font-weight:900">×</span>
      <div>
        <div class="match-hint">Decimal (1 enter + 1 decimal)</div>
        <div class="du-row">
          <button type="button" class="du-slot" @click="fillSlot('d0')">{{ slots.d0 ?? '_' }}</button>
          <span>,</span>
          <button type="button" class="du-slot" @click="fillSlot('d1')">{{ slots.d1 ?? '_' }}</button>
        </div>
      </div>
    </div>

    <p class="du-num" v-if="ready">
      {{ natural }} × {{ decimal }} = {{ formatCa(userProduct) }}
    </p>

    <div class="du-row">
      <button type="button" class="ex-btn ex-btn-primary" :disabled="!ready" @click="check">Comprovar si és òptim</button>
      <button type="button" class="ex-btn" @click="showBest = !showBest">Veure òptim</button>
    </div>

    <p v-if="showBest && best" class="match-hint">
      Millor trobat: {{ best.natural }} × {{ best.decimal }} = {{ formatCa(best.value) }}
    </p>
    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>

    <p class="match-hint">
      Exemple de l'examen: Claudi 91 × 6,3 = 573,3 &gt; Eulàlia 631 × 0,9 = 567,9
    </p>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import {
  bestDigitProduct,
  formatCa,
  productFromParts,
} from '@/modules/mates/decimalsUnitatsMath.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const digits = ref([1, 3, 6, 9])
const pool = ref([1, 3, 6, 9])
const slots = reactive({ n0: null, n1: null, d0: null, d1: null })
const selectedPoolIdx = ref(null)
const feedback = ref('')
const ok = ref(false)
const showBest = ref(false)
const wins = ref(0)

const natural = computed(() => `${slots.n0 ?? ''}${slots.n1 ?? ''}`)
const decimal = computed(() => `${slots.d0 ?? ''},${slots.d1 ?? ''}`)
const ready = computed(() => [slots.n0, slots.n1, slots.d0, slots.d1].every((x) => x !== null))
const userProduct = computed(() => (ready.value ? productFromParts(natural.value, decimal.value) : NaN))
const best = computed(() => bestDigitProduct(digits.value))

function newDigits() {
  const set = new Set()
  while (set.size < 4) set.add(1 + Math.floor(Math.random() * 9))
  digits.value = [...set]
  resetSlots()
  showBest.value = false
  feedback.value = ''
}

function resetSlots() {
  pool.value = [...digits.value]
  slots.n0 = slots.n1 = slots.d0 = slots.d1 = null
  selectedPoolIdx.value = null
  ok.value = false
  feedback.value = ''
}

function selectPool(i) {
  if (pool.value[i] === null) return
  selectedPoolIdx.value = i
}

function fillSlot(key) {
  if (slots[key] !== null) {
    pool.value.push(slots[key])
    slots[key] = null
    return
  }
  if (selectedPoolIdx.value === null) return
  const v = pool.value[selectedPoolIdx.value]
  if (v === null) return
  slots[key] = v
  pool.value[selectedPoolIdx.value] = null
  selectedPoolIdx.value = null
}

function check() {
  if (!ready.value || !best.value) return
  const tol = 0.05
  ok.value = Math.abs(userProduct.value - best.value.value) <= tol
  feedback.value = ok.value
    ? `Òptim! Producte ${formatCa(userProduct.value)}`
    : `El teu producte és ${formatCa(userProduct.value)}. Pots millorar (òptim ≈ ${formatCa(best.value.value)}).`
  emit('update:modelValue', { natural: natural.value, decimal: decimal.value, product: userProduct.value })
  if (ok.value) {
    wins.value += 1
    const max = props.exercise?.maxScore || 12
    if (wins.value >= 2) {
      emit('complete', {
        _grade: { score: max, maxScore: max, feedback: 'Has trobat productes òptims.' },
      })
    }
  }
}
</script>
