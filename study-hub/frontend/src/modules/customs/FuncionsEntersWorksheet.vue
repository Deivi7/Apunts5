<template>
  <div class="fe-lab printable-worksheet">
    <div class="fe-row no-print">
      <button type="button" class="ex-btn" @click="regen">🎲 Nova fitxa</button>
      <button type="button" class="ex-btn" @click="showSolutions = !showSolutions">
        {{ showSolutions ? 'Ocultar solucions' : 'Mostrar solucions' }}
      </button>
      <button type="button" class="ex-btn ex-btn-primary" @click="printSheet">🖨️ Imprimir / PDF</button>
      <button type="button" class="ex-btn" @click="markDone">✅ Ja l'he practicada</button>
    </div>

    <div class="worksheet-print-header">
      <div>
        <strong>Álvaro Study Hub · Funcions, Calculadora i Nombres Negatius</strong>
        <div class="match-hint" style="margin:0">Robots de funcions · Taules (x, y) · Nombres sota zero</div>
      </div>
      <div class="match-hint">Nom: _____________ Data: ________ Nota: ___ / {{ items.length }}</div>
    </div>

    <div class="du-ws-grid">
      <article v-for="(it, i) in items" :key="it.id" class="du-ws-card">
        <div style="font-size:0.75rem;font-weight:800;opacity:.7">Ex. {{ i + 1 }} · {{ it.kind }}</div>
        <div class="du-num" style="font-size:1.05rem;margin:0.35rem 0">{{ it.prompt }}</div>
        <div>________________</div>
        <div v-if="showSolutions" style="color:var(--fe-primary,#4f46e5);font-weight:800;margin-top:0.35rem">
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

  // 4 de robot de funcions (sortida, entrada, norma, fletxa inversa)
  const r1x = randInt(4, 25)
  const r1d = randInt(6, 28)
  out.push({
    id: 'w1',
    kind: 'Robot (troba y)',
    prompt: `${r1x} ──(+${r1d})──► y   ⇒   y =`,
    answer: String(r1x + r1d),
  })

  const r2x = randInt(5, 22)
  const r2d = randInt(5, 19)
  out.push({
    id: 'w2',
    kind: 'Robot invers (troba x)',
    prompt: `${r2x + r2d} ◄──(+${r2d})── x   ⇒   x =`,
    answer: String(r2x),
  })

  const r3x = randInt(4, 15)
  const r3d = randInt(7, 25)
  out.push({
    id: 'w3',
    kind: 'Robot (troba la norma)',
    prompt: `${r3x} ──(?)──► ${r3x + r3d}   ⇒   norma =`,
    answer: `+${r3d}`,
  })

  const r4y = randInt(5, 15)
  const r4d = randInt(8, 20)
  out.push({
    id: 'w4',
    kind: 'Robot amb resta (troba x)',
    prompt: `${r4y} ◄──(−${r4d})── x   ⇒   x =`,
    answer: String(r4y + r4d),
  })

  // 3 de calculadora constant
  const c1 = randInt(40, 400)
  out.push({
    id: 'w5',
    kind: 'Calculadora (Resta 5)',
    prompt: `Si entra x = ${c1}  ──(−5)──►  Surt y =`,
    answer: String(c1 - 5),
  })

  const c2 = randInt(15, 250)
  out.push({
    id: 'w6',
    kind: 'Calculadora (Multiplica per 2)',
    prompt: `Si entra x = ${c2}  ──(×2)──►  Surt y =`,
    answer: String(c2 * 2),
  })

  // 5 de nombres negatius i busseig
  const d1 = -randInt(10, 25)
  const step1 = randInt(5, 15)
  out.push({
    id: 'w7',
    kind: 'Busseig d\'en Joan',
    prompt: `Ubicació inicial: ${d1} m · Baixa ${step1} m → Nova ubicació =`,
    answer: `${d1 - step1} m`,
  })

  const d2 = -randInt(15, 30)
  const step2 = randInt(5, 12)
  out.push({
    id: 'w8',
    kind: 'Busseig d\'en Joan',
    prompt: `Ubicació inicial: ${d2} m · Puja ${step2} m → Nova ubicació =`,
    answer: `${d2 + step2} m`,
  })

  const n1 = randInt(6, 15)
  const n2 = randInt(2, n1 - 1)
  out.push({
    id: 'w9',
    kind: 'Càlcul sense calculadora',
    prompt: `(−${n1}) + ${n2} =`,
    answer: String(-n1 + n2),
  })

  const n3 = randInt(4, 12)
  const n4 = randInt(5, 14)
  out.push({
    id: 'w10',
    kind: 'Càlcul sense calculadora',
    prompt: `(−${n3}) − ${n4} =`,
    answer: String(-n3 - n4),
  })

  const a = randInt(5, 18)
  const b = a + randInt(2, 10)
  out.push({
    id: 'w11',
    kind: 'Càlcul sense calculadora',
    prompt: `${a} − ${b} =`,
    answer: String(a - b),
  })

  const opp = randInt(12, 40)
  out.push({
    id: 'w12',
    kind: 'Nombres oposats',
    prompt: `(−${opp}) + ${opp} =`,
    answer: '0',
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

