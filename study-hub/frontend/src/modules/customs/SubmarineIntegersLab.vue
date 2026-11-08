<template>
  <div class="fe-lab">
    <div class="fe-row">
      <button
        type="button"
        class="fe-pill"
        :class="{ on: mode === 'joan' }"
        @click="setMode('joan')"
      >
        🤿 El busseig d'en Joan
      </button>
      <button
        type="button"
        class="fe-pill"
        :class="{ on: mode === 'mental' }"
        @click="setMode('mental')"
      >
        🧠 Suma i resta d'enters
      </button>
      <button type="button" class="ex-btn" :disabled="locked" @click="newItem">
        🎲 Nou repte
      </button>
    </div>

    <div v-if="item" class="fe-sea-container">
      <!-- Escala visual del mar -->
      <div class="fe-sea-column">
        <div class="fe-sea-surface">🌊 Nivell del mar (0 m)</div>
        <div class="fe-sea-depths">
          <div
            v-for="d in depthMarks"
            :key="d"
            class="fe-depth-mark"
            :class="{
              'is-start': d === item.start,
              'is-end': showVisualTarget && d === item.end,
            }"
          >
            <span class="fe-depth-num">{{ d }} m</span>
            <span v-if="d === item.start" class="fe-diver-tag">🤿 Inici ({{ item.start }})</span>
            <span v-if="showVisualTarget && d === item.end" class="fe-target-tag">🏁 Final ({{ item.end }})</span>
          </div>
        </div>
      </div>

      <!-- Panell del problema -->
      <div class="fe-sea-problem">
        <div class="du-card" style="margin:0">
          <template v-if="mode === 'joan'">
            <h3 style="margin-bottom:0.4rem"><span>🤿</span> Repte sota el mar</h3>
            <p style="font-size:0.92rem;margin-bottom:0.5rem">
              En Joan busseja a <strong>{{ item.start }} metres</strong>
              ({{ Math.abs(item.start) }} m sota el nivell del mar).<br>
              Tot seguit, <strong>{{ item.delta < 0 ? `baixa ${Math.abs(item.delta)} metres` : `puja ${item.delta} metres` }}</strong>.
            </p>
            <div class="du-num" style="margin-bottom:0.65rem">
              ({{ item.start }}) {{ item.delta < 0 ? `− ${Math.abs(item.delta)}` : `+ ${item.delta}` }} = ?
            </div>
          </template>

          <template v-else>
            <h3 style="margin-bottom:0.4rem"><span>🧠</span> Càlcul amb nombres negatius</h3>
            <p style="font-size:0.86rem;margin-bottom:0.45rem">
              Pensa-ho com el submarí: comences a <strong>{{ item.start }}</strong> i et mous
              <strong>{{ item.delta < 0 ? `${Math.abs(item.delta)} cap avall (−)` : `${item.delta} cap amunt (+)` }}</strong>.
            </p>
            <div class="du-num" style="margin-bottom:0.65rem">
              {{ item.expr }} = ?
            </div>
          </template>

          <form class="fe-row" @submit.prevent="check">
            <button type="button" class="ex-btn" @click="prependSign('-')">−</button>
            <button type="button" class="ex-btn" @click="prependSign('+')">+</button>
            <input
              v-model="answer"
              class="input-hub"
              placeholder="Ex: -25 o -3"
              autocomplete="off"
              style="max-width:140px"
              :disabled="locked"
            >
            <button type="submit" class="ex-btn ex-btn-primary" :disabled="locked">
              Comprovar
            </button>
            <button type="button" class="ex-btn" @click="showHint = !showHint">
              💡 Pista
            </button>
          </form>

          <p v-if="showHint" class="match-hint" style="margin-top:0.55rem">
            {{ item.hint }}
          </p>
          <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'" style="margin-top:0.55rem">
            {{ feedback }}
          </p>
          <p class="match-hint" style="margin:0.45rem 0 0">
            Immersions resoltes: <strong>{{ correctCount }} / {{ needed }}</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useLabAttemptLock } from '@/composables/useLabAttemptLock.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['update:modelValue', 'complete'])
const { locked, canCheck, unlockForNext, lockAfterCorrect, clearTimer } = useLabAttemptLock()

const depthMarks = [0, -5, -10, -15, -20, -25, -30, -35, -40]

const mode = ref('joan')
const item = ref(null)
const answer = ref('')
const feedback = ref('')
const ok = ref(false)
const showHint = ref(false)
const showVisualTarget = ref(false)
const correctCount = ref(0)
const needed = 5

function pickFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function buildItem() {
  if (mode.value === 'joan') {
    const start = pickFrom([-10, -15, -20, -25, -30])
    const goDown = Math.random() < 0.55 && start > -35
    const step = pickFrom([5, 10, 15, 20])
    let delta = goDown ? -step : step
    if (start + delta < -40) delta = -5
    if (start + delta > 0) delta = 5
    const end = start + delta
    const expr = `(${start}) ${delta < 0 ? '− ' + Math.abs(delta) : '+ ' + delta}`
    const hint = delta < 0
      ? `Baixar vol dir enfonsar-se més: a ${Math.abs(start)} m sota l'aigua hi sumes ${Math.abs(delta)} m més cap al fons → ${end} m.`
      : `Pujar vol dir apropar-se al 0: estàs a ${start} m i puges ${delta} m cap a la superfície → ${end} m.`
    return { start, delta, end, expr, hint }
  }

  // Modo mental
  const starts = [-25, -20, -15, -10, -5, 0, 5, 10]
  const start = pickFrom(starts)
  const deltas = [-15, -10, -5, 5, 10, 15, 20]
  let delta = pickFrom(deltas)
  if (start + delta < -40 || start + delta > 15) delta = -delta
  const end = start + delta
  const startStr = start < 0 ? `(${start})` : `${start}`
  const expr = `${startStr} ${delta < 0 ? '− ' + Math.abs(delta) : '+ ' + delta}`
  const hint = `Si surts de ${start} i fas ${delta < 0 ? '−' + Math.abs(delta) + ' (baixes)' : '+' + delta + ' (puges)'}, arribes a ${end}.`
  return { start: Math.min(0, Math.max(-40, Math.round(start / 5) * 5)), delta, end, expr, hint }
}

function pick() {
  clearTimer()
  unlockForNext()
  item.value = buildItem()
  answer.value = ''
  feedback.value = ''
  ok.value = false
  showHint.value = false
  showVisualTarget.value = false
}

function setMode(m) {
  mode.value = m
  pick()
}

function newItem() {
  if (locked.value) return
  pick()
}

function prependSign(s) {
  const clean = answer.value.replace(/^[+-−]/, '').trim()
  answer.value = `${s}${clean}`
}

function check() {
  if (!item.value || !canCheck()) return
  const raw = answer.value.trim().replace('−', '-').replace(/\s*m(etres)?$/i, '')
  const num = Number(raw.replace(/^\+/, ''))

  ok.value = raw !== '' && !Number.isNaN(num) && num === item.value.end
  showVisualTarget.value = true

  feedback.value = ok.value
    ? `Correcte! ${item.value.expr} = ${item.value.end}.`
    : `Encara no: la resposta correcta és ${item.value.end}.`

  emit('update:modelValue', { answer: answer.value, ok: ok.value })

  if (ok.value) {
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: {
          score: max,
          maxScore: max,
          feedback: `${correctCount.value} immersions amb nombres negatius completades!`,
        },
      })
    }
    lockAfterCorrect(900, pick)
  }
}

onMounted(pick)
</script>

