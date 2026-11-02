<template>
  <div class="du-lab">
    <p class="match-hint" style="margin:0">
      Conveni: <strong>(Carrer, Avinguda)</strong> = (x, y).
      Clica la casella demanada.
    </p>

    <p style="font-weight:800;margin:0">Troba el punt {{ targetLabel }} → ({{ target.x }}, {{ target.y }})</p>

    <div style="overflow:auto">
      <div
        class="du-grid-map"
        :style="{ gridTemplateColumns: `repeat(${size}, 2rem)` }"
      >
        <button
          v-for="cell in cells"
          :key="cell.key"
          type="button"
          :class="{
            target: cell.x === target.x && cell.y === target.y && !picked,
            ok: picked && cell.x === target.x && cell.y === target.y,
            bad: picked && lastPick && cell.x === lastPick.x && cell.y === lastPick.y && !ok,
          }"
          :title="`(${cell.x}, ${cell.y})`"
          @click="pick(cell)"
        >
          {{ cell.x }},{{ cell.y }}
        </button>
      </div>
    </div>

    <p class="match-hint">Eix X = carrer (horitzontal) · Eix Y = avinguda (vertical)</p>
    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
    <button type="button" class="ex-btn" @click="newTarget">🎲 Un altre punt</button>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const size = 8
const presets = [
  { x: 4, y: 3, label: 'B (Carrer 4, 3a Av.)' },
  { x: 1, y: 5, label: 'A (Carrer 1, 5a Av.)' },
  { x: 5, y: 1, label: 'F (si invertissis: 5, 1a)' },
  { x: 2, y: 8, label: 'N (Carrer 2, 8a Av.)' },
  { x: 3, y: 6, label: 'aleatori' },
  { x: 7, y: 2, label: 'aleatori' },
]

const target = ref(presets[0])
const picked = ref(false)
const lastPick = ref(null)
const ok = ref(false)
const feedback = ref('')
const correctCount = ref(0)
const needed = 4

const targetLabel = computed(() => target.value.label)

const cells = computed(() => {
  const out = []
  for (let y = size; y >= 1; y--) {
    for (let x = 1; x <= size; x++) {
      out.push({ x, y, key: `${x}-${y}` })
    }
  }
  return out
})

function newTarget() {
  const pool = [
    ...presets,
    {
      x: 1 + Math.floor(Math.random() * size),
      y: 1 + Math.floor(Math.random() * size),
      label: 'repte',
    },
  ]
  target.value = pool[Math.floor(Math.random() * pool.length)]
  // Clamp y for size if preset N uses 8
  if (target.value.y > size) target.value = { ...target.value, y: size }
  picked.value = false
  lastPick.value = null
  ok.value = false
  feedback.value = ''
}

function pick(cell) {
  if (picked.value && ok.value) return
  lastPick.value = cell
  picked.value = true
  ok.value = cell.x === target.value.x && cell.y === target.value.y
  feedback.value = ok.value
    ? `Molt bé! (${cell.x}, ${cell.y})`
    : `Has clicat (${cell.x}, ${cell.y}). Calia (${target.value.x}, ${target.value.y}).`
  emit('update:modelValue', { pick: cell, target: target.value })
  if (ok.value) {
    correctCount.value += 1
    const max = props.exercise?.maxScore || 12
    if (correctCount.value >= needed) {
      emit('complete', {
        _grade: { score: max, maxScore: max, feedback: `${correctCount.value} punts localitzats.` },
      })
    }
    setTimeout(() => newTarget(), 700)
  }
}
</script>
