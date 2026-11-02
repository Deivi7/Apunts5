<template>
  <div class="ex-shell">
    <p class="match-hint">Arrastra cada etiqueta de la derecha (o del banco) hasta su pareja.</p>

    <div class="match-grid">
      <div v-for="pair in pairs" :key="pair.left" class="match-row">
        <div class="match-left">{{ pair.left }}</div>
        <div
          class="match-drop"
          :class="{ 'drag-over': overLeft === pair.left, filled: !!model[pair.left] }"
          @dragover.prevent="overLeft = pair.left"
          @dragleave="overLeft = overLeft === pair.left ? '' : overLeft"
          @drop.prevent="dropOn(pair.left)"
        >
          <button
            v-if="model[pair.left]"
            type="button"
            class="match-chip in-slot"
            draggable="true"
            @dragstart="startDrag(model[pair.left], pair.left, $event)"
            @click="clear(pair.left)"
          >
            <span>{{ model[pair.left] }}</span>
            <span aria-hidden="true">✕</span>
          </button>
          <span v-else class="match-hint" style="padding-left: 0.5rem;">Suelta aquí</span>
        </div>
      </div>
    </div>

    <div
      class="match-pool"
      @dragover.prevent
      @drop.prevent="dropOnPool"
    >
      <span class="match-hint" style="width: 100%;">Banco de respuestas</span>
      <button
        v-for="right in availableRights"
        :key="right"
        type="button"
        class="match-chip"
        :class="{ dragging: dragging === right }"
        draggable="true"
        @dragstart="startDrag(right, null, $event)"
        @dragend="dragging = ''"
      >
        {{ right }}
      </button>
      <span v-if="!availableRights.length" class="match-hint">Todas las etiquetas están colocadas.</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['update:modelValue'])

const pairs = computed(() => props.exercise.content?.pairs || [])
const model = computed(() => props.modelValue || {})
const rights = computed(() => {
  const list = pairs.value.map((p) => p.right)
  // shuffle estable por ejercicio
  return [...list].sort((a, b) => String(a).localeCompare(String(b)))
})

const used = computed(() => new Set(Object.values(model.value).filter(Boolean)))
const availableRights = computed(() => rights.value.filter((r) => !used.value.has(r)))

const dragging = ref('')
const fromLeft = ref('')
const overLeft = ref('')

function startDrag(right, leftKey, event) {
  dragging.value = right
  fromLeft.value = leftKey || ''
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', right)
}

function dropOn(leftKey) {
  const value = dragging.value
  if (!value) return
  const next = { ...model.value }
  // Liberar si venía de otro hueco
  if (fromLeft.value && next[fromLeft.value] === value) {
    delete next[fromLeft.value]
  }
  // Si el destino tenía algo, vuelve al banco automáticamente
  next[leftKey] = value
  emit('update:modelValue', next)
  dragging.value = ''
  fromLeft.value = ''
  overLeft.value = ''
}

function dropOnPool() {
  if (!dragging.value || !fromLeft.value) {
    dragging.value = ''
    fromLeft.value = ''
    return
  }
  const next = { ...model.value }
  if (next[fromLeft.value] === dragging.value) delete next[fromLeft.value]
  emit('update:modelValue', next)
  dragging.value = ''
  fromLeft.value = ''
}

function clear(leftKey) {
  const next = { ...model.value }
  delete next[leftKey]
  emit('update:modelValue', next)
}
</script>
