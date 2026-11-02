<template>
  <div class="ex-shell">
    <p class="match-hint">Arrastra las palabras para ordenarlas alfabéticamente (RAE).</p>
    <div class="dnd-list">
      <div
        v-for="(word, idx) in words"
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
        <span class="dnd-handle" aria-hidden="true">⠿</span>
        <span class="dnd-index">{{ idx + 1 }}</span>
        <span class="dnd-label">{{ word }}</span>
        <button type="button" class="ex-btn" style="padding: 0.25rem 0.45rem;" :disabled="idx === 0" @click.stop="move(idx, -1)">↑</button>
        <button type="button" class="ex-btn" style="padding: 0.25rem 0.45rem;" :disabled="idx === words.length - 1" @click.stop="move(idx, 1)">↓</button>
      </div>
    </div>
    <button type="button" class="ex-btn ex-btn-primary" style="width: fit-content;" @click="check">
      Comprobar orden RAE
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const words = ref([])
const dragIndex = ref(-1)
const overIndex = ref(-1)

watch(
  () => props.exercise?.id,
  () => {
    const base = props.exercise?.content?.words || []
    words.value = [...base].sort(() => Math.random() - 0.5)
    emit('update:modelValue', { order: [...words.value] })
  },
  { immediate: true },
)

function commit(next) {
  words.value = next
  emit('update:modelValue', { order: [...next] })
}

function move(idx, dir) {
  const next = idx + dir
  if (next < 0 || next >= words.value.length) return
  const copy = [...words.value]
  ;[copy[idx], copy[next]] = [copy[next], copy[idx]]
  commit(copy)
}

function onDragStart(idx, event) {
  dragIndex.value = idx
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', String(idx))
}

function onDrop(idx) {
  const from = dragIndex.value
  if (from < 0 || from === idx) return
  const copy = [...words.value]
  const [item] = copy.splice(from, 1)
  copy.splice(idx, 0, item)
  commit(copy)
  onDragEnd()
}

function onDragEnd() {
  dragIndex.value = -1
  overIndex.value = -1
}

function check() {
  const expected = [...(props.exercise?.content?.words || [])].sort((a, b) =>
    a.localeCompare(b, 'es', { sensitivity: 'base' }),
  )
  const ok = words.value.every((w, i) => w === expected[i])
  emit('complete', {
    order: [...words.value],
    _grade: {
      score: ok ? props.exercise?.maxScore || 10 : 0,
      maxScore: props.exercise?.maxScore || 10,
      feedback: ok ? '¡Orden alfabético correcto!' : 'Aún no está en orden RAE',
    },
  })
}
</script>
