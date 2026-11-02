<template>
  <div>
    <div class="flash-actions" style="margin-bottom: 1rem;">
      <button type="button" class="ex-btn" @click="showTable = !showTable">
        {{ showTable ? 'Ocultar las 25 Abreviaturas' : 'Ver las 25 Abreviaturas' }}
      </button>
    </div>

    <div v-if="showTable" style="margin-bottom: 1.5rem;">
      <input
        v-model="filter"
        type="search"
        class="input-hub"
        placeholder="Filtrar abreviatura o significado…"
        style="margin-bottom: 0.75rem;"
      >
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.65rem;">
        <div
          v-for="item in filtered"
          :key="item.abbr"
          style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 0.75rem 0.85rem; border-left: 4px solid var(--accent-purple);"
        >
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.25rem;">
            <span style="font-family: monospace; font-size: 1.15rem; font-weight: 900; color: var(--accent-purple);">{{ item.abbr }}</span>
            <span style="font-size: 0.7rem; font-weight: 700; color: var(--text-muted);">ABREV.</span>
          </div>
          <div style="font-weight: 700; font-size: 0.85rem;">{{ item.meaning }}</div>
          <div style="font-size: 0.75rem; color: var(--text-muted); font-style: italic; margin-top: 0.35rem;">{{ item.example }}</div>
        </div>
      </div>
    </div>

    <div class="alpha-lab-card" style="margin: 0;">
      <div style="font-size: 0.8rem; font-weight: 800; color: var(--primary); letter-spacing: 0.04em;">
        DESAFÍO EN VIVO: ¿QUÉ SIGNIFICA ESTA ABREVIATURA?
      </div>
      <div style="font-size: 2.4rem; font-weight: 900; margin: 0.5rem 0; font-family: monospace;">{{ current.abbr }}</div>
      <p style="color: var(--text-muted); margin-bottom: 1rem;">¿Qué significa «{{ current.abbr }}» en un artículo del diccionario?</p>
      <div style="display: grid; gap: 0.55rem;">
        <button
          v-for="opt in options"
          :key="opt"
          type="button"
          class="quiz-option-btn"
          :class="{ correct: answered && opt === current.meaning, incorrect: answered && chosen === opt && opt !== current.meaning }"
          :disabled="answered"
          @click="check(opt)"
        >
          {{ opt }}
        </button>
      </div>
      <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.85rem;">{{ feedback }}</p>
      <p class="match-hint" style="margin-top: 0.75rem;">Aciertos: {{ hits }} · Avance {{ poolIndex + 1 }}/{{ pool.length }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ABBREVIATIONS_XTEC, shuffle } from '@/modules/castellano/comunicacionData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const list = ABBREVIATIONS_XTEC
const showTable = ref(false)
const filter = ref('')
const pool = ref([])
const poolIndex = ref(0)
const options = ref([])
const answered = ref(false)
const chosen = ref('')
const feedback = ref('')
const ok = ref(false)
const hits = ref(0)

const filtered = computed(() => {
  const q = filter.value.trim().toLowerCase()
  if (!q) return list
  return list.filter((i) =>
    i.abbr.toLowerCase().includes(q)
    || i.meaning.toLowerCase().includes(q)
    || i.example.toLowerCase().includes(q),
  )
})

const current = computed(() => pool.value[poolIndex.value] || list[0])

function deal() {
  answered.value = false
  chosen.value = ''
  feedback.value = ''
  const cur = current.value
  const distractors = shuffle(list.filter((a) => a.meaning !== cur.meaning)).slice(0, 2).map((a) => a.meaning)
  options.value = shuffle([cur.meaning, ...distractors])
}

function resetPool() {
  pool.value = shuffle(list)
  poolIndex.value = 0
  hits.value = 0
  deal()
}

watch(() => props.exercise?.id, resetPool, { immediate: true })

function check(opt) {
  if (answered.value) return
  answered.value = true
  chosen.value = opt
  ok.value = opt === current.value.meaning
  if (ok.value) {
    hits.value += 1
    feedback.value = `¡Excelente! «${opt}» es correcto. Ejemplo: ${current.value.example}`
  } else {
    feedback.value = `Correcto: «${current.value.meaning}». Ejemplo: ${current.value.example}`
  }
  emit('update:modelValue', { hits: hits.value, index: poolIndex.value })
  setTimeout(() => {
    poolIndex.value += 1
    if (poolIndex.value >= pool.value.length) {
      const max = props.exercise?.maxScore || 25
      emit('complete', {
        hits: hits.value,
        _grade: { score: Math.min(hits.value, max), maxScore: max, feedback: `Abreviaturas: ${hits.value}/25` },
      })
      pool.value = shuffle(list)
      poolIndex.value = 0
    }
    deal()
  }, ok.value ? 1600 : 2200)
}
</script>
