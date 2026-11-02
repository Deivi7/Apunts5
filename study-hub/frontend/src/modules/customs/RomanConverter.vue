<template>
  <div class="roman-lab">
    <p class="match-hint" style="margin: 0;">
      Convierte en ambos sentidos. Usa solo I V X L C D M. Recuerda IV, IX, XL, XC, CD, CM.
    </p>
    <div class="roman-grid">
      <label class="roman-card">
        <span class="roman-label">🔢 Decimal → Romano</span>
        <input v-model.number="decimal" type="number" min="1" max="3999" class="input-hub">
        <div class="roman-out">{{ toRoman(decimal) || '—' }}</div>
      </label>
      <label class="roman-card">
        <span class="roman-label">🏛 Romano → Decimal</span>
        <input v-model="roman" class="input-hub" style="text-transform: uppercase;" placeholder="MMXXVI">
        <div class="roman-out">{{ fromRoman(roman) ?? '—' }}</div>
      </label>
    </div>
    <div class="roman-chips">
      <button v-for="ex in examples" :key="ex.n" type="button" class="roman-chip" @click="loadExample(ex)">
        {{ ex.n }} → {{ ex.r }}
      </button>
    </div>
    <button type="button" class="ex-btn ex-btn-primary" style="width: fit-content;" @click="completePractice">
      ✅ Validar práctica (+XP)
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const decimal = ref(2026)
const roman = ref('MMXXVI')
const examples = [
  { n: 4, r: 'IV' }, { n: 9, r: 'IX' }, { n: 40, r: 'XL' },
  { n: 90, r: 'XC' }, { n: 400, r: 'CD' }, { n: 900, r: 'CM' }, { n: 2026, r: 'MMXXVI' },
]

const map = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

function toRoman(num) {
  let n = Number(num)
  if (!n || n < 1 || n > 3999) return ''
  let out = ''
  for (const [v, s] of map) {
    while (n >= v) {
      out += s
      n -= v
    }
  }
  return out
}

function fromRoman(str) {
  const s = String(str || '').toUpperCase().trim()
  if (!s || /[^MDCLXVI]/.test(s)) return null
  const values = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }
  let total = 0
  for (let i = 0; i < s.length; i++) {
    const cur = values[s[i]]
    const next = values[s[i + 1]] || 0
    total += cur < next ? -cur : cur
  }
  return total
}

function loadExample(ex) {
  decimal.value = ex.n
  roman.value = ex.r
}

function completePractice() {
  const ok = toRoman(decimal.value) && fromRoman(roman.value) != null
  emit('update:modelValue', { decimal: decimal.value, roman: roman.value })
  emit('complete', {
    _grade: {
      score: ok ? props.exercise?.maxScore || 10 : 0,
      maxScore: props.exercise?.maxScore || 10,
      feedback: ok ? `${decimal.value} ↔ ${toRoman(decimal.value)}` : 'Revisa los valores',
    },
  })
}
</script>

<style scoped>
.roman-lab { display: grid; gap: 0.85rem; }
.roman-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}
.roman-card {
  display: grid; gap: 0.45rem; padding: 0.9rem;
  border: 1px solid var(--border-color); border-radius: 14px;
  background: linear-gradient(180deg, color-mix(in srgb, #c9a227 10%, var(--bg-card)), var(--bg-card));
}
.roman-label { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); }
.roman-out {
  font-size: 1.55rem; font-weight: 900; color: var(--primary);
  min-height: 2rem; font-variant-numeric: tabular-nums;
}
.roman-chips { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.roman-chip {
  border: 1px solid var(--border-color); background: var(--bg-main); border-radius: 999px;
  padding: 0.25rem 0.65rem; font-size: 0.75rem; font-weight: 800; cursor: pointer; font-family: inherit;
}
</style>
