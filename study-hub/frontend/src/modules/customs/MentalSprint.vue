<template>
  <div class="sprint-lab">
    <div class="sprint-header">
      <div>
        <h4 class="sprint-title">⚡ Sprint de cálculo mental</h4>
        <p class="match-hint" style="margin: 0.25rem 0 0;">
          Objetivo: el máximo de operaciones en {{ seconds }}s (2 minutos). Enter o OK para validar.
        </p>
      </div>
      <div class="sprint-meters">
        <div class="sprint-meter"><span>⏱</span><strong>{{ remaining }}s</strong></div>
        <div class="sprint-meter ok"><span>✓</span><strong>{{ correct }}</strong></div>
        <div class="sprint-meter bad"><span>✗</span><strong>{{ wrong }}</strong></div>
      </div>
    </div>

    <div class="sprint-progress">
      <div class="sprint-progress-fill" :style="{ width: `${timePct}%` }" />
    </div>

    <div class="sprint-ops-block">
      <p class="sprint-ops-label">Elige operaciones</p>
      <p class="sprint-ops-hint">Marca las que quieras incluir (como en el reto antiguo). Puedes practicar solo sumas/restas o también multiplicaciones y divisiones.</p>
      <div class="sprint-ops" role="group" aria-label="Elige operaciones">
        <button
          v-for="op in availableOps"
          :key="op.symbol"
          type="button"
          class="sprint-op-pill"
          :class="{ on: enabledOps.includes(op.symbol) }"
          :disabled="running"
          :aria-pressed="enabledOps.includes(op.symbol)"
          @click="toggleOp(op.symbol)"
        >
          <span class="sprint-op-check" aria-hidden="true">{{ enabledOps.includes(op.symbol) ? '☑' : '☐' }}</span>
          <span class="sprint-op-text">
            <strong>{{ op.label }}</strong>
            <small>{{ op.example }}</small>
          </span>
        </button>
      </div>
    </div>

    <div v-if="!running && !finished" class="sprint-start-card">
      <p class="match-hint" style="margin: 0 0 0.75rem;">
        Cuando hayas elegido las operaciones, pulsa Iniciar.
      </p>
      <button type="button" class="ex-btn ex-btn-primary" @click="start">▶ Iniciar sprint</button>
    </div>

    <!-- Clase .active: el CSS del tema oculta .sprint-arena sin ella -->
    <div v-else class="sprint-arena active mental-sprint-arena">
      <div class="sprint-equation">{{ current.a }} {{ current.op }} {{ current.b }} = ?</div>
      <form class="sprint-form" @submit.prevent="check">
        <input
          ref="inputEl"
          v-model="answer"
          type="number"
          class="input-hub sprint-input"
          :disabled="finished"
          placeholder="?"
          autocomplete="off"
        >
        <button type="submit" class="ex-btn ex-btn-primary" :disabled="finished">OK</button>
        <button type="button" class="ex-btn" @click="reset">Reiniciar</button>
      </form>
      <p v-if="flash" class="sprint-flash" :class="flashOk ? 'ok' : 'bad'">{{ flash }}</p>
    </div>

    <p v-if="finished" class="feedback-ok" style="margin: 0;">
      Sprint terminado: {{ correct }} aciertos · {{ wrong }} fallos · ritmo {{ pace }}/min
    </p>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref, watch } from 'vue'
import { useTimer } from '@/composables/useTimer'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const availableOps = [
  { symbol: '+', label: '➕ Sumas', example: 'ej: 24 + 38' },
  { symbol: '-', label: '➖ Restas', example: 'ej: 72 − 35' },
  { symbol: '×', label: '✖️ Multiplicaciones', example: 'tablas del 2 al 12' },
  { symbol: '÷', label: '➗ Divisiones exactas', example: 'ej: 72 ÷ 8' },
]
const enabledOps = ref([...(props.exercise?.content?.ops || ['+', '-', '×', '÷'])])
const seconds = props.exercise?.config?.seconds || 120
const { remaining, running, start: startTimer, stop, reset: resetTimer } = useTimer(seconds)
const correct = ref(0)
const wrong = ref(0)
const answer = ref('')
const finished = ref(false)
const flash = ref('')
const flashOk = ref(false)
const inputEl = ref(null)
const current = reactive({ a: 0, b: 0, op: '+', result: 0 })

const timePct = computed(() => Math.max(0, Math.round((remaining.value / seconds) * 100)))
const pace = computed(() => {
  const used = Math.max(1, seconds - remaining.value)
  return Math.round((correct.value / used) * 60)
})

function toggleOp(op) {
  if (enabledOps.value.includes(op)) {
    if (enabledOps.value.length === 1) return
    enabledOps.value = enabledOps.value.filter((o) => o !== op)
  } else {
    enabledOps.value = [...enabledOps.value, op]
  }
}

function nextOp() {
  const ops = enabledOps.value.length ? enabledOps.value : ['+']
  const op = ops[Math.floor(Math.random() * ops.length)]
  let a
  let b
  let result
  if (op === '+') {
    a = 8 + Math.floor(Math.random() * 45)
    b = 8 + Math.floor(Math.random() * 45)
    result = a + b
  } else if (op === '-') {
    a = 20 + Math.floor(Math.random() * 70)
    b = 4 + Math.floor(Math.random() * Math.max(1, a - 5))
    if (b >= a) b = Math.max(1, a - 3)
    result = a - b
  } else if (op === '×') {
    // Tablas 2 al 12 (como el HTML antiguo)
    a = 2 + Math.floor(Math.random() * 11)
    b = 2 + Math.floor(Math.random() * 11)
    result = a * b
  } else {
    // Divisiones exactas
    b = 2 + Math.floor(Math.random() * 10)
    result = 2 + Math.floor(Math.random() * 11)
    a = b * result
  }
  Object.assign(current, { a, b, op, result })
  answer.value = ''
  nextTick(() => inputEl.value?.focus())
}

function start() {
  finished.value = false
  correct.value = 0
  wrong.value = 0
  flash.value = ''
  resetTimer(seconds)
  startTimer()
  nextOp()
}

function reset() {
  stop()
  finished.value = false
  correct.value = 0
  wrong.value = 0
  flash.value = ''
  resetTimer(seconds)
}

function check() {
  if (finished.value || !running.value) return
  const ok = Number(answer.value) === current.result
  if (ok) {
    correct.value += 1
    flashOk.value = true
    flash.value = '¡Bien!'
  } else {
    wrong.value += 1
    flashOk.value = false
    flash.value = `Era ${current.result}`
  }
  emit('update:modelValue', { correct: correct.value, wrong: wrong.value })
  nextOp()
}

function finishSprint() {
  if (finished.value) return
  finished.value = true
  const max = props.exercise?.maxScore || 20
  const score = Math.min(max, correct.value)
  emit('complete', {
    score,
    _grade: { score, maxScore: max, feedback: `Sprint: ${correct.value} aciertos` },
  })
}

watch(running, (isRun, wasRun) => {
  if (wasRun && !isRun && remaining.value === 0) finishSprint()
})
</script>

<style scoped>
.sprint-lab { display: grid; gap: 0.85rem; }
.sprint-header {
  display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.75rem; align-items: flex-start;
}
.sprint-title { margin: 0; font-size: 1.05rem; }
.sprint-meters { display: flex; gap: 0.5rem; }
.sprint-meter {
  display: inline-flex; gap: 0.35rem; align-items: center;
  padding: 0.35rem 0.65rem; border-radius: 999px;
  background: var(--bg-main); border: 1px solid var(--border-color);
  font-size: 0.85rem;
}
.sprint-meter.ok { color: var(--accent-green, #059669); }
.sprint-meter.bad { color: var(--accent-red, #dc2626); }
.sprint-progress {
  height: 8px; border-radius: 999px; background: var(--bg-main); overflow: hidden;
  border: 1px solid var(--border-color);
}
.sprint-progress-fill {
  height: 100%; background: linear-gradient(90deg, #6366f1, #22c55e); transition: width 0.25s linear;
}
.sprint-ops-block {
  display: grid;
  gap: 0.35rem;
}
.sprint-ops-label {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--text-main);
}
.sprint-ops-hint {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
}
.sprint-ops {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 0.5rem;
}
.sprint-op-pill {
  display: flex;
  align-items: flex-start;
  gap: 0.45rem;
  text-align: left;
  border: 1.5px solid var(--border-color);
  background: var(--bg-card);
  border-radius: 12px;
  padding: 0.65rem 0.75rem;
  cursor: pointer;
  font-family: inherit;
  color: var(--text-main);
}
.sprint-op-pill:disabled { opacity: 0.75; cursor: default; }
.sprint-op-pill.on {
  background: color-mix(in srgb, var(--primary) 14%, var(--bg-card));
  border-color: var(--primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 18%, transparent);
}
.sprint-op-check {
  font-size: 1.05rem;
  line-height: 1.2;
  color: var(--primary);
}
.sprint-op-text {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}
.sprint-op-text strong {
  font-size: 0.88rem;
  font-weight: 800;
}
.sprint-op-text small {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
}
.sprint-start-card, .mental-sprint-arena {
  border: 1px solid var(--border-color); border-radius: 16px; padding: 1.1rem;
  background: linear-gradient(180deg, var(--bg-card), color-mix(in srgb, var(--primary) 4%, var(--bg-card)));
}
/* Forzar visible frente al CSS legacy .sprint-arena { display:none } */
.sprint-arena.mental-sprint-arena,
.sprint-arena.active.mental-sprint-arena {
  display: block !important;
}
.sprint-equation {
  font-size: clamp(1.6rem, 4vw, 2.35rem); font-weight: 900; letter-spacing: 0.02em;
  text-align: center; margin-bottom: 0.85rem; font-variant-numeric: tabular-nums;
}
.sprint-form { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; }
.sprint-input { max-width: 8.5rem; text-align: center; font-size: 1.25rem; font-weight: 800; }
.sprint-flash { text-align: center; font-weight: 800; margin: 0.55rem 0 0; }
.sprint-flash.ok { color: var(--accent-green, #059669); }
.sprint-flash.bad { color: var(--accent-red, #dc2626); }
</style>
