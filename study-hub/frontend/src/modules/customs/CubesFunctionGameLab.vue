<template>
  <div class="fe-lab">
    <div class="fe-row">
      <button
        type="button"
        class="fe-pill"
        :class="{ on: tab === 'game' }"
        @click="tab = 'game'"
      >
        🎲 Joc de Cubs (Cap a 100)
      </button>
      <button
        type="button"
        class="fe-pill"
        :class="{ on: tab === 'custom5' }"
        @click="tab = 'custom5'"
      >
        🏠 A casa: Inventa 5 parells (x, y)
      </button>
    </div>

    <!-- MODO 1: JOC DE CUBS -->
    <template v-if="tab === 'game'">
      <p class="match-hint" style="margin:0">
        <strong>Objectiu:</strong> Tira els 4 cubs EMAT (dos de 0–5 i dos de 5–10) per obtenir els valors de <strong>x</strong>. Tria una norma de suma (p. ex. <code>+18</code>) i calcula les <strong>y</strong> perquè la suma s'acosti al màxim a <strong>100 sense passar-se</strong>!
      </p>

      <div class="fe-row">
        <button type="button" class="ex-btn ex-btn-primary" @click="rollCubes">
          🎲 Tirar els 4 cubs EMAT
        </button>
        <button type="button" class="ex-btn" @click="loadBookExample">
          📖 Carregar partida d'exemple (5, 4, 6, 8)
        </button>
      </div>

      <div class="fe-cubes-strip">
        <div v-for="(val, i) in cubes" :key="i" class="fe-cube" :class="i < 2 ? 'cube-low' : 'cube-high'">
          <span class="fe-cube-tag">{{ i < 2 ? 'Cub 0–5' : 'Cub 5–10' }}</span>
          <strong>{{ val }}</strong>
        </div>
        <div class="fe-cube-sum">
          Suma de les x: <strong>{{ sumX }}</strong>
        </div>
      </div>

      <div class="fe-row">
        <label style="font-weight:800;font-size:0.88rem">
          La teva norma (suma a cada x): +
        </label>
        <input
          v-model.number="ruleAdd"
          type="number"
          min="0"
          max="40"
          class="input-hub"
          style="max-width:90px"
          @input="clearGameCheck"
        >
        <button type="button" class="ex-btn" @click="autoFillY">
          ⚡ Autocompletar y
        </button>
      </div>

      <div class="du-table-wrap">
        <table class="du-table du-table-compact">
          <thead>
            <tr>
              <th>Fila</th>
              <th>Entra (x)</th>
              <th>La teva sortida y (x + {{ ruleAdd || 0 }})</th>
              <th>Taula Rival ({{ rivalName }}: +{{ rivalRule }})</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(xVal, idx) in cubes" :key="idx">
              <td>Parell {{ idx + 1 }}</td>
              <td><strong>{{ xVal }}</strong></td>
              <td>
                <input
                  v-model="playerY[idx]"
                  type="number"
                  class="input-hub"
                  style="max-width:95px;text-align:center;margin:0 auto"
                  placeholder="y = ?"
                >
              </td>
              <td>{{ xVal + rivalRule }}</td>
            </tr>
            <tr class="fe-total-row">
              <td><strong>SUMA TOTAL</strong></td>
              <td><strong>{{ sumX }}</strong></td>
              <td>
                <input
                  v-model="playerTotalInput"
                  type="number"
                  class="input-hub"
                  style="max-width:105px;text-align:center;margin:0 auto;font-weight:800"
                  placeholder="Suma y"
                >
              </td>
              <td>
                <strong>{{ rivalTotal }}</strong>
                <span v-if="rivalTotal > 100" style="color:#e11d48;font-size:0.75rem"> (Es passa!)</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="fe-row">
        <button type="button" class="ex-btn ex-btn-primary" @click="checkGame">
          🏆 Comprovar taula i qui guanya
        </button>
      </div>

      <p v-if="gameFeedback" class="feedback-msg" :class="gameOk ? 'feedback-ok' : 'feedback-bad'">
        {{ gameFeedback }}
      </p>
    </template>

    <!-- MODO 2: A CASA TAULA DE 5 PARELLS ORDENATS -->
    <template v-else>
      <p class="match-hint" style="margin:0">
        <strong>A CASA:</strong> Inventa una funció i calcula amb ella una taula de <strong>cinc parells ordenats (x, y)</strong>.
      </p>

      <div class="fe-row">
        <label style="font-weight:800;font-size:0.88rem">Operació:</label>
        <select v-model="customOp" class="input-hub" style="max-width:110px">
          <option value="+">+ (Sumar)</option>
          <option value="-">− (Restar)</option>
          <option value="*">× (Multiplicar)</option>
        </select>
        <label style="font-weight:800;font-size:0.88rem">Nombre:</label>
        <input
          v-model.number="customNum"
          type="number"
          min="1"
          max="50"
          class="input-hub"
          style="max-width:90px"
        >
        <span class="fe-badge-rule">Norma activa: {{ customOp === '*' ? '×' : customOp }}{{ customNum }}</span>
      </div>

      <div class="du-table-wrap">
        <table class="du-table du-table-compact">
          <thead>
            <tr>
              <th>#</th>
              <th>Entra (x)</th>
              <th>Surt (y)</th>
              <th>Parell ordenat (x, y)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(pair, idx) in customPairs" :key="idx">
              <td>{{ idx + 1 }}</td>
              <td>
                <input
                  v-model="pair.x"
                  type="number"
                  class="input-hub"
                  style="max-width:90px;text-align:center"
                  placeholder="x"
                >
              </td>
              <td>
                <input
                  v-model="pair.y"
                  type="number"
                  class="input-hub"
                  style="max-width:90px;text-align:center"
                  placeholder="y"
                >
              </td>
              <td>
                <code>({{ pair.x !== '' ? pair.x : '?' }}, {{ pair.y !== '' ? pair.y : '?' }})</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="fe-row">
        <button type="button" class="ex-btn ex-btn-primary" @click="checkCustom5">
          ✅ Validar els meus 5 parells ordenats
        </button>
      </div>

      <p v-if="customFeedback" class="feedback-msg" :class="customOk ? 'feedback-ok' : 'feedback-bad'">
        {{ customFeedback }}
      </p>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const tab = ref('game')
const cubes = ref([5, 4, 6, 8])
const ruleAdd = ref(18)
const playerY = ref(['23', '22', '24', '26'])
const playerTotalInput = ref('95')
const rivalName = ref('Leo')
const rivalRule = ref(20)
const gameFeedback = ref('')
const gameOk = ref(false)

const sumX = computed(() => cubes.value.reduce((a, b) => a + b, 0))
const rivalTotal = computed(() => sumX.value + 4 * rivalRule.value)

function randInt(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1))
}

function rollCubes() {
  const c1 = randInt(0, 5)
  const c2 = randInt(0, 5)
  const c3 = randInt(5, 10)
  const c4 = randInt(5, 10)
  cubes.value = [c1, c2, c3, c4]
  const s = c1 + c2 + c3 + c4
  const idealRule = Math.floor((100 - s) / 4)
  rivalName.value = Math.random() < 0.5 ? 'Helena' : 'Leo'
  rivalRule.value = Math.random() < 0.5 ? Math.max(1, idealRule - 1) : idealRule + 1
  ruleAdd.value = idealRule
  playerY.value = ['', '', '', '']
  playerTotalInput.value = ''
  gameFeedback.value = ''
  gameOk.value = false
}

function loadBookExample() {
  cubes.value = [5, 4, 6, 8]
  ruleAdd.value = 18
  rivalName.value = 'Leo'
  rivalRule.value = 20
  playerY.value = ['23', '22', '24', '26']
  playerTotalInput.value = '95'
  gameFeedback.value = ''
  gameOk.value = false
}

function clearGameCheck() {
  gameFeedback.value = ''
}

function autoFillY() {
  const r = Number(ruleAdd.value) || 0
  playerY.value = cubes.value.map((x) => String(x + r))
  playerTotalInput.value = String(sumX.value + 4 * r)
}

function checkGame() {
  const r = Number(ruleAdd.value)
  if (!Number.isFinite(r)) {
    gameOk.value = false
    gameFeedback.value = 'Escriu un nombre vàlid per a la teva norma.'
    return
  }

  for (let i = 0; i < 4; i++) {
    const expectedY = cubes.value[i] + r
    if (Number(playerY.value[i]) !== expectedY) {
      gameOk.value = false
      gameFeedback.value = `Revisa la fila ${i + 1}: ${cubes.value[i]} + ${r} és ${expectedY} (has posat ${playerY.value[i] || 'buit'}).`
      return
    }
  }

  const expectedSum = sumX.value + 4 * r
  if (Number(playerTotalInput.value) !== expectedSum) {
    gameOk.value = false
    gameFeedback.value = `Els valors de y estan bé, però la suma total és ${expectedSum} (has escrit ${playerTotalInput.value || 'buit'}).`
    return
  }

  if (expectedSum > 100) {
    gameOk.value = false
    gameFeedback.value = `Càlcul correcte (${expectedSum}), però t'has passat de 100! Prova una norma una mica més petita.`
    return
  }

  const rTotal = rivalTotal.value
  const playerWins = rTotal > 100 || expectedSum >= rTotal
  gameOk.value = playerWins
  if (playerWins) {
    gameFeedback.value = `Excel·lent! La teva suma és ${expectedSum} (≤ 100) i guanyes la partida contra ${rivalName.value} (${rTotal})!`
    const max = props.exercise?.maxScore || 12
    emit('complete', {
      _grade: {
        score: max,
        maxScore: max,
        feedback: `Partida del Joc de Cubs guanyada amb suma ${expectedSum}/100!`,
      },
    })
  } else {
    gameFeedback.value = `Càlcul perfecte (${expectedSum}), però ${rivalName.value} s'ha acostat més a 100 amb ${rTotal}. Puja una mica la teva norma per guanyar-lo!`
  }
}

// Modo 2: 5 parells ordenats
const customOp = ref('+')
const customNum = ref(6)
const customPairs = ref([
  { x: 1, y: 7 },
  { x: 2, y: 8 },
  { x: 5, y: 11 },
  { x: 10, y: 16 },
  { x: 20, y: 26 },
])
const customFeedback = ref('')
const customOk = ref(false)

function evalCustom(x) {
  const n = Number(customNum.value) || 0
  if (customOp.value === '+') return x + n
  if (customOp.value === '-') return x - n
  return x * n
}

function checkCustom5() {
  const seenX = new Set()
  for (let i = 0; i < 5; i++) {
    const p = customPairs.value[i]
    if (p.x === '' || p.y === '' || p.x === null || p.y === null) {
      customOk.value = false
      customFeedback.value = `Completa totes les caselles (falta el parell ${i + 1}).`
      return
    }
    const xVal = Number(p.x)
    const yVal = Number(p.y)
    const expY = evalCustom(xVal)
    if (yVal !== expY) {
      customOk.value = false
      customFeedback.value = `Al parell ${i + 1}, per a x = ${xVal} amb la norma ${customOp.value}${customNum.value}, la y hauria de ser ${expY}.`
      return
    }
    seenX.add(xVal)
  }

  if (seenX.size < 5) {
    customOk.value = false
    customFeedback.value = 'Posa 5 valors de x diferents per tenir 5 parells ordenats diferents!'
    return
  }

  customOk.value = true
  customFeedback.value = 'Fantàstic! Els 5 parells ordenats (x, y) compleixen la teva funció!'
  const max = props.exercise?.maxScore || 12
  emit('complete', {
    _grade: {
      score: max,
      maxScore: max,
      feedback: '5 parells ordenats creats i validats correctament!',
    },
  })
}
</script>

