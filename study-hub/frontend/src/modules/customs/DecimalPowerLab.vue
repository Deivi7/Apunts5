<template>
  <div class="du-lab">
    <div class="du-row">
      <button type="button" class="level-pill" :class="{ on: mode === 'mul' }" @click="setMode('mul')">× 10, 100…</button>
      <button type="button" class="level-pill" :class="{ on: mode === 'div' }" @click="setMode('div')">÷ 10, 100…</button>
      <button type="button" class="ex-btn" :disabled="locked" @click="newItem">🎲 Un altre</button>
    </div>

    <p class="match-hint" style="margin:0">
      Mou la coma {{ mode === 'mul' ? 'a la dreta' : 'a l\'esquerra' }}
      <strong>{{ current?.zeros }}</strong> {{ current?.zeros === 1 ? 'lloc' : 'llocs' }}
      ({{ mode === 'mul' ? '×' : '÷' }} {{ current?.power }}).
    </p>

    <div class="du-num">
      {{ formatCa(current?.n ?? 0) }}
      <span style="opacity:.55;font-size:1rem;margin:0 .35rem">{{ mode === 'mul' ? '×' : '÷' }}</span>
      {{ current?.power }}
    </div>

    <form class="du-row" @submit.prevent="check">
      <input v-model="answer" class="input-hub" placeholder="Resultat (usa coma)" autocomplete="off" :disabled="locked">
      <button type="submit" class="ex-btn ex-btn-primary" :disabled="locked">Comprovar</button>
      <button type="button" class="ex-btn" @click="showHint = !showHint">Pista</button>
    </form>

    <p v-if="showHint" class="match-hint">
      Compte els zeros de {{ current?.power }} → salta la coma {{ current?.zeros }}
      {{ mode === 'mul' ? 'cap a la dreta' : 'cap a l\'esquerra' }}.
    </p>
    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
    <p class="match-hint" style="margin:0">Encerts: {{ correctCount }}/{{ needed }}</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useLabAttemptLock } from '@/composables/useLabAttemptLock.js'
import {
  answersMatch,
  formatCa,
  generatePower10Item,
} from '@/modules/mates/decimalsUnitatsMath.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const { locked, canCheck, unlockForNext, lockAfterCorrect, clearTimer } = useLabAttemptLock()

const mode = ref('mul')
const current = ref(null)
const answer = ref('')
const feedback = ref('')
const ok = ref(false)
const showHint = ref(false)
const correctCount = ref(0)
const needed = 4

function pick() {
  clearTimer()
  unlockForNext()
  current.value = generatePower10Item(mode.value)
  answer.value = ''
  feedback.value = ''
  ok.value = false
  showHint.value = false
}

function setMode(m) {
  mode.value = m
  pick()
}

function newItem() {
  if (locked.value) return
  pick()
}

function check() {
  if (!current.value || !canCheck()) return
  ok.value = answersMatch(answer.value, current.value.answer)
  feedback.value = ok.value
    ? `Correcte! ${formatCa(current.value.n)} ${current.value.op} ${current.value.power} = ${formatCa(current.value.answer)}`
    : `Encara no. La resposta és ${formatCa(current.value.answer)}.`
  emit('update:modelValue', { answer: answer.value, ok: ok.value })
  if (ok.value) {
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: `${correctCount.value} desplaçaments correctes.`,
        },
      })
    }
    lockAfterCorrect(700, pick)
  }
}

onMounted(pick)
</script>

<style scoped>
.level-pill {
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  border-radius: 999px;
  padding: 0.28rem 0.65rem;
  font-weight: 800;
  font-size: 0.78rem;
  cursor: pointer;
  font-family: inherit;
}
.level-pill.on {
  background: var(--du-primary, #0f766e);
  color: #fff;
  border-color: transparent;
}
.ex-btn:disabled,
.input-hub:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
