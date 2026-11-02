<template>
  <div class="tf-lab">
    <h4 style="margin: 0 0 0.5rem;">✅ Veritat o Fals (fitxa de teoria)</h4>
    <div v-for="item in THEORY_TF" :key="item.id" class="tf-item">
      <p class="tf-prompt">{{ item.prompt }}</p>
      <div class="tf-actions">
        <button
          type="button"
          class="btn-tf"
          :class="{ correct: answered[item.id] === true && item.correct, wrong: answered[item.id] === true && !item.correct }"
          :disabled="answered[item.id] != null"
          @click="answer(item, true)"
        >Veritat</button>
        <button
          type="button"
          class="btn-tf"
          :class="{ correct: answered[item.id] === false && !item.correct, wrong: answered[item.id] === false && item.correct }"
          :disabled="answered[item.id] != null"
          @click="answer(item, false)"
        >Fals</button>
      </div>
      <p v-if="explanations[item.id]" class="tf-explain">{{ explanations[item.id] }}</p>
    </div>
    <p v-if="done" class="feedback-msg feedback-ok">
      ✅ Teoria V/F: {{ hits }}/{{ THEORY_TF.length }} correctes
    </p>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { THEORY_TF } from '@/modules/projecte/coordenadasData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const answered = reactive({})
const explanations = reactive({})
const hits = computed(() =>
  THEORY_TF.filter((item) => answered[item.id] === item.correct).length,
)
const done = computed(() => Object.keys(answered).length >= THEORY_TF.length)

function answer(item, value) {
  if (answered[item.id] != null) return
  answered[item.id] = value
  explanations[item.id] = item.explanation
  emit('update:modelValue', { answered: { ...answered }, hits: hits.value })
  if (done.value) {
    const max = props.exercise?.maxScore || THEORY_TF.length
    emit('complete', {
      hits: hits.value,
      _grade: { score: hits.value, maxScore: max, feedback: `Teoria V/F: ${hits.value}/${max}` },
    })
  }
}
</script>

<style scoped>
.tf-lab { display: grid; gap: 0.75rem; }
.tf-item {
  padding: 0.75rem 0.9rem; border-radius: 10px; border: 1px solid var(--border-color);
  background: var(--bg-card);
}
.tf-prompt { margin: 0 0 0.5rem; font-weight: 700; }
.tf-actions { display: flex; gap: 0.4rem; flex-wrap: wrap; }
.btn-tf {
  padding: 0.4rem 0.85rem; border-radius: 8px; border: 1px solid var(--border-color);
  background: var(--bg-main); font-weight: 700; cursor: pointer; color: inherit;
}
.btn-tf:disabled { opacity: 0.85; cursor: default; }
.btn-tf.correct { background: rgba(16, 185, 129, 0.18); border-color: #10b981; color: #059669; }
.btn-tf.wrong { background: rgba(239, 68, 68, 0.12); border-color: #ef4444; color: #dc2626; }
.tf-explain {
  margin: 0.55rem 0 0; font-size: 0.85rem; font-weight: 600;
  color: var(--text-muted); line-height: 1.45;
}
</style>
