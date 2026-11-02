<template>
  <div class="ex-shell">
    <p class="match-hint">Arrastra las filas para ordenarlas (también puedes usar ↑ ↓).</p>
    <div class="dnd-list">
      <div
        v-for="(item, idx) in order"
        :key="item + '-' + idx"
        class="dnd-row"
        :class="{ dragging: dragIndex === idx, 'drag-over': overIndex === idx && dragIndex !== idx }"
        draggable="true"
        @dragstart="onDragStart(idx, $event)"
        @dragover.prevent="onDragOver(idx)"
        @dragleave="onDragLeave(idx)"
        @drop.prevent="onDrop(idx)"
        @dragend="onDragEnd"
      >
        <span class="dnd-handle" aria-hidden="true">⠿</span>
        <span class="dnd-index">{{ idx + 1 }}</span>
        <span class="dnd-label">{{ item }}</span>
        <button type="button" class="ex-btn" style="padding: 0.25rem 0.45rem;" :disabled="idx === 0" @click.stop="move(idx, -1)">↑</button>
        <button type="button" class="ex-btn" style="padding: 0.25rem 0.45rem;" :disabled="idx === order.length - 1" @click.stop="move(idx, 1)">↓</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['update:modelValue'])

const order = ref([])
const dragIndex = ref(-1)
const overIndex = ref(-1)

watch(
  () => props.exercise.id,
  () => {
    const base = props.exercise.content?.items || props.exercise.content?.order || []
    order.value = [...base].sort(() => Math.random() - 0.5)
    emit('update:modelValue', { order: [...order.value] })
    dragIndex.value = -1
    overIndex.value = -1
  },
  { immediate: true },
)

function commit(next) {
  order.value = next
  emit('update:modelValue', { order: [...next] })
}

function move(idx, dir) {
  const next = idx + dir
  if (next < 0 || next >= order.value.length) return
  const copy = [...order.value]
  ;[copy[idx], copy[next]] = [copy[next], copy[idx]]
  commit(copy)
}

function onDragStart(idx, event) {
  dragIndex.value = idx
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', String(idx))
}

function onDragOver(idx) {
  overIndex.value = idx
}

function onDragLeave(idx) {
  if (overIndex.value === idx) overIndex.value = -1
}

function onDrop(idx) {
  const from = dragIndex.value
  if (from < 0 || from === idx) return
  const copy = [...order.value]
  const [item] = copy.splice(from, 1)
  copy.splice(idx, 0, item)
  commit(copy)
  dragIndex.value = -1
  overIndex.value = -1
}

function onDragEnd() {
  dragIndex.value = -1
  overIndex.value = -1
}
</script>
