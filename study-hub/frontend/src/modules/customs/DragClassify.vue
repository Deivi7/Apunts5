<template>
  <div class="classify-layout">
    <p class="match-hint">{{ hintText }}</p>

    <div
      class="classify-pool"
      @dragover.prevent
      @drop.prevent="dropTo('pool')"
    >
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
      <span v-if="!poolItems.length" class="match-hint">Todas las fichas están clasificadas.</span>
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

    <button type="button" class="ex-btn ex-btn-primary" style="width: fit-content;" @click="check">
      Comprobar clasificación
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

function shuffle(arr) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

const hintText = computed(
  () => props.exercise?.content?.hint
    || 'Arrastra cada ficha a su categoría (también puedes hacer clic en la ficha y luego en la zona).',
)
const zones = computed(() => props.exercise?.content?.zones || [])
const items = computed(() => props.exercise?.content?.items || [])
const poolOrder = ref([])

/** placement: { [itemId]: zoneId | 'pool' } */
const placement = ref({})
const draggingId = ref('')
const selectedId = ref('')
const overZone = ref('')

function resetPlacement() {
  const next = {}
  items.value.forEach((it) => {
    next[it.id] = 'pool'
  })
  placement.value = next
  poolOrder.value = props.exercise?.content?.shuffleOnLoad
    ? shuffle(items.value.map((it) => it.id))
    : items.value.map((it) => it.id)
  emit('update:modelValue', { placement: { ...next } })
}

watch(() => props.exercise?.id, resetPlacement, { immediate: true })

const poolItems = computed(() => {
  const inPool = items.value.filter((it) => placement.value[it.id] === 'pool')
  const order = poolOrder.value.length ? poolOrder.value : inPool.map((it) => it.id)
  const rank = new Map(order.map((id, i) => [id, i]))
  return [...inPool].sort((a, b) => (rank.get(a.id) ?? 0) - (rank.get(b.id) ?? 0))
})

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
  emit('update:modelValue', { placement: { ...placement.value } })
  draggingId.value = ''
  selectedId.value = ''
  overZone.value = ''
}

function placeSelected(zoneId) {
  if (!selectedId.value) return
  dropTo(zoneId)
}

function check() {
  let score = 0
  const maxScore = props.exercise?.maxScore || items.value.length || 1
  items.value.forEach((it) => {
    if (placement.value[it.id] === it.zone) score += maxScore / items.value.length
  })
  const ok = score >= maxScore - 0.01
  emit('complete', {
    placement: { ...placement.value },
    _grade: {
      score,
      maxScore,
      feedback: ok
        ? (props.exercise?.content?.successFeedback || '¡Clasificación perfecta!')
        : (props.exercise?.content?.failFeedback || 'Revisa algunas fichas; aún hay errores.'),
    },
  })
}
</script>
