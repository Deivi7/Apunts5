<template>
  <div class="pemdas-lab">
    <div class="mult-levels">
      <button
        v-for="n in 4"
        :key="n"
        type="button"
        class="level-pill"
        :class="{ on: pemdasLevel === n }"
        @click="setLevel(n)"
      >
        Nivel {{ n }}
      </button>
      <button type="button" class="ex-btn" @click="newExpr">🎲 Otra expresión</button>
    </div>

    <p class="match-hint" style="margin: 0;">🎯 Identifica la prioridad y resuelve:</p>
    <div class="pemdas-expr" v-html="highlightedExpr" />

    <form class="pemdas-form" @submit.prevent="check">
      <span class="pemdas-eq">Resultado final =</span>
      <input v-model="answer" type="number" class="input-hub" placeholder="?" autocomplete="off">
      <button type="submit" class="ex-btn ex-btn-primary">Comprobar</button>
      <button type="button" class="ex-btn" @click="revealSteps">Ver paso a paso</button>
    </form>

    <div v-if="stepsVisible && current?.steps?.length" class="steps">
      <div v-for="(st, idx) in current.steps" :key="idx" class="step-row">
        <span class="step-num">{{ idx + 1 }}</span>
        <span>{{ st }}</span>
      </div>
    </div>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { PEMDAS_DATABASE } from '@/modules/mates/operacionesData.js'
import { parseNumericAnswer } from '@/modules/mates/operacionesMath.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const pemdasLevel = ref(1)
const current = ref(null)
const answer = ref('')
const feedback = ref('')
const ok = ref(false)
const stepsVisible = ref(false)
const correctCount = ref(0)

const highlightedExpr = computed(() => {
  if (!current.value) return ''
  const { expr, focusPart } = current.value
  const safe = expr.replace(focusPart, `<mark class="focus">${focusPart}</mark>`)
  return safe
})

function pickRandom() {
  const list = PEMDAS_DATABASE[pemdasLevel.value] || PEMDAS_DATABASE[1]
  current.value = list[Math.floor(Math.random() * list.length)]
  answer.value = ''
  feedback.value = ''
  ok.value = false
  stepsVisible.value = false
}

function setLevel(n) {
  pemdasLevel.value = n
  pickRandom()
}

function newExpr() {
  pickRandom()
}

function revealSteps() {
  stepsVisible.value = true
}

function check() {
  if (!current.value) return
  ok.value = parseNumericAnswer(answer.value) === current.value.ans
  feedback.value = ok.value
    ? `¡Exacto! ${current.value.expr} = ${current.value.ans}`
    : `No coincide. Revisa la jerarquía o mira el paso a paso.`
  emit('update:modelValue', { level: pemdasLevel.value, answer: answer.value, expr: current.value.expr })
  if (ok.value) {
    correctCount.value += 1
    revealSteps()
    const max = props.exercise?.maxScore || 12
    const score = Math.min(max, correctCount.value * 3)
    if (score >= max) {
      emit('complete', {
        _grade: {
          score,
          maxScore: max,
          feedback: `${correctCount.value} expresiones resueltas correctamente.`,
        },
      })
    } else {
      emit('update:modelValue', { correctCount: correctCount.value, score })
      feedback.value += ` (${correctCount.value}/${Math.ceil(max / 3)} aciertos para el reto)`
    }
    setTimeout(() => pickRandom(), 800)
  }
}

onMounted(() => pickRandom())
</script>

<style scoped>
.pemdas-lab { display: grid; gap: 0.85rem; max-width: 560px; }
.mult-levels { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.level-pill {
  border: 1px solid var(--border-color); background: var(--bg-card); border-radius: 999px;
  padding: 0.28rem 0.65rem; font-weight: 800; font-size: 0.78rem; cursor: pointer; font-family: inherit;
}
.level-pill.on {
  background: color-mix(in srgb, var(--primary) 16%, var(--bg-card));
  border-color: var(--primary); color: var(--primary);
}
.pemdas-expr {
  font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 900; text-align: center;
  padding: 1rem; border-radius: 14px; border: 1px solid var(--border-color); background: var(--bg-card);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
}
.pemdas-expr :deep(.focus) {
  background: color-mix(in srgb, var(--accent-amber, #f59e0b) 35%, transparent);
  padding: 0 0.15rem; border-radius: 4px;
}
.pemdas-form { display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: center; }
.pemdas-eq { font-weight: 800; }
.steps { display: grid; gap: 0.45rem; }
.step-row {
  display: grid; grid-template-columns: 2rem 1fr; gap: 0.5rem; align-items: start;
  padding: 0.5rem 0.65rem; border-radius: 12px; background: var(--bg-main); border: 1px solid var(--border-color);
  font-size: 0.9rem; line-height: 1.45;
}
.step-num {
  width: 1.75rem; height: 1.75rem; border-radius: 999px; display: grid; place-items: center;
  background: var(--primary); color: #fff; font-weight: 800; font-size: 0.78rem;
}
</style>
