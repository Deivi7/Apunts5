<template>
  <div class="verb-lab">
    <p class="match-hint">
      Practica como en el taller original: elige la forma en cada frase, identifica infinitivo y conjugación, y clasifica la forma resaltada.
      Progreso: {{ solvedCount }} / {{ totalTasks }} aciertos.
    </p>

    <section class="verb-lab-block">
      <h4 style="margin: 0 0 0.65rem;">📝 10 frases tipo DELE (infinitivo, gerundio o participio)</h4>
      <div class="verb-lab-grid">
        <div v-for="item in dele" :key="item.id" class="exercise-question-card" style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <p style="margin: 0 0 0.5rem; font-weight: 700;">
            {{ item.text.replace('___', '______') }}
          </p>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            <button
              v-for="opt in item.opts"
              :key="opt"
              type="button"
              class="ex-btn"
              :class="deleBtnClass(item.id, opt)"
              @click="pickDele(item, opt)"
            >
              {{ opt }}
            </button>
          </div>
          <p v-if="deleFb[item.id]" class="match-hint" :class="deleFb[item.id].ok ? 'feedback-ok' : 'feedback-bad'" style="margin: 0.45rem 0 0;">
            {{ deleFb[item.id].text }}
          </p>
        </div>
      </div>
    </section>

    <section class="verb-lab-block">
      <h4 style="margin: 0.65rem 0;">🔬 12 formas verbales: infinitivo y conjugación</h4>
      <div class="verb-lab-grid">
        <div v-for="(row, idx) in conj" :key="row.id" class="exercise-question-card" style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <p style="margin: 0 0 0.45rem;">
            <strong>{{ idx + 1 }}.</strong> Forma: <span style="color: var(--primary); font-weight: 800;">«{{ row.form }}»</span>
          </p>
          <input
            v-model="conjInf[row.id]"
            type="text"
            class="input-hub"
            placeholder="Infinitivo (-ar/-er/-ir)…"
            style="margin-bottom: 0.4rem;"
          >
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button
              v-for="n in 3"
              :key="n"
              type="button"
              class="ex-btn"
              :class="conjBtnClass(row.id, n)"
              @click="pickConj(row, n)"
            >
              {{ n }}ª (-{{ n === 1 ? 'ar' : n === 2 ? 'er' : 'ir' }})
            </button>
          </div>
          <p v-if="conjFb[row.id]" class="match-hint" :class="conjFb[row.id].ok ? 'feedback-ok' : 'feedback-bad'" style="margin: 0.45rem 0 0;">
            {{ conjFb[row.id].text }}
          </p>
        </div>
      </div>
    </section>

    <section class="verb-lab-block">
      <h4 style="margin: 0.65rem 0;">🎯 Identifica la forma no personal resaltada</h4>
      <div class="verb-lab-grid">
        <div v-for="item in oraciones" :key="item.id" class="exercise-question-card" style="padding: 0.75rem; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
          <p style="margin: 0 0 0.5rem;" v-html="oracionHtml(item)" />
          <div style="display: flex; gap: 0.35rem; flex-wrap: wrap;">
            <button
              v-for="opt in formaOpts"
              :key="opt"
              type="button"
              class="ex-btn"
              :class="oracionBtnClass(item.id, opt)"
              @click="pickOracion(item, opt)"
            >
              {{ opt }}
            </button>
          </div>
          <p v-if="oracionFb[item.id]" class="match-hint" :class="oracionFb[item.id].ok ? 'feedback-ok' : 'feedback-bad'" style="margin: 0.45rem 0 0;">
            {{ oracionFb[item.id].text }}
          </p>
        </div>
      </div>
    </section>

    <button type="button" class="ex-btn ex-btn-primary" style="margin-top: 0.85rem;" @click="finish">
      📊 Registrar puntuación del taller verbal
    </button>
    <p v-if="summary" class="match-hint" :class="summaryOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.65rem;">
      {{ summary }}
    </p>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import {
  DELE_FRASES,
  ORACIONES_VERBALES,
  VERB_CONJ_ROWS,
} from '@/modules/castellano/tema2Data.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const dele = computed(() => props.exercise?.content?.dele || DELE_FRASES)
const conj = computed(() => props.exercise?.content?.conjRows || VERB_CONJ_ROWS)
const oraciones = computed(() => props.exercise?.content?.oraciones || ORACIONES_VERBALES)
const formaOpts = ['Infinitivo', 'Gerundio', 'Participio']

const deleOk = reactive({})
const deleFb = reactive({})
const conjInf = reactive({})
const conjOk = reactive({})
const conjFb = reactive({})
const oracionOk = reactive({})
const oracionFb = reactive({})
const summary = ref('')
const summaryOk = ref(false)

const totalTasks = computed(() => dele.value.length + conj.value.length + oraciones.value.length)
const solvedCount = computed(() => {
  let n = 0
  dele.value.forEach((d) => { if (deleOk[d.id]) n += 1 })
  conj.value.forEach((c) => { if (conjOk[c.id]) n += 1 })
  oraciones.value.forEach((o) => { if (oracionOk[o.id]) n += 1 })
  return n
})

function resetState() {
  Object.keys(deleOk).forEach((k) => delete deleOk[k])
  Object.keys(deleFb).forEach((k) => delete deleFb[k])
  Object.keys(conjInf).forEach((k) => delete conjInf[k])
  Object.keys(conjOk).forEach((k) => delete conjOk[k])
  Object.keys(conjFb).forEach((k) => delete conjFb[k])
  Object.keys(oracionOk).forEach((k) => delete oracionOk[k])
  Object.keys(oracionFb).forEach((k) => delete oracionFb[k])
  summary.value = ''
}

watch(() => props.exercise?.id, resetState, { immediate: true })

function norm(s) {
  return (s || '').trim().toLowerCase()
}

function pickDele(item, opt) {
  const ok = norm(opt) === norm(item.sol)
  deleOk[item.id] = ok
  deleFb[item.id] = ok
    ? { ok: true, text: `🎉 Perfecto: «${item.sol}». ${item.tip}` }
    : { ok: false, text: `❌ Piensa: ${item.tip}` }
  emit('update:modelValue', { solved: solvedCount.value })
}

function deleBtnClass(id, opt) {
  if (!deleFb[id]) return ''
  if (norm(opt) === norm(dele.value.find((d) => d.id === id)?.sol)) return 'ex-btn-primary'
  return ''
}

function pickConj(row, conjNum) {
  const val = norm(conjInf[row.id])
  if (!val) {
    conjFb[row.id] = { ok: false, text: '⚠️ Escribe primero el infinitivo en la casilla.' }
    return
  }
  const ok = val === norm(row.inf) && conjNum === row.conj
  conjOk[row.id] = ok
  conjFb[row.id] = ok
    ? { ok: true, text: `🎉 Infinitivo «${row.inf}» (${row.conj}ª conjugación).` }
    : { ok: false, text: '❌ Revisa el infinitivo y la conjugación (-ar / -er / -ir).' }
  emit('update:modelValue', { solved: solvedCount.value })
}

function conjBtnClass(id, n) {
  if (!conjFb[id]) return ''
  const row = conj.value.find((r) => r.id === id)
  if (row && conjOk[id] && n === row.conj) return 'ex-btn-primary'
  return ''
}

function oracionHtml(item) {
  const parts = item.sentence.split(item.highlight)
  if (parts.length < 2) return item.sentence
  return `${parts[0]}<strong>${item.highlight}</strong>${parts.slice(1).join(item.highlight)}`
}

function pickOracion(item, opt) {
  const choice = norm(opt)
  const ok = choice === norm(item.sol)
  oracionOk[item.id] = ok
  oracionFb[item.id] = ok
    ? { ok: true, text: `🎉 Es ${item.sol}. ${item.tip}` }
    : { ok: false, text: `❌ ${item.tip}` }
  emit('update:modelValue', { solved: solvedCount.value })
}

function oracionBtnClass(id, opt) {
  if (!oracionFb[id]) return ''
  const item = oraciones.value.find((o) => o.id === id)
  if (item && oracionOk[id] && norm(opt) === norm(item.sol)) return 'ex-btn-primary'
  return ''
}

function finish() {
  const total = totalTasks.value
  const ok = solvedCount.value
  const max = props.exercise?.maxScore || total
  const score = total ? (ok / total) * max : 0
  summaryOk.value = ok >= total * 0.7
  summary.value = summaryOk.value
    ? `Muy bien: ${ok}/${total} aciertos registrados.`
    : `Has acertado ${ok}/${total}. Repasa las pistas en rojo e inténtalo otra vez.`
  emit('complete', {
    solved: ok,
    total,
    _grade: {
      score,
      maxScore: max,
      feedback: `Taller verbal: ${ok}/${total}`,
    },
  })
}
</script>

<style scoped>
.verb-lab-block + .verb-lab-block {
  margin-top: 1.25rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--border-color);
}
.verb-lab-grid {
  display: grid;
  gap: 0.65rem;
}
@media (min-width: 720px) {
  .verb-lab-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
