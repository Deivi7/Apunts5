<template>
  <div class="du-lab">
    <p class="match-hint" style="margin:0">
      1) Multiplica com enters · 2) Compte els decimals · 3) Posiciona la coma des de la dreta.
    </p>

    <div class="du-num">
      {{ formatCa(current.dec) }} × {{ current.nat }}
    </div>

    <div class="steps" v-if="showSteps">
      <div class="step-row"><span class="step-num">1</span> Sense coma: {{ rawInt }} × {{ current.nat }} = {{ rawProduct }}</div>
      <div class="step-row"><span class="step-num">2</span> Decimals al factor: {{ decCount }}</div>
      <div class="step-row"><span class="step-num">3</span> Producte final: {{ formatCa(current.answer) }}</div>
    </div>

    <form class="du-row" @submit.prevent="check">
      <input v-model="answer" class="input-hub" placeholder="Producte" autocomplete="off">
      <button type="submit" class="ex-btn ex-btn-primary">Comprovar</button>
      <button type="button" class="ex-btn" @click="showSteps = !showSteps">Passos</button>
      <button type="button" class="ex-btn" @click="pick">🎲 Un altre</button>
    </form>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  answersMatch,
  countDecimals,
  formatCa,
  generateDecimalMultItem,
} from '@/modules/mates/decimalsUnitatsMath.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const current = ref({ dec: 2.4, nat: 5, answer: 12 })
const answer = ref('')
const feedback = ref('')
const ok = ref(false)
const showSteps = ref(false)
const correctCount = ref(0)
const needed = 4

const decCount = computed(() => countDecimals(current.value.dec))
const rawInt = computed(() => String(current.value.dec).replace('.', '').replace(',', ''))
const rawProduct = computed(() => Number(rawInt.value) * current.value.nat)

function pick() {
  current.value = generateDecimalMultItem()
  answer.value = ''
  feedback.value = ''
  ok.value = false
  showSteps.value = false
}

function check() {
  ok.value = answersMatch(answer.value, current.value.answer)
  feedback.value = ok.value
    ? `Exacte! ${formatCa(current.value.dec)} × ${current.value.nat} = ${formatCa(current.value.answer)}`
    : `Revisa els decimals. Resposta: ${formatCa(current.value.answer)}`
  showSteps.value = true
  emit('update:modelValue', { answer: answer.value })
  if (ok.value) {
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: { score: max, maxScore: max, feedback: `${correctCount.value} productes correctes.` },
      })
    }
    setTimeout(() => pick(), 800)
  }
}

onMounted(pick)
</script>

<style scoped>
.steps { display: grid; gap: 0.35rem; }
.step-row {
  display: flex; gap: 0.5rem; align-items: flex-start;
  font-size: 0.9rem; background: var(--bg-main); padding: 0.4rem 0.55rem; border-radius: 0.4rem;
}
.step-num {
  width: 1.35rem; height: 1.35rem; border-radius: 50%;
  background: var(--du-primary, #0f766e); color: #fff;
  display: inline-flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 800; flex-shrink: 0;
}
</style>
