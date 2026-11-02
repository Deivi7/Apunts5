<template>
  <div class="coord-lab">
    <div class="coord-toolbar">
      <div>
        <p class="coord-mission">
          <span class="coord-badge">🎯 Missió {{ doneCount + 1 }}/{{ targets.length }}</span>
          <strong>{{ current.label }}</strong>
          <span v-if="current.sprite" class="coord-sprite">{{ current.sprite }}</span>
        </p>
        <p class="match-hint" style="margin: 0.35rem 0 0;">
          {{ hintText }}
        </p>
      </div>
      <div class="coord-progress">
        <span>✅ {{ doneCount }}/{{ targets.length }}</span>
        <label class="coord-toggle">
          <input v-model="showLive" type="checkbox">
          Mostrar coordenades
        </label>
      </div>
    </div>

    <div class="coord-layout">
      <div
        ref="mapBox"
        class="coord-map"
        @mousemove="onMove"
        @mouseleave="hover = null"
        @click="onClick"
      >
        <img
          v-if="mapSrc"
          :src="mapSrc"
          class="coord-map-img"
          :alt="mapAlt"
          draggable="false"
        >
        <div v-else class="coord-map-fallback" />

        <div v-if="showLive && hover" class="coord-live">
          Lat {{ formatLat(hover.lat) }} · Lon {{ formatLng(hover.lng) }}
        </div>

        <div
          v-if="crosshair"
          class="coord-cross-h"
          :style="{ top: crosshair.y + '%' }"
        />
        <div
          v-if="crosshair"
          class="coord-cross-v"
          :style="{ left: crosshair.x + '%' }"
        />

        <button
          v-for="t in targets"
          :key="t.id || t.label"
          type="button"
          class="coord-pin"
          :class="{ caught: caught[keyOf(t)], active: keyOf(t) === keyOf(current) }"
          :style="pinStyle(t)"
          :title="t.label"
          @click.stop="selectTarget(t)"
        >
          <span>{{ t.sprite || '📍' }}</span>
        </button>

        <div
          v-if="mark"
          class="coord-mark"
          :style="{ left: mark.x + '%', top: mark.y + '%' }"
        />
      </div>

      <aside class="coord-side">
        <h4 class="coord-side-title">{{ listTitle }}</h4>
        <button
          v-for="t in targets"
          :key="'side-' + (t.id || t.label)"
          type="button"
          class="coord-side-item"
          :class="{
            caught: caught[keyOf(t)],
            active: keyOf(t) === keyOf(current),
          }"
          @click="selectTarget(t)"
        >
          <span class="coord-side-ico">{{ t.sprite || '📍' }}</span>
          <span class="coord-side-text">
            <strong>{{ t.label }}</strong>
            <small v-if="t.locName">{{ t.locName }}</small>
            <small v-else>{{ t.lat }}°, {{ t.lng }}°</small>
          </span>
          <span class="coord-side-state">{{ caught[keyOf(t)] ? '✅' : '⏳' }}</span>
        </button>
      </aside>
    </div>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const IMG_BASE = '/content/projecte/coordenadas/img'

const targets = computed(() => props.exercise?.content?.targets || [])
const mode = computed(() => props.exercise?.content?.mode || 'radar')
const mapSrc = computed(() => {
  const custom = props.exercise?.content?.mapSrc
  if (custom) return custom.startsWith('/') ? custom : `${IMG_BASE}/${custom}`
  if (mode.value === 'grid') return `${IMG_BASE}/mapamundi_quadricula_buit.png`
  if (mode.value === 'legend') return `${IMG_BASE}/mapamundi_quadricula_punts.png`
  return `${IMG_BASE}/mapa_pokemon_team_rocket_fixed.png`
})
const mapAlt = computed(() => props.exercise?.content?.mapAlt || 'Mapamundi de coordenades')
const listTitle = computed(() => props.exercise?.content?.listTitle || 'Objectius')
const hintText = computed(() => {
  if (props.exercise?.content?.hint) return props.exercise.content.hint
  if (mode.value === 'radar') {
    return 'Fes clic al mapa (o a la icona) prop del Pokémon. Tolerància generosa; pots veure les coordenades en viu.'
  }
  return 'Fes clic al mapa per marcar el punt demanat. Observa latitud (N/S) i longitud (E/O).'
})

const targetIndex = ref(0)
const current = computed(() => targets.value[targetIndex.value] || targets.value[0] || { label: '—', lat: 0, lng: 0 })
const caught = reactive({})
const mark = ref(null)
const hover = ref(null)
const crosshair = ref(null)
const showLive = ref(true)
const feedback = ref('')
const ok = ref(false)
const mapBox = ref(null)

const doneCount = computed(() => Object.values(caught).filter(Boolean).length)

watch(
  () => props.exercise?.id,
  () => {
    Object.keys(caught).forEach((k) => delete caught[k])
    targetIndex.value = 0
    mark.value = null
    feedback.value = ''
    ok.value = false
  },
)

function keyOf(t) {
  return t?.id || t?.label
}

function pinStyle(t) {
  if (t.topPct != null && t.leftPct != null) {
    return { top: `${t.topPct}%`, left: `${t.leftPct}%` }
  }
  // fallback from lat/lng
  const x = ((Number(t.lng) + 180) / 360) * 100
  const y = ((90 - Number(t.lat)) / 180) * 100
  return { top: `${y}%`, left: `${x}%` }
}

function xyToLatLng(xPct, yPct) {
  return {
    lng: xPct * 3.6 - 180,
    lat: 90 - yPct * 1.8,
  }
}

function formatLat(lat) {
  const a = Math.abs(lat).toFixed(1)
  return `${a}° ${lat >= 0 ? 'N' : 'S'}`
}
function formatLng(lng) {
  const a = Math.abs(lng).toFixed(1)
  return `${a}° ${lng >= 0 ? 'E' : 'O'}`
}

function eventPct(e) {
  const el = mapBox.value
  if (!el) return null
  const rect = el.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width) * 100
  const y = ((e.clientY - rect.top) / rect.height) * 100
  return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) }
}

function onMove(e) {
  const pct = eventPct(e)
  if (!pct) return
  crosshair.value = pct
  const { lat, lng } = xyToLatLng(pct.x, pct.y)
  hover.value = { lat, lng }
}

function selectTarget(t) {
  const idx = targets.value.findIndex((x) => keyOf(x) === keyOf(t))
  if (idx >= 0) targetIndex.value = idx
  feedback.value = `Objectiu: ${t.label}`
  ok.value = false
}

function scoreHit(lat, lng, t) {
  const tol = props.exercise?.config?.tolerance || 18
  // Prefer click near pin if top/left given
  if (t.topPct != null && t.leftPct != null && mark.value) {
    const dx = mark.value.x - t.leftPct
    const dy = mark.value.y - t.topPct
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist <= 6) return true
  }
  return Math.abs(lat - t.lat) <= tol && Math.abs(lng - t.lng) <= tol
}

function advance() {
  const next = targets.value.findIndex((t) => !caught[keyOf(t)])
  targetIndex.value = next >= 0 ? next : 0
}

function onClick(e) {
  const pct = eventPct(e)
  if (!pct || !current.value) return
  mark.value = pct
  const { lat, lng } = xyToLatLng(pct.x, pct.y)
  const t = current.value
  const hit = scoreHit(lat, lng, t)
  ok.value = hit
  if (hit) {
    caught[keyOf(t)] = true
    feedback.value = `Correcte! Has localitzat ${t.sprite || ''} ${t.label}`
    emit('update:modelValue', { done: doneCount.value, last: keyOf(t) })
    if (doneCount.value >= targets.value.length) {
      emit('complete', {
        done: doneCount.value,
        _grade: {
          score: props.exercise?.maxScore || targets.value.length,
          maxScore: props.exercise?.maxScore || targets.value.length,
          feedback: `Missió completa: ${doneCount.value}/${targets.value.length}`,
        },
      })
    } else {
      advance()
    }
  } else {
    feedback.value = `Encara no. Busca prop de ${formatLat(t.lat)}, ${formatLng(t.lng)}`
  }
}
</script>

<style scoped>
.coord-lab {
  display: grid;
  gap: 0.85rem;
}
.coord-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;
}
.coord-mission {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  font-size: 1rem;
}
.coord-badge {
  display: inline-flex;
  align-items: center;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--primary) 14%, transparent);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 800;
}
.coord-sprite {
  font-size: 1.35rem;
}
.coord-progress {
  display: flex;
  gap: 0.85rem;
  align-items: center;
  font-weight: 800;
  font-size: 0.85rem;
}
.coord-toggle {
  display: inline-flex;
  gap: 0.35rem;
  align-items: center;
  font-weight: 700;
  font-size: 0.78rem;
  color: var(--text-muted);
  cursor: pointer;
}
.coord-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 220px;
  gap: 0.85rem;
}
@media (max-width: 900px) {
  .coord-layout {
    grid-template-columns: 1fr;
  }
}
.coord-map {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid var(--border-color);
  background: #0b1220;
  cursor: crosshair;
  aspect-ratio: 2 / 1;
  user-select: none;
}
.coord-map-img {
  width: 100%;
  height: 100%;
  object-fit: fill;
  display: block;
  pointer-events: none;
}
.coord-map-fallback {
  width: 100%;
  height: 100%;
  background:
    linear-gradient(#64748b33 1px, transparent 1px),
    linear-gradient(90deg, #64748b33 1px, transparent 1px),
    linear-gradient(180deg, #7dd3fc, #86efac);
  background-size: 10% 10%, 10% 10%, auto;
}
.coord-live {
  position: absolute;
  left: 0.65rem;
  top: 0.65rem;
  z-index: 5;
  background: rgba(15, 23, 42, 0.82);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 800;
  padding: 0.35rem 0.55rem;
  border-radius: 8px;
  pointer-events: none;
}
.coord-cross-h,
.coord-cross-v {
  position: absolute;
  background: rgba(244, 63, 94, 0.55);
  pointer-events: none;
  z-index: 3;
}
.coord-cross-h {
  left: 0;
  right: 0;
  height: 1px;
}
.coord-cross-v {
  top: 0;
  bottom: 0;
  width: 1px;
}
.coord-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  border: 2px solid rgba(255, 255, 255, 0.85);
  background: rgba(15, 23, 42, 0.55);
  display: grid;
  place-items: center;
  font-size: 1rem;
  cursor: pointer;
  z-index: 4;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}
.coord-pin.active {
  outline: 3px solid #fbbf24;
  z-index: 6;
}
.coord-pin.caught {
  background: rgba(16, 185, 129, 0.85);
  border-color: #ecfdf5;
}
.coord-mark {
  position: absolute;
  width: 14px;
  height: 14px;
  margin-left: -7px;
  margin-top: -7px;
  border-radius: 999px;
  background: #f43f5e;
  border: 2px solid #fff;
  z-index: 7;
  pointer-events: none;
  box-shadow: 0 0 0 4px rgba(244, 63, 94, 0.25);
}
.coord-side {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 420px;
  overflow: auto;
  padding-right: 0.15rem;
}
.coord-side-title {
  margin: 0 0 0.25rem;
  font-size: 0.9rem;
}
.coord-side-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 0.45rem;
  align-items: center;
  text-align: left;
  border: 1px solid var(--border-color);
  background: var(--bg-card);
  border-radius: 12px;
  padding: 0.45rem 0.55rem;
  cursor: pointer;
  font-family: inherit;
}
.coord-side-item.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent);
}
.coord-side-item.caught {
  border-color: var(--accent-green, #10b981);
  background: color-mix(in srgb, var(--accent-green, #10b981) 10%, var(--bg-card));
}
.coord-side-ico {
  font-size: 1.15rem;
}
.coord-side-text {
  display: grid;
  gap: 0.1rem;
  min-width: 0;
}
.coord-side-text strong {
  font-size: 0.78rem;
  line-height: 1.2;
}
.coord-side-text small {
  font-size: 0.68rem;
  color: var(--text-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.coord-side-state {
  font-size: 0.85rem;
}
</style>
