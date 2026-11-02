<template>
  <div class="solver-lab">
    <div class="controls-panel">
      <h3 class="ctrl-title">Dificultad</h3>
      <div class="mult-levels">
        <button
          v-for="(label, key) in levelLabels"
          :key="key"
          type="button"
          class="level-pill"
          :class="{ on: level === key }"
          @click="setLevel(key)"
        >
          {{ label }}
        </button>
      </div>

      <button type="button" class="ex-btn ex-btn-primary" @click="newRound">
        🎲 Generar Nueva Operación
      </button>

      <hr class="ctrl-sep">

      <h3 class="ctrl-title">O escribe tus números (deberes):</h3>
      <div class="custom-input-group">
        <input v-model.number="customA" type="number" class="input-hub" placeholder="Arriba (ej: 428)" min="1">
        <span class="op-mark">×</span>
        <input v-model.number="customB" type="number" class="input-hub" placeholder="Abajo (ej: 36)" min="1">
        <button type="button" class="ex-btn ex-btn-primary" @click="loadCustom">Ver solución</button>
      </div>
    </div>

    <div class="board-canvas">
      <div class="solver-headline mono">
        {{ fmt(a) }} × {{ fmt(b) }} = {{ fmt(total) }}
      </div>

      <div class="multiplication-column-view">
        <div class="mult-line">{{ fmt(a) }}</div>
        <div class="mult-line">× {{ fmt(b) }}</div>
        <div class="mult-divider" />
        <div
          v-for="(row, i) in partials"
          :key="'p'+i"
          class="mult-line"
          :style="{ color: rowColors[i % rowColors.length] }"
        >
          {{ fmt(row.product) }}<span v-if="row.dots" class="mult-dots">{{ row.dots }}</span>
        </div>
        <div class="mult-divider" />
        <div class="mult-line mult-total">{{ fmt(total) }}</div>
      </div>

      <h4 class="steps-title">📝 Explicación de los Pasos:</h4>
      <div
        v-for="(row, i) in partials"
        :key="'s'+i"
        class="step-bubble"
      >
        <strong>Paso {{ i + 1 }}: Multiplicar por {{ row.placeNames }} ({{ row.digit }})</strong><br>
        {{ a }} × {{ row.digit }} = <strong>{{ fmt(row.product) }}</strong>.
        <template v-if="row.shift > 0">
          Recuerda dejar <strong>{{ row.shift }} desplazamiento(s) a la derecha</strong>
          ({{ row.dots }}) porque estás multiplicando por {{ row.placeNames }}.
        </template>
      </div>
      <div class="step-bubble step-final">
        <strong>Paso Final: Sumar las Filas Parciales</strong><br>
        Sumamos en vertical:
        {{ sumParts.map((n) => fmt(n)).join(' + ') }}
        = <strong>{{ fmt(total) }}</strong>.
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { generateMultiplication, multiplicationPartials } from '@/modules/mates/operacionesMath.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const levelLabels = {
  '2x2': '2 × 2 cifras',
  '3x2': '3 × 2 cifras',
  '4x2': '4 × 2 cifras',
  '3x3': '3 × 3 cifras',
}
const rowColors = ['var(--primary)', 'var(--secondary, #0ea5e9)', 'var(--accent-purple, #8b5cf6)', '#ec4899', '#f97316']

const level = ref(props.exercise?.content?.level || '3x2')
const a = ref(428)
const b = ref(36)
const customA = ref(null)
const customB = ref(null)

const total = computed(() => Number(a.value) * Number(b.value))
const partials = computed(() => multiplicationPartials(a.value, b.value))
const sumParts = computed(() => partials.value.map((p) => p.product * 10 ** p.shift))

function fmt(n) {
  return Number(n).toLocaleString('es-ES')
}

function sync() {
  emit('update:modelValue', { a: a.value, b: b.value, total: total.value, level: level.value })
}

function newRound() {
  const pair = generateMultiplication(level.value)
  a.value = pair.a
  b.value = pair.b
  sync()
}

function setLevel(key) {
  level.value = key
  newRound()
}

function loadCustom() {
  const na = Number(customA.value)
  const nb = Number(customB.value)
  if (!Number.isFinite(na) || !Number.isFinite(nb) || na <= 0 || nb <= 0) return
  a.value = Math.trunc(na)
  b.value = Math.trunc(nb)
  sync()
}

onMounted(() => newRound())
</script>

<style scoped>
.solver-lab {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
  align-items: start;
}
@media (min-width: 1100px) {
  .solver-lab { grid-template-columns: minmax(240px, 300px) 1fr; }
}
.controls-panel {
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 14px;
  background: var(--bg-main);
}
.ctrl-title {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 800;
}
.ctrl-sep {
  border: none;
  border-top: 1px solid var(--border-color);
  margin: 0.15rem 0;
}
.mult-levels { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.level-pill {
  border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 999px;
  padding: 0.32rem 0.7rem; font-weight: 800; font-size: 0.78rem; cursor: pointer; font-family: inherit;
}
.level-pill.on {
  background: color-mix(in srgb, var(--primary) 16%, var(--bg-card));
  border-color: var(--primary); color: var(--primary);
}
.custom-input-group {
  display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center;
}
.custom-input-group .input-hub { width: 7.5rem; }
.op-mark { font-weight: 900; }
.board-canvas { display: grid; gap: 0.85rem; justify-items: center; }
.solver-headline {
  font-size: clamp(1.25rem, 3vw, 1.8rem);
  font-weight: 800;
  color: var(--primary);
  text-align: center;
}
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.mult-dots { color: var(--accent-amber, #f59e0b); font-weight: 900; margin-left: 0.15rem; }
.mult-total { color: var(--accent-green, #059669); font-weight: 900; }
.steps-title {
  width: 100%;
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  font-weight: 800;
  justify-self: stretch;
}
.step-final { border-left-color: var(--accent-green, #10b981) !important; }
</style>
