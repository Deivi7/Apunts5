<template>
  <div class="classify-layout">
    <div class="ww-toolbar">
      <button
        v-for="lvl in levels"
        :key="lvl"
        type="button"
        class="mode-pill"
        :class="{ on: activeLevel === lvl }"
        @click="setLevel(lvl)"
      >
        Nivell {{ lvl }} ({{ levelCounts[lvl] }} paraules)
      </button>
      <button type="button" class="ex-btn" @click="reset">🔄 Reiniciar</button>
    </div>

    <p class="match-hint">
      Arrossega cada paraula a la columna correcta (aguda, plana o esdrúixola). També pots clicar la fitxa i després la zona.
    </p>

    <div class="classify-pool" @dragover.prevent @drop.prevent="dropTo('pool')">
      <button
        v-for="item in poolItems"
        :key="item.id"
        type="button"
        class="classify-token"
        :class="{ dragging: draggingId === item.id, 'is-selected': selectedId === item.id }"
        draggable="true"
        @dragstart="startDrag(item.id, $event)"
        @dragend="draggingId = ''"
        @click="selectedId = selectedId === item.id ? '' : item.id"
      >
        {{ item.label }}
      </button>
      <span v-if="!poolItems.length" class="match-hint">Totes les paraules estan classificades.</span>
    </div>

    <div class="classify-zones">
      <div
        v-for="zone in zones"
        :key="zone.id"
        class="classify-zone"
        :class="{ 'drag-over': overZone === zone.id }"
        @dragover.prevent="overZone = zone.id"
        @dragleave="overZone = overZone === zone.id ? '' : overZone"
        @drop.prevent="dropTo(zone.id)"
        @click="placeSelected(zone.id)"
      >
        <div class="classify-zone-head" :style="zoneHeadStyle(zone)">{{ zone.title }}</div>
        <div class="classify-zone-body">
          <button
            v-for="item in itemsIn(zone.id)"
            :key="item.id"
            type="button"
            class="classify-token"
            draggable="true"
            @dragstart="startDrag(item.id, $event)"
            @dragend="draggingId = ''"
            @click.stop="selectedId = item.id"
          >
            {{ item.label }}
          </button>
        </div>
      </div>
    </div>

    <p v-if="scoreLabel" class="accent-gen-meta">{{ scoreLabel }}</p>
    <p v-if="feedback" class="feedback-msg" :class="feedbackOk ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>

    <button type="button" class="ex-btn ex-btn-primary" style="width: fit-content;" @click="check">
      Comprova la classificació
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { ACCENT_WORDWALL_ZONES, WORDWALL_LEVELS } from '@/modules/catala/tema2Data.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const levels = computed(() => props.exercise?.content?.levels || [1, 2])
const zones = computed(() => props.exercise?.content?.zones || ACCENT_WORDWALL_ZONES)
const levelCounts = computed(() => ({
  1: (WORDWALL_LEVELS[1] || []).length,
  2: (WORDWALL_LEVELS[2] || []).length,
}))

const activeLevel = ref(levels.value[0] || 1)
const items = computed(() => {
  const fromContent = props.exercise?.content?.items
  if (fromContent?.length) return fromContent
  return WORDWALL_LEVELS[activeLevel.value] || []
})

const placement = ref({})
const draggingId = ref('')
const selectedId = ref('')
const overZone = ref('')
const feedback = ref('')
const feedbackOk = ref(false)
const scoreLabel = ref('')

function initPlacement() {
  const next = {}
  items.value.forEach((it) => {
    next[it.id] = 'pool'
  })
  placement.value = next
  feedback.value = ''
  scoreLabel.value = ''
  emit('update:modelValue', { level: activeLevel.value, placement: { ...next } })
}

watch(
  () => [props.exercise?.id, activeLevel.value],
  () => initPlacement(),
  { immediate: true },
)

const poolItems = computed(() => items.value.filter((it) => placement.value[it.id] === 'pool'))

function itemsIn(zoneId) {
  return items.value.filter((it) => placement.value[it.id] === zoneId)
}

function zoneHeadStyle(zone) {
  if (!zone.color) return {}
  return {
    background: `color-mix(in srgb, ${zone.color} 16%, transparent)`,
    color: zone.color,
    borderBottomColor: zone.color,
  }
}

function setLevel(lvl) {
  activeLevel.value = lvl
}

function reset() {
  initPlacement()
}

function startDrag(id, event) {
  draggingId.value = id
  selectedId.value = id
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.setData('text/plain', id)
}

function dropTo(zoneId) {
  const id = draggingId.value || selectedId.value
  if (!id) return
  placement.value = { ...placement.value, [id]: zoneId }
  emit('update:modelValue', { level: activeLevel.value, placement: { ...placement.value } })
  draggingId.value = ''
  selectedId.value = ''
  overZone.value = ''
}

function placeSelected(zoneId) {
  if (!selectedId.value) return
  dropTo(zoneId)
}

function check() {
  let correct = 0
  const list = items.value
  list.forEach((it) => {
    if (placement.value[it.id] === it.zone) correct += 1
  })
  scoreLabel.value = `${correct} / ${list.length} correctes`
  feedbackOk.value = correct === list.length
  feedback.value = feedbackOk.value
    ? `🏆 Excel·lent! Has completat les ${list.length} paraules del nivell ${activeLevel.value}.`
    : `Tens ${correct} encertades de ${list.length}. Revisa les fitxes mal col·locades.`

  const maxScore = props.exercise?.maxScore || list.length
  const score = Math.round((correct / list.length) * maxScore)
  emit('complete', {
    level: activeLevel.value,
    placement: { ...placement.value },
    _grade: {
      score,
      maxScore,
      feedback: feedback.value,
    },
  })
}
</script>

<style scoped>
.ww-toolbar { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; margin-bottom: 0.25rem; }
.mode-pill {
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  border-radius: 999px;
  padding: 0.28rem 0.65rem;
  font-weight: 800;
  font-size: 0.78rem;
  cursor: pointer;
  font-family: inherit;
}
.mode-pill.on { background: var(--primary); color: #fff; border-color: var(--primary); }
.accent-gen-meta { font-size: 0.9rem; font-weight: 800; color: var(--primary); margin: 0; }
</style>
