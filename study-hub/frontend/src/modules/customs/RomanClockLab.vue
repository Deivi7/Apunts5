<template>
  <div>
    <p class="match-hint" style="margin-top: 0;">Observa la esfera y escribe la hora en formato HH:MM.</p>
    <div style="display: flex; flex-wrap: wrap; gap: 1.25rem; align-items: center;">
      <svg class="clock-svg" width="200" height="200" viewBox="0 0 200 200" aria-label="Reloj romano">
        <circle cx="100" cy="100" r="95" fill="var(--bg-card)" stroke="var(--roman-gold, #c9a227)" stroke-width="6" />
        <circle cx="100" cy="100" r="88" fill="var(--bg-main)" stroke="var(--border-color)" stroke-width="1" />
        <g font-family="Outfit, sans-serif" font-size="12" font-weight="900" fill="var(--text-main)" text-anchor="middle" dominant-baseline="central">
          <text x="100" y="24">XII</text>
          <text x="138" y="34">I</text>
          <text x="166" y="62">II</text>
          <text x="176" y="100">III</text>
          <text x="166" y="138">IV</text>
          <text x="138" y="166">V</text>
          <text x="100" y="176">VI</text>
          <text x="62" y="166">VII</text>
          <text x="34" y="138">VIII</text>
          <text x="24" y="100">IX</text>
          <text x="34" y="62">X</text>
          <text x="62" y="34">XI</text>
        </g>
        <line :x1="100" :y1="100" :x2="hourXY.x" :y2="hourXY.y" stroke="var(--roman-crimson, #b91c1c)" stroke-width="5" stroke-linecap="round" />
        <line :x1="100" :y1="100" :x2="minXY.x" :y2="minXY.y" stroke="var(--text-main)" stroke-width="3" stroke-linecap="round" />
        <circle cx="100" cy="100" r="5" fill="var(--roman-gold, #c9a227)" />
      </svg>

      <div style="display: grid; gap: 0.65rem;">
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <span style="font-weight: 800; font-size: 0.85rem;">Hora (HH:MM):</span>
          <input v-model="input" type="text" class="input-hub" placeholder="HH:MM" style="width: 110px;" @keydown.enter="check">
          <button type="button" class="ex-btn ex-btn-primary" @click="check">✓ Comprobar</button>
          <button type="button" class="ex-btn" @click="next">🎲 Nueva hora</button>
        </div>
        <p class="match-hint" style="margin: 0;">Aciertos: {{ hits }}</p>
        <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
        <div class="alpha-lab-card" style="margin: 0; font-size: 0.85rem;">
          <strong>Curiosidad:</strong> en relojes antiguos a veces aparece <code>IIII</code> en vez de <code>IV</code>, pero en clase siempre escribimos <code>IV</code>.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const hours = ref(3)
const minutes = ref(0)
const input = ref('')
const feedback = ref('')
const ok = ref(false)
const hits = ref(0)

function handPoint(angleDeg, length) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: 100 + length * Math.cos(rad), y: 100 + length * Math.sin(rad) }
}

const hourXY = computed(() => {
  const angle = (hours.value % 12) * 30 + (minutes.value / 60) * 30
  return handPoint(angle, 45)
})
const minXY = computed(() => handPoint(minutes.value * 6, 65))

function next() {
  hours.value = 1 + Math.floor(Math.random() * 12)
  minutes.value = Math.floor(Math.random() * 12) * 5
  input.value = ''
  feedback.value = ''
  ok.value = false
}

next()

function check() {
  const val = input.value.trim().replace('.', ':')
  const hStr = String(hours.value).padStart(2, '0')
  const mStr = String(minutes.value).padStart(2, '0')
  const expected24 = `${hStr}:${mStr}`
  const expectedShort = `${hours.value}:${mStr}`
  ok.value = val === expected24 || val === expectedShort
  if (ok.value) {
    hits.value += 1
    feedback.value = `¡Perfecto! El reloj marca las ${expectedShort}.`
    emit('update:modelValue', { hits: hits.value })
    if (hits.value >= (props.exercise?.maxScore || 5)) {
      const max = props.exercise?.maxScore || 5
      emit('complete', {
        hits: hits.value,
        _grade: { score: max, maxScore: max, feedback: `Reloj romano: ${hits.value} aciertos` },
      })
    }
    setTimeout(next, 1200)
  } else {
    feedback.value = `Revisa: la manecilla corta cerca de ${hours.value} y la larga en ${minutes.value} min.`
  }
}
</script>
