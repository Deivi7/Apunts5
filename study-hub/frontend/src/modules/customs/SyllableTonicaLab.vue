<template>
  <div>
    <p v-if="hint" class="match-hint">{{ hint }}</p>
    <div class="syllable-picker-grid">
      <div v-for="(item, wIdx) in words" :key="item.word + wIdx" class="syllable-picker-word-box">
        <span class="word-label-num">{{ wIdx + 1 }}.</span>
        <strong style="font-size: 0.95rem;">{{ item.word }}</strong>
        <div class="syllables-group">
          <button
            v-for="(syl, sIdx) in item.syllables"
            :key="sIdx"
            type="button"
            class="syllable-pill-btn"
            :class="pillClass(wIdx, sIdx, item.tonicIdx)"
            @click="pick(wIdx, sIdx)"
          >
            {{ syl }}
          </button>
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

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const words = computed(() => props.exercise?.content?.words || [])
const hint = computed(() => props.exercise?.instructions || '')
const answers = ref({})
const checked = ref(false)
const feedback = ref('')
const feedbackOk = ref(false)

watch(
  () => props.exercise?.id,
  () => {
    answers.value = {}
    checked.value = false
    feedback.value = ''
  },
)

function pick(wIdx, sIdx) {
  answers.value = { ...answers.value, [wIdx]: sIdx }
  emit('update:modelValue', answers.value)
}

function pillClass(wIdx, sIdx, tonicIdx) {
  if (!checked.value) {
    return answers.value[wIdx] === sIdx ? 'selected' : ''
  }
  if (sIdx === tonicIdx) return 'correct'
  if (answers.value[wIdx] === sIdx) return 'wrong'
  return ''
}

function check() {
  checked.value = true
  let ok = 0
  words.value.forEach((item, wIdx) => {
    if (answers.value[wIdx] === item.tonicIdx) ok += 1
  })
  const max = props.exercise?.maxScore || words.value.length
  feedbackOk.value = ok === words.value.length
  feedback.value = feedbackOk.value
    ? `Molt bé! ${ok}/${words.value.length} encerts.`
    : `Has encertat ${ok}/${words.value.length}. Les síl·labes en verd són la solució.`
  emit('complete', {
    score: (ok / words.value.length) * max,
    _grade: {
      score: (ok / words.value.length) * max,
      maxScore: max,
      feedback: feedback.value,
    },
  })
}
</script>
