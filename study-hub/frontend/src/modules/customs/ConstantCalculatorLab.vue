<template>
  <div class="fe-lab">
    <div class="fe-row">
      <button
        type="button"
        class="fe-pill"
        :class="{ on: preset === '+8' }"
        @click="applyPreset('+', 8, '+8')"
      >
        🖩 Funció +8 (Taula 1)
      </button>
      <button
        type="button"
        class="fe-pill"
        :class="{ on: preset === '-5' }"
        @click="applyPreset('-', 5, '-5')"
      >
        🖩 Funció −5 (Taula 2)
      </button>
      <button
        type="button"
        class="fe-pill"
        :class="{ on: preset === '*2' }"
        @click="applyPreset('×', 2, '*2')"
      >
        🖩 Funció ×2 (Taula 3)
      </button>
      <button
        type="button"
        class="fe-pill"
        :class="{ on: preset === 'seq5' }"
        @click="startSequence5Plus2"
      >
        🦘 Saltar des de 5 (+ 2 =)
      </button>
    </div>

    <div class="fe-calc-grid">
      <!-- Calculadora visual -->
      <div class="fe-calc-device">
        <div class="fe-calc-screen">
          <div class="fe-calc-mem">
            Memòria funció: <strong>{{ memOp ? `${memOp} ${memVal}` : 'Cap' }}</strong>
          </div>
          <div class="fe-calc-display">{{ display }}</div>
        </div>

        <div class="fe-calc-keys">
          <button type="button" class="fe-key" @click="pressDigit('7')">7</button>
          <button type="button" class="fe-key" @click="pressDigit('8')">8</button>
          <button type="button" class="fe-key" @click="pressDigit('9')">9</button>
          <button type="button" class="fe-key fe-key-op" @click="pressOp('+')">+</button>

          <button type="button" class="fe-key" @click="pressDigit('4')">4</button>
          <button type="button" class="fe-key" @click="pressDigit('5')">5</button>
          <button type="button" class="fe-key" @click="pressDigit('6')">6</button>
          <button type="button" class="fe-key fe-key-op" @click="pressOp('-')">−</button>

          <button type="button" class="fe-key" @click="pressDigit('1')">1</button>
          <button type="button" class="fe-key" @click="pressDigit('2')">2</button>
          <button type="button" class="fe-key" @click="pressDigit('3')">3</button>
          <button type="button" class="fe-key fe-key-op" @click="pressOp('×')">×</button>

          <button type="button" class="fe-key fe-key-clear" @click="clearCalc">C</button>
          <button type="button" class="fe-key" @click="pressDigit('0')">0</button>
          <button type="button" class="fe-key fe-key-eq" style="grid-column: span 2" @click="pressEquals">
            = (Aplica)
          </button>
        </div>
      </div>

      <!-- Panell explicatiu i historial -->
      <div class="fe-calc-side">
        <div class="du-card" style="margin:0">
          <h3 style="margin-bottom:0.35rem"><span>⚡</span> Com funciona la calculadora constant?</h3>
          <p style="font-size:0.83rem;margin-bottom:0.5rem">
            1) Tria una funció amb els botons de dalt (o prem el nombre, <code>+</code> / <code>−</code> / <code>×</code> i <code>=</code>).<br>
            2) Escriu qualsevol valor d'entrada <strong>x</strong> i prem <strong>=</strong> per veure la sortida <strong>y</strong>!<br>
            3) Si prems <strong>=</strong> moltes vegades seguides, repeteix la norma sobre l'últim resultat!
          </p>

          <div v-if="preset === 'seq5'" class="fe-seq-strip">
            <div style="font-size:0.8rem;font-weight:800;margin-bottom:0.3rem">
              Camí del 5 amb (+ 2 =): prem "=" a la calculadora per saltar!
            </div>
            <div class="fe-seq-chips">
              <span
                v-for="(n, idx) in seqHistory"
                :key="idx"
                class="fe-seq-chip"
                :class="{ hl15: n === 15 }"
              >
                {{ n }}
              </span>
            </div>
            <p class="match-hint" style="margin:0.4rem 0 0">
              Fixa't: tots són <strong>senars</strong> (5, 7, 9, 11, 13, <strong>15</strong>, 17, 19, 21…). Passa per sobre del <strong>20</strong> sense tocar-lo!
            </p>
          </div>

          <div v-else class="fe-history-list">
            <div style="font-size:0.8rem;font-weight:800;margin-bottom:0.25rem">
              Últims càlculs ({{ history.length }}):
            </div>
            <div v-if="!history.length" class="match-hint" style="margin:0">
              Escriu un nombre a la calculadora i prem <strong>=</strong>.
            </div>
            <ul v-else style="margin:0;padding-left:1.1rem;font-size:0.82rem">
              <li v-for="(h, i) in history.slice(0, 6)" :key="i">
                <code>{{ h }}</code>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete'])

const preset = ref('+8')
const memOp = ref('+')
const memVal = ref(8)
const display = ref('0')
const typingNew = ref(true)
const pendingSetupVal = ref(null)
const pendingSetupOp = ref(null)
const history = ref([])
const seqHistory = ref([5])
const actionsCount = ref(0)

function applyPreset(op, val, tag) {
  preset.value = tag
  memOp.value = op
  memVal.value = val
  display.value = '0'
  typingNew.value = true
  pendingSetupVal.value = null
  pendingSetupOp.value = null
}

function startSequence5Plus2() {
  preset.value = 'seq5'
  memOp.value = '+'
  memVal.value = 2
  display.value = '5'
  typingNew.value = true
  seqHistory.value = [5]
}

function pressDigit(d) {
  if (typingNew.value || display.value === '0') {
    display.value = d
    typingNew.value = false
  } else if (display.value.length < 9) {
    display.value += d
  }
}

function pressOp(op) {
  pendingSetupVal.value = Number(display.value) || 0
  pendingSetupOp.value = op
  typingNew.value = true
}

function clearCalc() {
  display.value = '0'
  typingNew.value = true
  pendingSetupVal.value = null
  pendingSetupOp.value = null
  if (preset.value === 'seq5') {
    display.value = '5'
    seqHistory.value = [5]
  }
}

function pressEquals() {
  if (pendingSetupOp.value && pendingSetupVal.value !== null && typingNew.value) {
    memOp.value = pendingSetupOp.value
    memVal.value = pendingSetupVal.value
    preset.value = 'custom'
    pendingSetupOp.value = null
    pendingSetupVal.value = null
    return
  }

  const current = Number(display.value) || 0
  let result = current
  if (memOp.value === '+') result = current + memVal.value
  else if (memOp.value === '-') result = current - memVal.value
  else if (memOp.value === '×') result = current * memVal.value

  display.value = String(result)
  typingNew.value = true

  if (preset.value === 'seq5') {
    seqHistory.value.push(result)
  } else {
    history.value.unshift(`x = ${current}  ──(${memOp.value}${memVal.value})──►  y = ${result}`)
  }

  actionsCount.value += 1
  if (actionsCount.value === 4) {
    const max = props.exercise?.maxScore || 10
    emit('complete', {
      _grade: {
        score: max,
        maxScore: max,
        feedback: 'Calculadora de funcions provada!',
      },
    })
  }
}
</script>

