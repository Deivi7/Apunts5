<template>
  <div class="alpha-lab-card" style="margin: 0; box-shadow: none; border: none; padding: 0;">
    <div class="alpha-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="alpha-tab-btn"
        :class="{ active: activeReto === tab.id }"
        @click="activeReto = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- RETO 1 -->
    <div v-if="activeReto === 1" class="ex-shell" style="margin-top: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <h4 style="margin: 0; font-size: 1.1rem; color: var(--primary);">
          {{ currentGroup.name }} ({{ groupIndex + 1 }} de {{ groups.length }})
        </h4>
        <span class="match-hint">Pulsa las palabras en orden (1, 2, 3, 4)</span>
      </div>

      <div>
        <div class="ex-prompt" style="margin-bottom: 0.45rem;">PALABRAS PARA ORDENAR:</div>
        <div class="alpha-items-grid">
          <button
            v-for="w in currentGroup.words"
            :key="w"
            type="button"
            class="alpha-item-chip"
            :class="{ selected: order1.includes(w) }"
            :disabled="order1.includes(w)"
            @click="pick1(w)"
          >
            {{ w }}
          </button>
        </div>
      </div>

      <div>
        <div class="ex-prompt" style="margin-bottom: 0.45rem;">TU ORDEN SELECCIONADO:</div>
        <div class="alpha-slots-grid">
          <div
            v-for="i in 4"
            :key="i"
            class="alpha-slot"
            :class="{ filled: !!order1[i - 1], correct: slotState1[i - 1] === 'ok', incorrect: slotState1[i - 1] === 'bad' }"
          >
            <span>#{{ i }}</span>
            <strong>{{ order1[i - 1] || '— Vacío —' }}</strong>
          </div>
        </div>
      </div>

      <div class="flash-actions">
        <button type="button" class="ex-btn ex-btn-primary" :disabled="order1.length < 4" @click="check1">
          ✅ Comprobar Grupo
        </button>
        <button type="button" class="ex-btn" @click="reset1">🔄 Reiniciar Grupo</button>
      </div>
      <p v-if="feedback1" class="feedback-msg" :class="feedback1Ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback1 }}</p>
    </div>

    <!-- RETO 2 -->
    <div v-else-if="activeReto === 2" class="ex-shell" style="margin-top: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <h4 style="margin: 0; font-size: 1.1rem; color: var(--primary);">Las 10 Palabras de la Ficha (Ejercicio 3 del PDF)</h4>
        <span class="match-hint">Selecciona del 1 al {{ words2.length }} en orden</span>
      </div>

      <div class="alpha-items-grid">
        <button
          v-for="w in words2"
          :key="w"
          type="button"
          class="alpha-item-chip"
          :class="{ selected: order2.includes(w) }"
          :disabled="order2.includes(w)"
          @click="pick2(w)"
        >
          {{ w }}
        </button>
      </div>

      <div>
        <div class="ex-prompt" style="margin-bottom: 0.45rem;">TU SECUENCIA (1 al {{ words2.length }}):</div>
        <div class="alpha-slots-grid" style="grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));">
          <div
            v-for="i in words2.length"
            :key="i"
            class="alpha-slot"
            :class="{ filled: !!order2[i - 1], correct: slotState2[i - 1] === 'ok', incorrect: slotState2[i - 1] === 'bad' }"
          >
            <span>{{ i }}.</span>
            <strong>{{ order2[i - 1] || '...' }}</strong>
          </div>
        </div>
      </div>

      <div class="flash-actions">
        <button type="button" class="ex-btn ex-btn-primary" :disabled="order2.length < words2.length" @click="check2">
          ✅ Comprobar las {{ words2.length }} Palabras
        </button>
        <button type="button" class="ex-btn" @click="reset2">🔄 Reiniciar</button>
      </div>
      <p v-if="feedback2" class="feedback-msg" :class="feedback2Ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback2 }}</p>
    </div>

    <!-- RETO 3 -->
    <div v-else class="ex-shell" style="margin-top: 1rem;">
      <div>
        <h4 style="margin: 0 0 0.35rem; font-size: 1.1rem; color: var(--primary);">El Gran Reto: Las 24 Palabras de la Ficha Escolar</h4>
        <p class="match-hint">
          Ordena mentalmente o en tu cuaderno y pulsa «Revelar solución» para verificar del 1 al 24.
          También puedes ordenarlas aquí arrastrando.
        </p>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem;">
        <div class="ex-block">
          <div class="ex-prompt">PALABRAS ORIGINALES DEL PDF:</div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.45rem;">
            <span v-for="w in words3" :key="w" class="badge-pill">{{ w }}</span>
          </div>
        </div>
        <div class="ex-block">
          <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <div class="ex-prompt" style="margin: 0; color: var(--primary);">ORDEN ALFABÉTICO (1–24)</div>
            <button type="button" class="ex-btn" @click="showSolution3 = !showSolution3">
              👁️ {{ showSolution3 ? 'Ocultar' : 'Revelar' }}
            </button>
          </div>
          <ol v-if="showSolution3" style="margin: 0 0 0 1.25rem; line-height: 1.55; font-size: 0.92rem;">
            <li v-for="w in correct3" :key="w"><strong>{{ w }}</strong></li>
          </ol>
          <p v-else class="match-hint">Solución oculta. ¡Intenta ordenarlas antes!</p>
        </div>
      </div>

      <div class="dnd-list">
        <div
          v-for="(word, idx) in order3"
          :key="word + '-' + idx"
          class="dnd-row"
          :class="{ dragging: dragIndex === idx, 'drag-over': overIndex === idx && dragIndex !== idx }"
          draggable="true"
          @dragstart="onDragStart(idx, $event)"
          @dragover.prevent="overIndex = idx"
          @dragleave="overIndex = overIndex === idx ? -1 : overIndex"
          @drop.prevent="onDrop(idx)"
          @dragend="onDragEnd"
        >
          <span class="dnd-handle">⠿</span>
          <span class="dnd-index">{{ idx + 1 }}</span>
          <span class="dnd-label">{{ word }}</span>
        </div>
      </div>
      <div class="flash-actions">
        <button type="button" class="ex-btn ex-btn-primary" @click="check3">✅ Comprobar las 24 Palabras</button>
        <button type="button" class="ex-btn" @click="shuffle3">🔄 Mezclar de nuevo</button>
      </div>
      <p v-if="feedback3" class="feedback-msg" :class="feedback3Ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback3 }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const tabs = [
  { id: 1, label: 'Reto 1: Grupos de 4 Palabras' },
  { id: 2, label: 'Reto 2: Las 10 Palabras del PDF' },
  { id: 3, label: 'Reto 3: El Gran Reto de las 24 Palabras' },
]

const content = computed(() => props.exercise?.content || {})

const groups = computed(() => content.value.groups || [])
const words2 = computed(() => content.value.words10 || [])
const correct2 = computed(() => content.value.correct10 || [])
const words3 = computed(() => content.value.words24 || [])
const correct3 = computed(() => content.value.correct24 || [])

const activeReto = ref(1)
const groupIndex = ref(0)
const order1 = ref([])
const slotState1 = ref([])
const feedback1 = ref('')
const feedback1Ok = ref(false)

const order2 = ref([])
const slotState2 = ref([])
const feedback2 = ref('')
const feedback2Ok = ref(false)

const order3 = ref([])
const showSolution3 = ref(false)
const feedback3 = ref('')
const feedback3Ok = ref(false)
const dragIndex = ref(-1)
const overIndex = ref(-1)

const currentGroup = computed(() => groups.value[groupIndex.value] || { name: '', words: [], correctOrder: [] })

const completed = ref({ g1: 0, g2: false, g3: false })

watch(
  () => props.exercise?.id,
  () => {
    activeReto.value = 1
    groupIndex.value = 0
    reset1()
    reset2()
    shuffle3()
    showSolution3.value = false
    completed.value = { g1: 0, g2: false, g3: false }
  },
  { immediate: true },
)

function sync() {
  emit('update:modelValue', {
    reto: activeReto.value,
    order1: [...order1.value],
    order2: [...order2.value],
    order3: [...order3.value],
    completed: { ...completed.value },
  })
}

function pick1(word) {
  if (order1.value.length >= 4 || order1.value.includes(word)) return
  order1.value = [...order1.value, word]
  slotState1.value = []
  feedback1.value = ''
  sync()
}

function reset1() {
  order1.value = []
  slotState1.value = []
  feedback1.value = ''
  sync()
}

function check1() {
  const expected = currentGroup.value.correctOrder || []
  const ok = order1.value.length === expected.length && order1.value.every((w, i) => w === expected[i])
  slotState1.value = order1.value.map((w, i) => (w === expected[i] ? 'ok' : 'bad'))
  feedback1Ok.value = ok
  if (ok) {
    feedback1.value = '¡Grupo superado! Orden perfecto (+XP).'
    completed.value.g1 = Math.min(groups.value.length, completed.value.g1 + 1)
    sync()
    setTimeout(() => {
      groupIndex.value = (groupIndex.value + 1) % Math.max(groups.value.length, 1)
      reset1()
      maybeComplete()
    }, 900)
  } else {
    feedback1.value = `El orden correcto era: ${expected.join(' → ')}. ¡Inténtalo de nuevo!`
    sync()
  }
}

function pick2(word) {
  if (order2.value.length >= words2.value.length || order2.value.includes(word)) return
  order2.value = [...order2.value, word]
  slotState2.value = []
  feedback2.value = ''
  sync()
}

function reset2() {
  order2.value = []
  slotState2.value = []
  feedback2.value = ''
  sync()
}

function check2() {
  const expected = correct2.value
  const ok = order2.value.length === expected.length && order2.value.every((w, i) => w === expected[i])
  slotState2.value = order2.value.map((w, i) => (w === expected[i] ? 'ok' : 'bad'))
  feedback2Ok.value = ok
  if (ok) {
    feedback2.value = '¡IMPRESIONANTE! Has ordenado las 10 palabras del PDF a la perfección.'
    completed.value.g2 = true
    sync()
    maybeComplete()
  } else {
    feedback2.value = 'Hay algún error. Revisa letras iniciales (Bien, Conquistar, Cosechar, Doble…).'
    sync()
  }
}

function shuffle3() {
  order3.value = [...words3.value].sort(() => Math.random() - 0.5)
  feedback3.value = ''
  slotState2.value = []
  sync()
}

function onDragStart(idx, event) {
  dragIndex.value = idx
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', String(idx))
}
function onDrop(idx) {
  const from = dragIndex.value
  if (from < 0 || from === idx) return
  const copy = [...order3.value]
  const [item] = copy.splice(from, 1)
  copy.splice(idx, 0, item)
  order3.value = copy
  onDragEnd()
  sync()
}
function onDragEnd() {
  dragIndex.value = -1
  overIndex.value = -1
}

function check3() {
  const expected = correct3.value
  const ok = order3.value.length === expected.length && order3.value.every((w, i) => w === expected[i])
  feedback3Ok.value = ok
  if (ok) {
    feedback3.value = '¡Gran Reto superado! Las 24 palabras están en orden RAE.'
    completed.value.g3 = true
    showSolution3.value = true
    sync()
    maybeComplete()
  } else {
    feedback3.value = 'Aún no está perfecto. Puedes revelar la solución o seguir arrastrando.'
    sync()
  }
}

function maybeComplete() {
  const max = props.exercise?.maxScore || 30
  const score =
    Math.round((completed.value.g1 / Math.max(groups.value.length, 1)) * (max * 0.4))
    + (completed.value.g2 ? max * 0.3 : 0)
    + (completed.value.g3 ? max * 0.3 : 0)
  if (completed.value.g1 >= groups.value.length && completed.value.g2 && completed.value.g3) {
    emit('complete', {
      completed: { ...completed.value },
      _grade: { score: max, maxScore: max, feedback: 'Laboratorio de orden alfabético completado (3 retos)' },
    })
  } else if (score > 0) {
    emit('update:modelValue', {
      reto: activeReto.value,
      order1: [...order1.value],
      order2: [...order2.value],
      order3: [...order3.value],
      completed: { ...completed.value },
      partialScore: score,
    })
  }
}
</script>
