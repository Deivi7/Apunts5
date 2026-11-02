<template>
  <div class="ws-lab printable-worksheet">
    <div class="ws-controls no-print">
      <div class="ctrl-group">
        <span class="ctrl-label">Tipo</span>
        <button
          v-for="t in typeOpts"
          :key="t.id"
          type="button"
          class="level-pill"
          :class="{ on: wsType === t.id }"
          @click="wsType = t.id; regen()"
        >
          {{ t.label }}
        </button>
      </div>
      <div class="ctrl-group">
        <span class="ctrl-label">Nivel</span>
        <button
          v-for="l in levelOpts"
          :key="l.id"
          type="button"
          class="level-pill"
          :class="{ on: wsLevel === l.id }"
          @click="wsLevel = l.id; regen()"
        >
          {{ l.label }}
        </button>
      </div>
      <div class="ctrl-group">
        <span class="ctrl-label">Cantidad</span>
        <button
          v-for="n in counts"
          :key="n"
          type="button"
          class="level-pill"
          :class="{ on: wsCount === n }"
          @click="wsCount = n; regen()"
        >
          {{ n }}
        </button>
      </div>
      <div class="ws-toolbar">
        <button type="button" class="ex-btn" @click="regen">🎲 Nueva ficha</button>
        <button type="button" class="ex-btn" @click="showSolutions = !showSolutions">
          {{ showSolutions ? '👁️ Ocultar soluciones' : '👁️ Mostrar soluciones' }}
        </button>
        <button type="button" class="ex-btn ex-btn-primary" @click="printSheet">
          🖨️ Imprimir / Guardar PDF
        </button>
      </div>
    </div>

    <p class="match-hint no-print" style="margin: 0;">
      Genera fichas de <strong>sumas, restas, multiplicaciones y divisiones</strong> para resolver a mano.
      Usa Imprimir para sacar la hoja en papel o PDF.
    </p>

    <div class="worksheet-print-header">
      <div>
        <strong>Álvaro Study Hub • Ficha de Práctica de Matemáticas</strong>
        <div class="ws-subtitle">{{ typeTitle }} · Nivel {{ levelLabel }} · {{ items.length }} operaciones</div>
      </div>
      <div class="worksheet-student-info">
        <span>Nombre: _______________________</span>
        <span>Fecha: _______________</span>
        <span>Nota: _______ / {{ items.length }}</span>
      </div>
    </div>

    <div class="worksheet-grid">
      <article
        v-for="item in items"
        :key="item.id"
        class="worksheet-card"
        :class="{ 'is-correct': checked && isItemOk(item) }"
      >
        <div class="ws-card-header">
          <span class="ws-badge">{{ badgeFor(item) }}</span>
          <span class="ws-num">Ej. {{ item.id }}</span>
        </div>

        <div class="ws-operation-box">
          <div v-if="item.type === 'mult'" class="multiplication-column-view ws-vertical-exercise">
            <div class="mult-line">{{ fmt(item.a) }}</div>
            <div class="mult-line">× {{ fmt(item.b) }}</div>
            <div class="mult-divider" />
            <div class="mult-line ws-blank-line">________</div>
          </div>
          <div v-else-if="item.type === 'div'" class="ws-div-simple">
            <div class="ws-div-eq">{{ fmt(item.a) }} ÷ {{ fmt(item.b) }}</div>
            <div class="ws-div-slots">
              <span>Cociente: ________</span>
              <span>Resto: ________</span>
            </div>
          </div>
          <div v-else class="ws-addsub">
            <div class="ws-addsub-eq mono">{{ fmt(item.a) }} {{ item.symbol }} {{ fmt(item.b) }} =</div>
            <div class="ws-blank-line">________________</div>
          </div>
        </div>

        <div class="ws-workspace-blank" aria-hidden="true" />

        <div class="ws-check-row no-print">
          <label>
            Resultado
            <input
              v-model="answers[item.id]"
              type="number"
              class="ws-input-ans"
              placeholder="?"
            >
          </label>
          <span v-if="item.type === 'div'" class="ws-resto-field">
            Resto
            <input
              v-model="remainders[item.id]"
              type="number"
              class="ws-input-ans"
              placeholder="r"
            >
          </span>
        </div>

        <div v-if="showSolutions" class="ws-solution-reveal">
          ✅ Solución: {{ solutionFor(item) }}
        </div>
      </article>
    </div>

    <div class="mult-actions no-print">
      <button type="button" class="ex-btn ex-btn-primary" @click="checkAll">✓ Comprobar ficha</button>
      <button type="button" class="ex-btn" @click="printSheet">🖨️ Imprimir</button>
    </div>

    <p v-if="feedback" class="feedback-msg no-print" :class="ok ? 'feedback-ok' : 'feedback-bad'">
      {{ feedback }}
    </p>

    <div v-if="showSolutions" class="ws-sol-panel">
      <h4>📋 Solucionario completo</h4>
      <ol>
        <li v-for="item in items" :key="'sol-'+item.id">
          <strong>Ej. {{ item.id }}:</strong> {{ solutionFor(item) }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { generateWorksheetItems, parseNumericAnswer } from '@/modules/mates/operacionesMath.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const typeOpts = [
  { id: 'all', label: '🔀 Mixta (+ − × ÷)' },
  { id: 'add-sub', label: '➕➖ Sumas y restas' },
  { id: 'mult-div', label: '✖️➗ Mult. y div.' },
  { id: 'add', label: '➕ Solo sumas' },
  { id: 'sub', label: '➖ Solo restas' },
  { id: 'mult', label: '✖️ Solo multiplicaciones' },
  { id: 'div', label: '➗ Solo divisiones' },
]
const levelOpts = [
  { id: 'easy', label: 'Nivel 1' },
  { id: 'medium', label: 'Nivel 2 ⭐' },
  { id: 'hard', label: 'Nivel 3 🔥' },
]
const counts = [6, 8, 10, 12]

const wsType = ref('all')
const wsLevel = ref('medium')
const wsCount = ref(8)
const items = ref([])
const answers = ref({})
const remainders = ref({})
const showSolutions = ref(false)
const feedback = ref('')
const ok = ref(false)
const checked = ref(false)

const typeTitle = computed(() => typeOpts.find((t) => t.id === wsType.value)?.label || 'Ficha mixta')
const levelLabel = computed(() => levelOpts.find((l) => l.id === wsLevel.value)?.label || wsLevel.value)

function fmt(n) {
  return Number(n).toLocaleString('es-ES')
}

function badgeFor(item) {
  return ({
    add: 'Suma',
    sub: 'Resta',
    mult: 'Multiplicación',
    div: 'División',
  })[item.type] || item.type
}

function solutionFor(item) {
  if (item.type === 'div') {
    const rest = item.remainder ? ` · resto ${fmt(item.remainder)}` : ' · resto 0'
    return `${fmt(item.a)} ÷ ${fmt(item.b)} = ${fmt(item.quotient)}${rest}`
  }
  return `${fmt(item.a)} ${item.symbol} ${fmt(item.b)} = ${fmt(item.ans)}`
}

function expectedFor(item) {
  return item.type === 'div' ? item.quotient : item.ans
}

function isItemOk(item) {
  const mainOk = parseNumericAnswer(answers.value[item.id]) === expectedFor(item)
  if (item.type !== 'div') return mainOk
  return mainOk && parseNumericAnswer(remainders.value[item.id]) === item.remainder
}

function regen() {
  items.value = generateWorksheetItems({
    type: wsType.value,
    level: wsLevel.value,
    count: wsCount.value,
  })
  answers.value = {}
  remainders.value = {}
  showSolutions.value = false
  feedback.value = ''
  ok.value = false
  checked.value = false
}

function checkAll() {
  checked.value = true
  let hits = 0
  for (const item of items.value) {
    if (isItemOk(item)) hits += 1
  }
  const total = items.value.length
  ok.value = hits === total
  feedback.value = ok.value
    ? `¡Ficha perfecta! ${hits}/${total} operaciones correctas.`
    : `${hits}/${total} correctas. Revisa o muestra el solucionario.`
  emit('update:modelValue', { answers: { ...answers.value }, remainders: { ...remainders.value }, hits, total })
  const max = props.exercise?.maxScore || total
  emit('complete', {
    _grade: {
      score: Math.round((hits / Math.max(1, total)) * max),
      maxScore: max,
      feedback: feedback.value,
    },
  })
}

function printSheet() {
  // Asegura cabecera visible y oculta UI de pantalla al imprimir vía CSS .no-print
  window.print()
}

onMounted(() => regen())
</script>

<style scoped>
.ws-lab { display: grid; gap: 1rem; max-width: 980px; }
.ws-controls { display: grid; gap: 0.55rem; }
.ctrl-group { display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center; }
.ctrl-label { font-size: 0.72rem; font-weight: 800; color: var(--text-muted); min-width: 4.5rem; }
.level-pill {
  border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 999px;
  padding: 0.28rem 0.65rem; font-weight: 800; font-size: 0.78rem; cursor: pointer; font-family: inherit;
}
.level-pill.on {
  background: color-mix(in srgb, var(--primary) 16%, var(--bg-card));
  border-color: var(--primary); color: var(--primary);
}
.ws-toolbar { display: flex; flex-wrap: wrap; gap: 0.45rem; }
.worksheet-print-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.85rem;
  align-items: center;
  border-bottom: 2px solid var(--border-color);
  padding-bottom: 0.85rem;
}
.ws-subtitle { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem; }
.worksheet-student-info {
  display: flex; flex-wrap: wrap; gap: 1rem;
  font-size: 0.85rem; font-weight: 700;
}
.worksheet-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
}
.worksheet-card {
  background: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 14px;
  padding: 1rem;
  display: grid;
  gap: 0.65rem;
}
.worksheet-card.is-correct {
  border-color: var(--accent-green, #10b981);
}
.ws-card-header { display: flex; justify-content: space-between; align-items: center; }
.ws-badge {
  font-size: 0.72rem; font-weight: 800; padding: 0.2rem 0.55rem; border-radius: 999px;
  background: var(--primary-light, #eef2ff); color: var(--primary);
  text-transform: uppercase;
}
.ws-num { font-size: 0.8rem; font-weight: 800; color: var(--text-muted); }
.ws-operation-box {
  display: flex; justify-content: center; align-items: center;
  min-height: 120px; padding: 0.75rem; background: var(--bg-main); border-radius: 10px;
}
.ws-vertical-exercise { min-width: 140px; }
.ws-blank-line { color: var(--text-muted); letter-spacing: 0.04em; }
.ws-div-simple, .ws-addsub { text-align: center; display: grid; gap: 0.55rem; }
.ws-div-eq, .ws-addsub-eq {
  font-size: 1.25rem; font-weight: 900; color: var(--primary);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
.ws-div-slots {
  display: grid; gap: 0.35rem; font-weight: 700; font-size: 0.9rem; color: var(--text-muted);
}
.ws-workspace-blank {
  height: 72px;
  border-radius: 8px;
  border: 1px dashed var(--border-color);
  background-image: radial-gradient(var(--border-color) 1.2px, transparent 1.2px);
  background-size: 14px 14px;
}
.ws-check-row {
  display: flex; flex-wrap: wrap; gap: 0.65rem; align-items: end;
  font-size: 0.8rem; font-weight: 800; color: var(--text-muted);
}
.ws-input-ans {
  display: block; width: 100px; margin-top: 0.25rem;
  padding: 0.4rem 0.55rem; border-radius: 8px;
  border: 1px solid var(--border-color); background: var(--bg-main);
  font-family: 'JetBrains Mono', ui-monospace, monospace; font-weight: 800;
}
.ws-solution-reveal {
  background: var(--primary-light, #eef2ff);
  border: 1px solid var(--primary-border, #c7d2fe);
  padding: 0.55rem 0.75rem; border-radius: 8px;
  font-size: 0.86rem; font-weight: 700;
}
.ws-sol-panel {
  border: 2px dashed var(--accent-green, #10b981);
  background: var(--bg-main);
  border-radius: 12px;
  padding: 1rem 1.15rem;
}
.ws-sol-panel h4 { margin: 0 0 0.5rem; color: var(--accent-green, #059669); }
.ws-sol-panel ol { margin: 0; padding-left: 1.2rem; display: grid; gap: 0.25rem; }
.mult-actions { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

@media print {
  .no-print { display: none !important; }
  .ws-lab {
    max-width: none !important;
  }
  .worksheet-print-header {
    display: flex !important;
    border-bottom: 2px solid #000 !important;
    margin-bottom: 18px !important;
    color: #000 !important;
  }
  .worksheet-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 16px !important;
  }
  .worksheet-card {
    border: 1px solid #444 !important;
    box-shadow: none !important;
    background: #fff !important;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .ws-workspace-blank {
    height: 110px !important;
    border: 1px dashed #999 !important;
    background: #fff !important;
  }
  .ws-sol-panel {
    break-before: page;
    page-break-before: always;
  }
}
</style>

<style>
/* Impresión Vue shell: ocultar chrome al imprimir fichas */
@media print {
  .top-navbar,
  .module-hero,
  .app-sidebar,
  .mobile-sidebar-toggle-bar,
  .site-header,
  .connection-banner,
  .ex-type-pill,
  .exercise-actions {
    display: none !important;
  }
  .main-content,
  .topic-main,
  .content-area,
  .ex-player {
    margin: 0 !important;
    padding: 0 !important;
    max-width: 100% !important;
    box-shadow: none !important;
    border: none !important;
  }
  body {
    background: #fff !important;
  }
}
</style>
