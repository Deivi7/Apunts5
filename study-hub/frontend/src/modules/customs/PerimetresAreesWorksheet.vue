<template>
  <div class="pa-lab printable-worksheet">
    <div class="pa-row no-print">
      <button type="button" class="ex-btn" @click="regen">🎲 Nova fitxa</button>
      <button type="button" class="ex-btn" @click="showSolutions = !showSolutions">
        {{ showSolutions ? 'Ocultar solucions' : 'Mostrar solucions' }}
      </button>
      <button type="button" class="ex-btn ex-btn-primary" @click="printSheet">🖨️ Imprimir / PDF</button>
      <button type="button" class="ex-btn" @click="markDone">✅ Ja l'he practicada</button>
    </div>

    <div class="worksheet-print-header">
      <div>
        <strong>Álvaro Study Hub · Perímetres i Àrees (Quadrats i Rectangles)</strong>
        <div class="match-hint" style="margin:0">Càlcul de perímetres (cm/m) · Càlcul d'àrees (cm²/m²) · Reptes inversos</div>
      </div>
      <div class="match-hint">Nom: _____________ Data: ________ Nota: ___ / {{ items.length }}</div>
    </div>

    <div class="du-ws-grid">
      <article v-for="(it, i) in items" :key="it.id" class="du-ws-card">
        <div style="font-size:0.75rem;font-weight:800;opacity:.7">Ex. {{ i + 1 }} · {{ it.kind }}</div>
        <div class="du-num" style="font-size:1rem;margin:0.35rem 0">{{ it.prompt }}</div>
        <div>________________</div>
        <div v-if="showSolutions" style="color:var(--pa-primary,#059669);font-weight:800;margin-top:0.35rem">
          Solució: {{ it.answer }}
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete'])

const items = ref([])
const showSolutions = ref(false)

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function regen() {
  showSolutions.value = false
  const out = []

  const s1 = randInt(4, 15)
  out.push({
    id: 'pa1',
    kind: 'Perímetre del quadrat',
    prompt: `Quadrat de costat ${s1} cm  →  Perímetre =`,
    answer: `${4 * s1} cm`,
  })

  const s2 = randInt(5, 12)
  out.push({
    id: 'pa2',
    kind: 'Àrea del quadrat',
    prompt: `Quadrat de costat ${s2} cm  →  Àrea =`,
    answer: `${s2 * s2} cm²`,
  })

  const b1 = randInt(8, 20)
  const h1 = randInt(3, 7)
  out.push({
    id: 'pa3',
    kind: 'Perímetre del rectangle',
    prompt: `Rectangle de base ${b1} m i altura ${h1} m  →  Perímetre =`,
    answer: `${2 * (b1 + h1)} m`,
  })

  const b2 = randInt(7, 16)
  const h2 = randInt(4, 9)
  out.push({
    id: 'pa4',
    kind: 'Àrea del rectangle',
    prompt: `Rectangle de base ${b2} cm i altura ${h2} cm  →  Àrea =`,
    answer: `${b2 * h2} cm²`,
  })

  const s3 = randInt(6, 15)
  out.push({
    id: 'pa5',
    kind: 'Repte invers (Perímetre → Costat)',
    prompt: `Un quadrat té un perímetre de ${4 * s3} cm. Quant mesura cada costat?`,
    answer: `${s3} cm`,
  })

  const s4 = randInt(5, 11)
  out.push({
    id: 'pa6',
    kind: 'Repte invers (Àrea → Costat)',
    prompt: `Un quadrat té una àrea de ${s4 * s4} m². Quant mesura el seu costat?`,
    answer: `${s4} m`,
  })

  const b3 = randInt(8, 14)
  const h3 = randInt(4, 8)
  out.push({
    id: 'pa7',
    kind: 'Repte invers (Àrea rectangle → Altura)',
    prompt: `Un rectangle té una àrea de ${b3 * h3} cm² i base ${b3} cm. Quant mesura l'altura?`,
    answer: `${h3} cm`,
  })

  const b4 = randInt(10, 25)
  const h4 = randInt(5, 12)
  out.push({
    id: 'pa8',
    kind: 'Problema: Tanca i gespa d\'un jardí',
    prompt: `Jardí rectangular de ${b4} m × ${h4} m. Quants metres de tanca (perímetre) i quants m² de gespa (àrea) calen?`,
    answer: `Tanca: ${2 * (b4 + h4)} m · Gespa: ${b4 * h4} m²`,
  })

  items.value = out
}

function printSheet() {
  window.print()
}

function markDone() {
  const max = props.exercise?.maxScore || 10
  emit('complete', {
    _grade: { score: max, maxScore: max, feedback: 'Fitxa imprimible practicada!' },
  })
}

regen()
</script>

