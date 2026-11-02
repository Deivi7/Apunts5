<template>
  <div class="ex-shell fill-blank-lab">
    <p class="match-hint" style="margin-top: 0;">
      Puedes pulsar <strong>Comprobar</strong> en cualquier momento. Los huecos vacíos cuentan como incorrectos.
    </p>
    <label
      v-for="(blank, idx) in blanks"
      :key="blank.id || idx"
      class="ex-block fill-blank-row"
      :class="rowClass(blank.id || idx)"
      style="display: grid; gap: 0.45rem;"
    >
      <span class="ex-prompt" style="margin: 0; display: flex; justify-content: space-between; gap: 0.5rem; align-items: baseline;">
        <span>{{ idx + 1 }}. {{ blank.prompt }}</span>
        <span v-if="statusOf(blank.id || idx)" class="fill-status" :data-ok="statusOf(blank.id || idx).ok">
          {{ statusOf(blank.id || idx).label }}
        </span>
      </span>
      <input
        class="input-hub"
        :class="{ 'is-ok': statusOf(blank.id || idx)?.ok === true, 'is-bad': statusOf(blank.id || idx)?.ok === false }"
        :value="model[blank.id || idx] || ''"
        :placeholder="blank.placeholder || 'Escribe aquí…'"
        autocomplete="off"
        @input="set(blank.id || idx, $event.target.value)"
      >
    </label>
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
const blanks = computed(() => props.exercise.content?.blanks || [])
const model = computed(() => props.modelValue || {})
const details = computed(() => props.gradeResult?.details?.blanks || {})

function set(id, value) {
  emit('update:modelValue', { ...model.value, [id]: value })
}

function statusOf(id) {
  return details.value[id] || null
}

function rowClass(id) {
  const s = statusOf(id)
  if (!s) return ''
  return s.ok ? 'row-ok' : 'row-bad'
}
</script>

<style scoped>
.fill-blank-row.row-ok .input-hub,
.input-hub.is-ok {
  border-color: var(--accent-green, #10b981);
  background: color-mix(in srgb, var(--accent-green, #10b981) 8%, var(--bg-card));
}
.fill-blank-row.row-bad .input-hub,
.input-hub.is-bad {
  border-color: var(--accent-red, #ef4444);
  background: color-mix(in srgb, var(--accent-red, #ef4444) 8%, var(--bg-card));
}
.fill-status {
  font-size: 0.72rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.fill-status[data-ok='true'] { color: var(--accent-green, #059669); }
.fill-status[data-ok='false'] { color: var(--accent-red, #dc2626); }
</style>
