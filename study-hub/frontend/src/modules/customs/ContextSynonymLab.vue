<template>
  <div>
    <p class="match-hint">Tria el sinònim que pot substituir la paraula destacada a cada frase.</p>
    <p v-if="scoreLabel" class="match-hint" style="font-weight: 800; color: var(--primary);">{{ scoreLabel }}</p>

    <div v-for="(item, idx) in items" :key="idx" class="ex-block" style="margin-bottom: 1rem;">
      <p class="ex-prompt" style="line-height: 1.5;" v-html="formatSentence(item)" />
      <p class="match-hint" style="font-weight: 700; margin: 0.35rem 0;">Sinònim correcte:</p>
      <div class="choice-row">
        <button
          v-for="(opt, oi) in item.options"
          :key="opt"
          type="button"
          class="quiz-option-btn"
          :class="btnClass(idx, oi, item)"
          :disabled="locked[idx]"
          @click="choose(idx, oi, item)"
        >
          {{ opt }}
        </button>
      </div>
      <p v-if="feedback[idx]" class="match-hint" :class="feedbackOk[idx] ? 'feedback-ok' : 'feedback-bad'">
        {{ feedback[idx] }}
      </p>
    </div>

    <button v-if="doneCount === items.length" type="button" class="ex-btn ex-btn-primary" @click="finish">
      Registrar resultat
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const items = computed(() => props.exercise?.content?.items || [])
const locked = ref({})
const feedback = ref({})
const feedbackOk = ref({})
const hits = ref(0)

const doneCount = computed(() => Object.keys(locked.value).length)
const scoreLabel = computed(() => (doneCount.value
  ? `Encerts: ${hits.value} / ${items.value.length}`
  : ''))

watch(() => props.exercise?.id, () => {
  locked.value = {}
  feedback.value = {}
  feedbackOk.value = {}
  hits.value = 0
})

function formatSentence(item) {
  const t = item.target
  const safe = item.sentence.replace(
    new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'),
    `<strong style="color: var(--primary); text-decoration: underline;">${t}</strong>`,
  )
  return `«${safe}»`
}

function btnClass(idx, oi, item) {
  if (!locked.value[idx]) return ''
  if (oi === item.correct) return 'correct'
  if (feedbackOk.value[idx] === false && locked.value[idx] === oi) return 'incorrect'
  return ''
}

function choose(idx, oi, item) {
  if (locked.value[idx] != null) return
  locked.value = { ...locked.value, [idx]: oi }
  const ok = oi === item.correct
  feedbackOk.value = { ...feedbackOk.value, [idx]: ok }
  if (ok) {
    hits.value += 1
    feedback.value = { ...feedback.value, [idx]: `🌟 Excel·lent! ${item.reason}` }
  } else {
    feedback.value = { ...feedback.value, [idx]: `❌ ${item.reason}` }
    setTimeout(() => {
      const next = { ...locked.value }
      delete next[idx]
      locked.value = next
      const fb = { ...feedback.value }
      delete fb[idx]
      feedback.value = fb
    }, 1300)
  }
  emit('update:modelValue', { hits: hits.value, idx })
}

function finish() {
  const max = props.exercise?.maxScore || items.value.length
  const score = hits.value
  emit('complete', {
    score,
    _grade: {
      score,
      maxScore: max,
      feedback: `Sinònims en context: ${score}/${items.value.length}`,
    },
  })
}
</script>
