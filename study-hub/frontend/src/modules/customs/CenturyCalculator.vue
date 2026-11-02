<template>
  <div class="century-lab">
    <p class="match-hint" style="margin: 0;">
      Regla: si el año termina en 00 → siglo = año/100. Si no → tapa las 2 últimas cifras y suma 1.
    </p>
    <div class="century-card">
      <label class="century-field">
        <span>📅 Año</span>
        <input v-model.number="year" type="number" class="input-hub">
      </label>
      <div class="century-result">
        <span>Siglo</span>
        <strong>{{ romanCentury }}</strong>
        <small>({{ century }})</small>
      </div>
    </div>
    <div class="century-chips">
      <button v-for="y in samples" :key="y" type="button" class="century-chip" @click="year = y">{{ y }}</button>
    </div>
    <button type="button" class="ex-btn ex-btn-primary" style="width: fit-content;" @click="validate">
      ✅ Validar regla del +1 / 00
    </button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const year = ref(props.exercise?.content?.year || 1492)
const samples = [102, 711, 1492, 1789, 1800, 2000, 2026]

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

const century = computed(() => {
  const y = Number(year.value)
  if (!y) return null
  return y % 100 === 0 ? y / 100 : Math.floor(y / 100) + 1
})
const romanCentury = computed(() => (century.value ? toRoman(century.value) : '—'))

function validate() {
  emit('update:modelValue', { year: year.value, century: century.value })
  emit('complete', {
    year: year.value,
    century: century.value,
    _grade: {
      score: props.exercise?.maxScore || 5,
      maxScore: props.exercise?.maxScore || 5,
      feedback: `${year.value} → siglo ${romanCentury.value} (${century.value})`,
    },
  })
}
</script>

<style scoped>
.century-lab { display: grid; gap: 0.85rem; max-width: 28rem; }
.century-card {
  display: grid; grid-template-columns: 1fr auto; gap: 0.85rem; align-items: end;
  padding: 1rem; border-radius: 14px; border: 1px solid var(--border-color);
  background: linear-gradient(135deg, color-mix(in srgb, #6366f1 10%, var(--bg-card)), var(--bg-card));
}
.century-field { display: grid; gap: 0.3rem; font-size: 0.8rem; font-weight: 800; color: var(--text-muted); }
.century-result {
  display: grid; justify-items: center; gap: 0.1rem; min-width: 5.5rem;
  padding: 0.45rem 0.7rem; border-radius: 12px; background: var(--bg-main);
}
.century-result span { font-size: 0.7rem; font-weight: 800; color: var(--text-muted); }
.century-result strong { font-size: 1.45rem; color: var(--primary); }
.century-result small { font-size: 0.72rem; color: var(--text-muted); }
.century-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.century-chip {
  border: 1px solid var(--border-color); background: var(--bg-main); border-radius: 999px;
  padding: 0.25rem 0.65rem; font-size: 0.75rem; font-weight: 800; cursor: pointer; font-family: inherit;
}
</style>
