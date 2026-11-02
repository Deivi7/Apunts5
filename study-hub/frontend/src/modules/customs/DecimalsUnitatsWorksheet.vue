<template>
  <div class="du-lab printable-worksheet">
    <div class="du-row no-print">
      <button type="button" class="ex-btn" @click="regen">🎲 Nova fitxa</button>
      <button type="button" class="ex-btn" @click="showSolutions = !showSolutions">
        {{ showSolutions ? 'Ocultar solucions' : 'Mostrar solucions' }}
      </button>
      <button type="button" class="ex-btn ex-btn-primary" @click="printSheet">🖨️ Imprimir / PDF</button>
      <button type="button" class="ex-btn" @click="markDone">✅ Ja l'he practicada</button>
    </div>

    <div class="worksheet-print-header">
      <div>
        <strong>Álvaro Study Hub · Decimals & unitats</strong>
        <div class="match-hint" style="margin:0">Potències de 10 · Arrodoniment · Conversió · Decimal × natural</div>
      </div>
      <div class="match-hint">Nom: _____________ Data: ________ Nota: ___ / {{ items.length }}</div>
    </div>

    <div class="du-ws-grid">
      <article v-for="(it, i) in items" :key="it.id" class="du-ws-card">
        <div style="font-size:0.75rem;font-weight:800;opacity:.7">Ej. {{ i + 1 }} · {{ it.kind }}</div>
        <div class="du-num" style="font-size:1.05rem;margin:0.35rem 0">{{ it.prompt }}</div>
        <div>________________</div>
        <div v-if="showSolutions" style="color:var(--du-primary,#0f766e);font-weight:800;margin-top:0.35rem">
          {{ it.answer }}
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  formatCa,
  generateDecimalMultItem,
  generatePower10Item,
  generateRoundingItem,
  convertMetric,
  LENGTH_UNITS,
} from '@/modules/mates/decimalsUnitatsMath.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete'])

const items = ref([])
const showSolutions = ref(false)

function regen() {
  showSolutions.value = false
  const out = []
  for (let i = 0; i < 4; i++) {
    const it = generatePower10Item(i % 2 === 0 ? 'mul' : 'div')
    out.push({
      id: `p${i}`,
      kind: 'Potència 10',
      prompt: `${formatCa(it.n)} ${it.op} ${it.power} =`,
      answer: formatCa(it.answer),
    })
  }
  for (let i = 0; i < 3; i++) {
    const it = generateRoundingItem()
    out.push({
      id: `r${i}`,
      kind: 'Arrodoniment',
      prompt: `Arrodoneix ${it.n} a la ${it.place === 10 ? 'desena' : it.place === 100 ? 'centena' : 'miler'}`,
      answer: String(it.answer),
    })
  }
  for (let i = 0; i < 3; i++) {
    const a = Math.floor(Math.random() * 5)
    const b = Math.min(6, a + 1 + Math.floor(Math.random() * 2))
    const fromU = LENGTH_UNITS[a]
    const toU = LENGTH_UNITS[b]
    const v = 1 + Math.floor(Math.random() * 20)
    const ans = convertMetric(v, fromU, toU, 'length')
    out.push({
      id: `m${i}`,
      kind: 'Unitats',
      prompt: `${v} ${fromU} = ? ${toU}`,
      answer: formatCa(ans),
    })
  }
  for (let i = 0; i < 2; i++) {
    const it = generateDecimalMultItem()
    out.push({
      id: `d${i}`,
      kind: 'Decimal × natural',
      prompt: `${formatCa(it.dec)} × ${it.nat} =`,
      answer: formatCa(it.answer),
    })
  }
  items.value = out
}

function printSheet() {
  window.print()
}

function markDone() {
  const max = props.exercise?.maxScore || 10
  emit('complete', {
    _grade: { score: max, maxScore: max, feedback: 'Fitxa imprimible practicada' },
  })
}

regen()
</script>
