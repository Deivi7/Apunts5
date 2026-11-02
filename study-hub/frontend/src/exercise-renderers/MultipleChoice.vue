<template>
  <div class="ex-shell" :class="{ 'is-graded': !!gradeResult }">
    <div
      v-for="(q, qi) in questions"
      :key="q.id || qi"
      class="ex-block"
      :class="blockClass(q, qi)"
    >
      <p class="ex-prompt">
        <span v-if="gradeResult" class="ex-result-mark" aria-hidden="true">
          {{ detailFor(q, qi)?.ok ? '✅' : '❌' }}
        </span>
        {{ qi + 1 }}. {{ q.prompt }}
      </p>
      <div class="choice-row">
        <label
          v-for="(opt, oi) in q.options"
          :key="oi"
          class="choice-option"
          :class="optionClass(q, opt, qi)"
        >
          <input
            type="radio"
            :name="`q-${exercise.id}-${q.id || qi}`"
            :value="optValue(opt)"
            :checked="isSelected(q, opt, qi)"
            :disabled="!!gradeResult"
            @change="setAnswer(qId(q, qi), optValue(opt))"
          />
          <span>{{ optLabel(opt) }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const props = defineProps({
  exercise: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
  gradeResult: { type: Object, default: null },
})
const emit = defineEmits(['update:modelValue', 'submit'])

const questions = ref([])

watch(
  () => props.exercise?.id,
  () => {
    const raw = props.exercise.content?.questions || []
    let list = props.exercise.config?.shuffle ? shuffle(raw) : [...raw]
    if (props.exercise.config?.shuffleOptions) {
      list = list.map((q) => ({
        ...q,
        options: shuffle([...(q.options || [])]),
      }))
    }
    questions.value = list
  },
  { immediate: true },
)

const model = computed(() => props.modelValue || {})
const detailMap = computed(() => {
  const map = new Map()
  for (const d of props.gradeResult?.details || []) {
    map.set(String(d.id), d)
  }
  return map
})

function optValue(opt) {
  return typeof opt === 'object' ? opt.value : opt
}
function optLabel(opt) {
  return typeof opt === 'object' ? opt.label : opt
}
function qId(q, qi) {
  return q.id ?? qi
}
function detailFor(q, qi) {
  return detailMap.value.get(String(qId(q, qi))) || null
}
function isSelected(q, opt, qi = 0) {
  return model.value[qId(q, qi)] === optValue(opt)
}
function setAnswer(id, value) {
  emit('update:modelValue', { ...model.value, [id]: value })
}
function blockClass(q, qi) {
  const d = detailFor(q, qi)
  if (!d) return {}
  return { 'is-q-ok': d.ok, 'is-q-bad': !d.ok }
}
function optionClass(q, opt, qi) {
  const selected = isSelected(q, opt, qi)
  const d = detailFor(q, qi)
  if (!d) return { 'is-selected': selected }
  const val = optValue(opt)
  const isCorrectOpt = val === d.correct
  const isWrongPick = selected && !d.ok
  return {
    'is-selected': selected,
    'is-correct': isCorrectOpt,
    'is-wrong': isWrongPick,
  }
}
</script>
