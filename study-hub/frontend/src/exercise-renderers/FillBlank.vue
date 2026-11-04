<template>
  <div class="ex-shell fill-blank-lab" :class="[`cols-${columns}`, { compact }]">
    <p v-if="showHint" class="match-hint fill-blank-hint">
      {{ hintText }}
    </p>
    <div class="fill-blank-grid" :style="gridStyle">
      <label
        v-for="(blank, idx) in blanks"
        :key="blank.id || idx"
        class="ex-block fill-blank-row"
        :class="rowClass(blank.id || idx)"
      >
        <span class="ex-prompt fill-blank-prompt">
          <span class="fill-blank-num">{{ idx + 1 }}.</span>
          <span class="fill-blank-q">{{ blank.prompt }}</span>
          <span
            v-if="statusOf(blank.id || idx)"
            class="fill-status"
            :data-ok="statusOf(blank.id || idx).ok"
          >
            {{ statusOf(blank.id || idx).label }}
          </span>
        </span>
        <input
          class="input-hub fill-blank-input"
          :class="{
            'is-ok': statusOf(blank.id || idx)?.ok === true,
            'is-bad': statusOf(blank.id || idx)?.ok === false,
          }"
          :value="model[blank.id || idx] || ''"
          :placeholder="blank.placeholder || '…'"
          autocomplete="off"
          @input="set(blank.id || idx, $event.target.value)"
        >
      </label>
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

const blanks = computed(() => props.exercise.content?.blanks || [])
const model = computed(() => props.modelValue || {})
const details = computed(() => props.gradeResult?.details?.blanks || {})

/** 1–4 columnas (content.columns | config.columns). */
const columns = computed(() => {
  const raw = props.exercise.content?.columns ?? props.exercise.config?.columns ?? 1
  const n = Number(raw)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(4, Math.floor(n))
})

const compact = computed(() => {
  if (props.exercise.content?.compact != null) return !!props.exercise.content.compact
  if (props.exercise.config?.compact != null) return !!props.exercise.config.compact
  return columns.value > 1 || blanks.value.length >= 6
})

const showHint = computed(() => {
  if (props.exercise.content?.hideHint) return false
  if (props.exercise.config?.hideHint) return false
  return !compact.value
})

const hintText = computed(() => {
  return (
    props.exercise.content?.hint
    || props.exercise.config?.hint
    || 'Pulsa Comprobar cuando quieras. Los huecos vacíos cuentan como incorrectos.'
  )
})

const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${columns.value}, minmax(0, 1fr))`,
}))

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
.fill-blank-hint {
  margin-top: 0;
  margin-bottom: 0.75rem;
}

.fill-blank-grid {
  display: grid;
  gap: 0.65rem 0.85rem;
  align-items: start;
}

.fill-blank-row {
  display: grid;
  gap: 0.35rem;
  margin: 0;
  min-width: 0;
}

.fill-blank-prompt {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.35rem 0.45rem;
  font-size: 0.9rem;
  line-height: 1.35;
}

.fill-blank-num {
  font-weight: 800;
  color: var(--text-muted);
  flex-shrink: 0;
}

.fill-blank-q {
  flex: 1 1 auto;
  min-width: 0;
}

.fill-blank-input {
  width: 100%;
  min-width: 0;
}

.compact .fill-blank-prompt {
  font-size: 0.84rem;
}

.compact .fill-blank-input {
  padding: 0.4rem 0.55rem;
  font-size: 0.92rem;
}

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
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-left: auto;
}
.fill-status[data-ok='true'] { color: var(--accent-green, #059669); }
.fill-status[data-ok='false'] { color: var(--accent-red, #dc2626); }

@media (max-width: 720px) {
  .cols-3 .fill-blank-grid,
  .cols-4 .fill-blank-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
  }
}

@media (max-width: 480px) {
  .fill-blank-grid {
    grid-template-columns: 1fr !important;
  }
}
</style>
