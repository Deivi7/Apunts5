<template>
  <div class="ex-shell memory-lab">
    <div class="memory-toolbar">
      <p class="match-hint" style="margin: 0; flex: 1;">
        {{ instructions }}
      </p>
      <div class="memory-stats">
        <span>🎯 {{ matchedCount }}/{{ pairs.length }}</span>
        <span>🃏 {{ moves }} jugadas</span>
      </div>
      <button type="button" class="ex-btn" @click="reshuffle">🔄 Reiniciar</button>
    </div>

    <div class="memory-grid" :style="gridStyle">
      <button
        v-for="card in cards"
        :key="card.key"
        type="button"
        class="memory-card"
        :class="{
          revealed: flipped.includes(card.key) || card.matched,
          matched: card.matched,
        }"
        :disabled="card.matched || lock"
        :aria-label="card.matched || flipped.includes(card.key) ? card.label : 'Carta tapada'"
        @click="flip(card)"
      >
        <div class="memory-card-inner">
          <div class="memory-card-face memory-front">?</div>
          <div class="memory-card-face memory-back">
            <span v-if="card.icon" class="memory-icon">{{ card.icon }}</span>
            <span class="memory-label">{{ card.label }}</span>
            <button
              v-if="card.speakText"
              type="button"
              class="memory-audio"
              title="Escuchar"
              @click.stop="speak(card)"
            >🔊</button>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { speakText, warmSpeechVoices } from '@/composables/useSpeech'

const props = defineProps({
  exercise: { type: Object, required: true },
  modelValue: { type: Object, default: () => ({}) },
})
const emit = defineEmits(['update:modelValue', 'complete'])

const pairs = computed(() => props.exercise.content?.pairs || [])
const lang = computed(() => props.exercise?.config?.lang || props.exercise?.content?.lang || 'en-US')
const instructions = computed(
  () => props.exercise?.instructions
    || 'Gira dos cartas. Si forman pareja (palabra + significado), se quedan abiertas. Usa 🔊 para oír la pronunciación.',
)

const cards = ref([])
const flipped = ref([])
const matchedCount = ref(0)
const moves = ref(0)
const lock = ref(false)

const cols = computed(() => {
  const n = pairs.value.length * 2
  if (n <= 8) return 4
  if (n <= 12) return 4
  if (n <= 16) return 4
  return 6
})
const gridStyle = computed(() => ({
  gridTemplateColumns: `repeat(${cols.value}, minmax(0, 1fr))`,
}))

warmSpeechVoices()

function buildDeck() {
  const list = []
  pairs.value.forEach((p, i) => {
    list.push({
      key: `l-${i}`,
      pairId: i,
      label: p.left,
      icon: p.leftIcon || p.icon || '',
      speakText: p.leftSpeak || p.speak || p.left,
      side: 'left',
    })
    list.push({
      key: `r-${i}`,
      pairId: i,
      label: p.right,
      icon: p.rightIcon || '',
      speakText: p.rightSpeak || '',
      side: 'right',
    })
  })
  cards.value = list
    .sort(() => Math.random() - 0.5)
    .map((c) => ({ ...c, matched: false }))
  flipped.value = []
  matchedCount.value = 0
  moves.value = 0
  lock.value = false
  emit('update:modelValue', { matchedCount: 0, moves: 0 })
}

watch(() => props.exercise.id, buildDeck, { immediate: true })

function reshuffle() {
  buildDeck()
}

function speak(card) {
  const text = card.speakText || card.label
  if (!text) return
  speakText(text, {
    lang: lang.value,
    rate: lang.value.startsWith('en') ? 0.88 : 0.95,
  })
}

function flip(card) {
  if (lock.value || card.matched || flipped.value.includes(card.key)) return
  flipped.value = [...flipped.value, card.key]
  if (card.speakText) speak(card)
  if (flipped.value.length < 2) return

  lock.value = true
  moves.value += 1
  const [aKey, bKey] = flipped.value
  const a = cards.value.find((c) => c.key === aKey)
  const b = cards.value.find((c) => c.key === bKey)

  setTimeout(() => {
    if (a && b && a.pairId === b.pairId) {
      a.matched = true
      b.matched = true
      matchedCount.value += 1
      emit('update:modelValue', { matchedCount: matchedCount.value, moves: moves.value })
      if (matchedCount.value >= pairs.value.length) {
        emit('complete', {
          matchedCount: matchedCount.value,
          moves: moves.value,
          _grade: {
            score: props.exercise.maxScore || pairs.value.length,
            maxScore: props.exercise.maxScore || pairs.value.length,
            feedback: `¡Memoria completada en ${moves.value} jugadas!`,
          },
        })
      }
    }
    flipped.value = []
    lock.value = false
  }, 700)
}
</script>

<style scoped>
.memory-lab {
  display: grid;
  gap: 1rem;
}
.memory-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}
.memory-stats {
  display: flex;
  gap: 0.75rem;
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--text-muted);
}
.memory-grid {
  display: grid;
  gap: 0.85rem;
  max-width: 920px;
  margin: 0 auto;
  width: 100%;
}
.memory-card {
  aspect-ratio: 1 / 1;
  height: auto;
  min-height: 108px;
  perspective: 1000px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  font-family: inherit;
}
.memory-card:disabled {
  cursor: default;
}
.memory-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.45s;
  transform-style: preserve-3d;
  border-radius: 14px;
}
.memory-card.revealed .memory-card-inner,
.memory-card.matched .memory-card-inner {
  transform: rotateY(180deg);
}
.memory-card-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.55rem;
  box-shadow: 0 6px 16px color-mix(in srgb, #0f172a 12%, transparent);
}
.memory-front {
  background: linear-gradient(145deg, #4f46e5, #312e81);
  color: #fff;
  font-size: 1.75rem;
  font-weight: 900;
  border: 2px solid #818cf8;
}
.memory-back {
  transform: rotateY(180deg);
  background: var(--bg-card);
  border: 2px solid var(--primary);
  color: var(--text-main);
}
.memory-card.matched .memory-back {
  border-color: var(--accent-green, #10b981);
  background: color-mix(in srgb, var(--accent-green, #10b981) 12%, var(--bg-card));
}
.memory-icon {
  font-size: 1.35rem;
  line-height: 1;
}
.memory-label {
  font-size: 0.78rem;
  font-weight: 800;
  line-height: 1.25;
  text-align: center;
}
.memory-audio {
  border: none;
  background: color-mix(in srgb, var(--primary) 12%, transparent);
  border-radius: 999px;
  width: 1.7rem;
  height: 1.7rem;
  cursor: pointer;
  font-size: 0.85rem;
  margin-top: 0.15rem;
}
@media (max-width: 640px) {
  .memory-card {
    min-height: 92px;
  }
  .memory-label {
    font-size: 0.7rem;
  }
}
</style>
