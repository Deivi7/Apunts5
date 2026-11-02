<template>
  <div>
    <p v-if="hint" class="match-hint">{{ hint }}</p>
    <div class="syllable-split-card-grid">
      <div v-for="(item, idx) in items" :key="item.word + idx" class="split-card-item">
        <div class="split-item-header">
          <span>{{ idx + 1 }}. {{ item.word }}</span>
        </div>
        <div class="split-input-row">
          <input
            v-model="splits[idx]"
            type="text"
            class="split-text-input"
            :class="fieldClass(idx, 'split')"
            placeholder="síl-la-bes..."
          >
          <input
            v-if="withTonic"
            v-model="tonics[idx]"
            type="text"
            class="tonic-select-input"
            :class="fieldClass(idx, 'tonic')"
            placeholder="Tònica"
            style="width: 80px;"
          >
        </div>
      </div>
    </div>
    <button type="button" class="ex-btn ex-btn-primary" style="margin-top: 0.75rem;" @click="check">
      Comprovar
    </button>
    <p v-if="feedback" class="match-hint" :class="feedbackOk ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.65rem;">
      {{ feedback }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { cleanString } from '@/modules/catala/posat_a_prova_1Data.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const items = computed(() => props.exercise?.content?.items || [])
const withTonic = computed(() => props.exercise?.content?.withTonic !== false && items.value.some((i) => i.tonic))
const hint = computed(() => props.exercise?.instructions || '')
const splits = ref([])
const tonics = ref([])
const checked = ref(false)
const fieldState = ref({})
const feedback = ref('')
const feedbackOk = ref(false)

watch(
  () => props.exercise?.id,
  () => reset(),
  { immediate: true },
)

function reset() {
  splits.value = items.value.map(() => '')
  tonics.value = items.value.map(() => '')
  checked.value = false
  fieldState.value = {}
  feedback.value = ''
}

function fieldClass(idx, kind) {
  if (!checked.value) return ''
  const st = fieldState.value[`${idx}-${kind}`]
  return st === true ? 'is-correct' : st === false ? 'is-wrong' : ''
}

function check() {
  checked.value = true
  let ok = 0
  const total = items.value.length * (withTonic.value ? 2 : 1)
  items.value.forEach((item, idx) => {
    const splitOk = cleanString(splits.value[idx]) === cleanString(item.correctSplit || item.split)
    fieldState.value[`${idx}-split`] = splitOk
    if (splitOk) ok += 1
    if (withTonic.value) {
      const tonicOk = cleanString(tonics.value[idx]) === cleanString(item.tonic)
      fieldState.value[`${idx}-tonic`] = tonicOk
      if (tonicOk) ok += 1
    }
  })
  const max = props.exercise?.maxScore || items.value.length
  feedbackOk.value = ok === total
  feedback.value = feedbackOk.value
    ? `Perfecte! ${items.value.length} paraules correctes.`
    : `Revisa separacions i tòniques (${Math.round((ok / total) * items.value.length)}/${items.value.length} paraules completes).`
  emit('complete', {
    score: (ok / total) * max,
    _grade: { score: (ok / total) * max, maxScore: max, feedback: feedback.value },
  })
}
</script>
