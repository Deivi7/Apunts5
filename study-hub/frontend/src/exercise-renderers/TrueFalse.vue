<template>
  <div class="ex-shell" :class="{ 'is-graded': !!gradeResult }">
    <div
      v-for="(item, idx) in items"
      :key="item.id || idx"
      class="ex-block"
      :class="blockClass(item, idx)"
    >
      <p class="ex-prompt">
        <span v-if="gradeResult" class="ex-result-mark" aria-hidden="true">
          {{ detailFor(item, idx)?.ok ? '✅' : '❌' }}
        </span>
        {{ idx + 1 }}. {{ item.prompt }}
      </p>
      <div class="tf-row">
        <button
          type="button"
          class="tf-btn is-true"
          :class="btnClass(item, idx, true)"
          :disabled="!!gradeResult"
          @click="set(item.id || idx, true)"
        >
          Verdadero
        </button>
        <button
          type="button"
          class="tf-btn is-false"
          :class="btnClass(item, idx, false)"
          :disabled="!!gradeResult"
          @click="set(item.id || idx, false)"
        >
          Falso
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  exercise: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
  gradeResult: { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue'])
const items = computed(() => props.exercise.content?.items || [])
const model = computed(() => props.modelValue || {})

const detailMap = computed(() => {
  const map = new Map()
  for (const d of props.gradeResult?.details || []) {
    map.set(String(d.id), d)
  }
  return map
})

function detailFor(item, idx) {
  return detailMap.value.get(String(item.id ?? idx)) || null
}

function blockClass(item, idx) {
  const d = detailFor(item, idx)
  if (!d) return {}
  return { 'is-q-ok': d.ok, 'is-q-bad': !d.ok }
}

function btnClass(item, idx, value) {
  const id = item.id ?? idx
  const selected = model.value[id] === value
  const d = detailFor(item, idx)
  if (!d) return { 'is-selected': selected }
  const isCorrectOpt = Boolean(d.correct) === value
  const isWrongPick = selected && !d.ok
  return {
    'is-selected': selected,
    'is-correct': isCorrectOpt,
    'is-wrong': isWrongPick,
  }
}

function set(id, value) {
  if (props.gradeResult) return
  emit('update:modelValue', { ...model.value, [id]: value })
}
</script>
