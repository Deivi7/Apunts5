<template>
  <div class="solver-lab">
    <div class="controls-panel">
      <h3 class="ctrl-title">Tipo de División</h3>
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
        🎲 Generar Nueva División
      </button>

      <hr class="ctrl-sep">

      <h3 class="ctrl-title">O escribe tu división (deberes):</h3>
      <div class="custom-input-group">
        <input v-model.number="customD" type="number" class="input-hub" placeholder="Dividendo (ej: 846)" min="1">
        <span class="op-mark">÷</span>
        <input v-model.number="customV" type="number" class="input-hub" placeholder="Divisor (ej: 24)" min="1">
        <button type="button" class="ex-btn ex-btn-primary" @click="loadCustom">Ver solución</button>
      </div>
    </div>

    <div class="board-canvas">
      <div class="solver-headline mono">
        {{ fmt(dividend) }} ÷ {{ fmt(divisor) }} = {{ fmt(data.quotient) }}
      </div>
      <div class="status-line" :class="data.isExact ? 'exact' : 'rem'">
        {{ data.isExact ? '✅ División Exacta (Resto = 0)' : `⚠️ División Entera (Resto = ${data.remainder})` }}
      </div>

      <div class="mode-row">
        <button type="button" class="level-pill" :class="{ on: mode === 'sub' }" @click="mode = 'sub'">
          📝 Con Restas Detalladas
        </button>
        <button type="button" class="level-pill" :class="{ on: mode === 'direct' }" @click="mode = 'direct'">
          ⚡ Método Directo (Mental)
        </button>
      </div>

      <div class="division-box-view">
        <div class="div-main-layout">
          <div class="div-left-cascade">
            <div v-for="(row, ri) in cascadeRows" :key="'r'+ri" class="div-row" :class="row.rowClass">
              <template v-for="(cell, ci) in row.cells" :key="'c'+ri+'-'+ci">
                <span
                  v-if="cell?.isSlash"
                  class="d-slash"
                >//</span>
                <span
                  v-else
                  class="d-cell"
                  :class="cellClass(cell)"
                  :style="cell?.border ? 'border-bottom: 2.5px solid var(--text-main);' : undefined"
                  :title="cell?.title || ''"
                >{{ cell?.text ?? '\u00a0' }}</span>
              </template>
            </div>
          </div>
          <div class="div-right-box">
            <div class="div-divisor-row">{{ divisor }}</div>
            <div class="div-quotient-row">{{ fmt(data.quotient) }}</div>
            <div style="padding: 0.5rem 0.2rem;">
              <div class="div-badge-status" :class="data.isExact ? 'badge-exact' : 'badge-remainder'">
                {{ data.isExact ? '✅ Resto = 0' : `⚠️ Resto = ${data.remainder}` }}
              </div>
              <div class="div-check-card">
                <div class="proof-kicker">Prueba:</div>
                <div class="mono proof-line">({{ divisor }} × {{ fmt(data.quotient) }}) + {{ data.remainder }}</div>
                <div class="mono proof-eq">= {{ fmt(dividend) }} ✔️</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h4 class="steps-title">🧠 Razonamiento Paso a Paso:</h4>
      <div v-for="(bubble, i) in bubbles" :key="'b'+i" class="step-bubble" v-html="bubble" />
      <div class="step-bubble step-final">
        <strong>🎯 Prueba Oficial de la División</strong><br>
        Dividendo = (Divisor × Cociente) + Resto<br>
        <span class="mono">
          ({{ divisor }} × {{ fmt(data.quotient) }}) + {{ data.remainder }}
          = {{ fmt(divisor * data.quotient) }} + {{ data.remainder }}
          = <strong>{{ fmt(dividend) }}</strong>
        </span> ✔️ ¡Comprobación Perfecta!
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { computeDivisionCascade, generateDivision } from '@/modules/mates/operacionesMath.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const levelLabels = {
  '3div2': '3 cifras ÷ 2 cifras',
  '4div2': '4 cifras ÷ 2 cifras',
  '3div1': '3 cifras ÷ 1 cifra',
  '5div2': '5 cifras ÷ 2 cifras',
}

const level = ref(props.exercise?.content?.level || '3div2')
const dividend = ref(896)
const divisor = ref(28)
const customD = ref(null)
const customV = ref(null)
const mode = ref('sub')

const data = computed(() => computeDivisionCascade(dividend.value, Math.max(1, divisor.value)))

const cascadeRows = computed(() => {
  const { dStr, L, totalCols, steps } = data.value
  const rows = []

  const dividendCells = Array.from({ length: totalCols }, () => null)
  for (let i = 0; i < L; i += 1) {
    dividendCells[i + 1] = { text: dStr[i], isDividend: true }
  }
  rows.push({ rowClass: 'row-dividend', cells: dividendCells })

  steps.forEach((step, sIdx) => {
    const isLast = sIdx === steps.length - 1

    if (mode.value === 'sub' && !step.isTrailingZero) {
      const subCells = Array.from({ length: totalCols }, () => null)
      const minusCol = Math.max(0, step.productStartCol - 1)
      subCells[minusCol] = { text: '−', isMinus: true, border: true }
      for (let i = 0; i < step.productStr.length; i += 1) {
        const col = step.productStartCol + i
        subCells[col] = { text: step.productStr[i], isSub: true, border: true }
      }
      rows.push({ rowClass: 'row-sub', cells: subCells })
    }

    const remCells = Array.from({ length: totalCols }, () => null)
    for (let i = 0; i < step.remainderStr.length; i += 1) {
      const col = step.remainderStartCol + i
      remCells[col] = {
        text: step.remainderStr[i],
        isFinalRem: isLast && i === step.remainderStr.length - 1,
      }
    }
    step.nextBroughtDown.forEach((b) => {
      remCells[b.col] = { text: b.digit, isBrought: true, title: 'Cifra bajada del dividendo' }
    })
    if (isLast) {
      remCells[step.remainderEndCol + 1] = { text: '//', isSlash: true }
    }
    rows.push({ rowClass: isLast ? 'row-final-rem' : 'row-remainder', cells: remCells })
  })

  return rows
})

const bubbles = computed(() => {
  const { steps, divisor: v } = data.value
  if (!steps.length) return []
  const vLen = String(v).length
  const first = steps[0]
  const list = [
    `<strong>1. ¿Cuántas cifras cogemos del dividendo?</strong><br>
     El divisor <strong>${v}</strong> tiene <strong>${vLen} cifra(s)</strong>. Miramos las primeras cifras del dividendo:
     cogemos <strong>${first.curPart}</strong> porque es mayor o igual que ${v}.<br>
     Dividimos: ${v} × <strong>${first.qDigit}</strong> = ${first.product}.<br>
     Restamos: ${first.curPart} − ${first.product} = <strong>${first.remainder}</strong> de resto parcial.`,
  ]

  for (let i = 1; i < steps.length; i += 1) {
    const step = steps[i]
    const stepNum = i + 1
    if (step.isTrailingZero) {
      list.push(
        `<strong>${stepNum}. Cero al cociente y resto final</strong><br>
         Tenemos <strong>${step.curPart}</strong>, que no cabe en el divisor ${v}.
         Ponemos <strong>0 al cociente</strong>. No quedan más cifras por bajar, por lo que el resto final es <strong>${step.remainder}</strong>.`,
      )
      continue
    }
    const bDown = step.myBroughtDown || []
    let desc = ''
    if (bDown.length === 1) {
      desc = `Bajamos la cifra <strong>${bDown[0].digit}</strong> del dividendo ➔ formamos el número <strong>${step.curPart}</strong>.<br>`
    } else if (bDown.length > 1) {
      desc = `Bajamos la cifra <strong>${bDown[0].digit}</strong>: como no cabe en ${v}, ponemos <strong>0 al cociente</strong> y bajamos la siguiente cifra <strong>${bDown[1].digit}</strong> ➔ formamos el <strong>${step.curPart}</strong>.<br>`
    }
    desc += `Buscamos el cociente: ${v} × <strong>${step.qDigit}</strong> = ${step.product}.<br>`
    desc += `Restamos: ${step.curPart} − ${step.product} = <strong>${step.remainder}</strong> de resto parcial.`
    list.push(`<strong>${stepNum}. Paso siguiente</strong><br>${desc}`)
  }
  return list
})

function cellClass(cell) {
  if (!cell) return ''
  return {
    'row-dividend': cell.isDividend,
    'op-minus': cell.isMinus,
    'sub-digit': cell.isSub,
    'brought-down': cell.isBrought,
    'final-remainder': cell.isFinalRem,
  }
}

function fmt(n) {
  return Number(n).toLocaleString('es-ES')
}

function sync() {
  emit('update:modelValue', {
    dividend: dividend.value,
    divisor: divisor.value,
    quotient: data.value.quotient,
    remainder: data.value.remainder,
    level: level.value,
  })
}

function newRound() {
  const pair = generateDivision(level.value)
  dividend.value = pair.dividend
  divisor.value = pair.divisor
  sync()
}

function setLevel(key) {
  level.value = key
  newRound()
}

function loadCustom() {
  const d = Number(customD.value)
  const v = Number(customV.value)
  if (!Number.isFinite(d) || !Number.isFinite(v) || d <= 0 || v <= 0) return
  dividend.value = Math.trunc(d)
  divisor.value = Math.trunc(v)
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
.ctrl-title { margin: 0; font-size: 0.92rem; font-weight: 800; }
.ctrl-sep { border: none; border-top: 1px solid var(--border-color); margin: 0.15rem 0; }
.mult-levels, .mode-row { display: flex; flex-wrap: wrap; gap: 0.4rem; justify-content: center; }
.level-pill {
  border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 999px;
  padding: 0.32rem 0.7rem; font-weight: 800; font-size: 0.78rem; cursor: pointer; font-family: inherit;
}
.level-pill.on {
  background: color-mix(in srgb, var(--primary) 16%, var(--bg-card));
  border-color: var(--primary); color: var(--primary);
}
.custom-input-group { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.custom-input-group .input-hub { width: 7.5rem; }
.op-mark { font-weight: 900; }
.board-canvas { display: grid; gap: 0.75rem; justify-items: center; width: 100%; }
.solver-headline {
  font-size: clamp(1.25rem, 3vw, 1.8rem);
  font-weight: 800;
  color: var(--primary);
  text-align: center;
}
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
.status-line { font-size: 0.95rem; font-weight: 700; }
.status-line.exact { color: var(--accent-green, #059669); }
.status-line.rem { color: var(--accent-amber, #d97706); }
.steps-title {
  width: 100%;
  margin: 0.35rem 0 0;
  font-size: 0.95rem;
  font-weight: 800;
  justify-self: stretch;
}
.step-final { border-left-color: var(--accent-green, #10b981) !important; background: var(--primary-light, #eef2ff); }
.proof-kicker {
  font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 800; margin-bottom: 0.25rem;
}
.proof-line { font-size: 0.85rem; font-weight: 700; }
.proof-eq { font-size: 0.88rem; font-weight: 800; color: var(--primary); margin-top: 0.2rem; }
</style>
