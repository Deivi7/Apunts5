<template>
  <div class="gen-lab">
    <div class="gen-toolbar">
      <div class="gen-modes">
        <button type="button" class="ex-btn" :class="{ 'ex-btn-primary': mode === 'coords' }" @click="setMode('coords')">
          ✍️ Escriure coordenades
        </button>
        <button type="button" class="ex-btn" :class="{ 'ex-btn-primary': mode === 'click' }" @click="setMode('click')">
          🏴 Caça del tresor
        </button>
      </div>
      <div class="gen-controls">
        <select v-model="difficulty" class="select-styled" @change="generate">
          <option value="easy">Fàcil (20°)</option>
          <option value="normal">Normal (10°)</option>
          <option value="hard">Difícil (0° forçat)</option>
        </select>
        <button type="button" class="ex-btn ex-btn-primary" @click="generate">🎲 Generar</button>
        <span class="gen-score">Sessió: {{ sessionScore }} · Resolts: {{ solvedTotal }}</span>
      </div>
    </div>

    <div
      ref="mapBox"
      class="gen-map"
      @click="onMapClick"
      @mousemove="onMove"
      @mouseleave="hover = null"
    >
      <img
        :src="`${IMG_BASE}/mapamundi_quadricula_buit.png`"
        class="gen-map-img"
        alt="Mapamundi amb quadrícula"
        draggable="false"
      >
      <div
        v-for="pt in visiblePins"
        :key="pt.id"
        class="gen-pin"
        :class="{ solved: pt.solved }"
        :style="{ top: pt.yPct + '%', left: pt.xPct + '%', background: pt.color }"
        :title="`${pt.name} (${pt.id})`"
      >
        <span>{{ pt.icon }}</span>
      </div>
      <div v-if="hover" class="gen-live">
        Lat {{ formatSigned(hover.latSigned, 'N', 'S') }} · Lon {{ formatSigned(hover.lonSigned, 'E', 'O') }}
      </div>
    </div>

    <div v-if="mode === 'click' && hunt" class="gen-hunt">
      <strong>Troba:</strong>
      <span class="gen-hunt-coord">{{ hunt.lat }}° {{ hunt.latDir }}, {{ hunt.lon }}° {{ hunt.lonDir }}</span>
      <p class="match-hint" style="margin: 0.35rem 0 0;">Fes clic al punt exacte a la quadrícula (±8° lat / ±12° lon).</p>
    </div>

    <div v-if="mode === 'coords'" class="gen-cards">
      <div v-for="pt in points" :key="pt.id" class="gen-card" :class="{ solved: pt.solved }">
        <div class="gen-card-head">
          <strong>{{ pt.icon }} Punt {{ pt.id }} ({{ pt.name }})</strong>
          <span class="concept-badge">{{ pt.solved ? 'Fet ✅' : 'Pendent' }}</span>
        </div>
        <div class="gen-card-row">
          <input v-model.number="answers[pt.id].lat" type="number" min="0" max="90" class="input-hub" placeholder="Lat" style="width: 70px;">
          <select v-model="answers[pt.id].latDir" class="select-styled">
            <option value="N">° N</option>
            <option value="S">° S</option>
          </select>
          <input v-model.number="answers[pt.id].lon" type="number" min="0" max="180" class="input-hub" placeholder="Lon" style="width: 70px;">
          <select v-model="answers[pt.id].lonDir" class="select-styled">
            <option value="E">° E</option>
            <option value="O">° O</option>
          </select>
          <button type="button" class="ex-btn ex-btn-primary" :disabled="pt.solved" @click="checkCoords(pt)">Comprovar</button>
        </div>
        <p v-if="fb[pt.id]" class="feedback-msg" :class="pt.solved ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.35rem;">{{ fb[pt.id] }}</p>
      </div>
    </div>

    <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>

    <hr class="gen-sep">

    <h4 style="margin: 0 0 0.5rem;">Fitxa oficial Punts A–E</h4>
    <div class="ae-wrap">
      <img
        :src="`${IMG_BASE}/mapamundi_quadricula_punts.png`"
        alt="Mapamundi amb punts A–E"
        class="ae-img"
      >
      <div class="ae-forms">
        <div v-for="pt in POINTS_AE" :key="pt.id" class="ae-row">
          <strong>Punt {{ pt.label }}</strong>
          <input v-model="ae[pt.id].lat" type="text" class="input-hub" placeholder="ex. 50S" style="width: 80px;">
          <input v-model="ae[pt.id].lon" type="text" class="input-hub" placeholder="ex. 40O" style="width: 80px;">
          <button type="button" class="ex-btn" @click="checkAE(pt)">Comprovar</button>
          <span v-if="aeFb[pt.id]" :class="aeOk[pt.id] ? 'feedback-ok' : 'feedback-bad'" style="font-size: 0.8rem; font-weight: 700;">{{ aeFb[pt.id] }}</span>
        </div>
      </div>
    </div>

    <hr class="gen-sep">

    <h4 style="margin: 0 0 0.5rem;">Esfera terrestre 3D (referència)</h4>
    <div class="esfera-panel">
      <img
        :src="`${IMG_BASE}/esfera_coordenades_punts.png`"
        alt="Esfera terrestre amb punts A–E"
        class="esfera-img"
      >
      <ul class="esfera-legend">
        <li v-for="pt in POINTS_AE" :key="'leg-' + pt.id">
          <strong>{{ pt.label }}:</strong> {{ pt.expLat }} / {{ pt.expLon }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import {
  IMG_BASE,
  POINTS_AE,
  RANDOM_POINT_ICONS,
  checkPointCoordString,
  gridLonLatToPct,
  gridPctToLonLat,
  signedLat,
  signedLon,
} from '@/modules/projecte/coordenadasData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const mode = ref('coords')
const difficulty = ref('normal')
const points = ref([])
const answers = reactive({})
const fb = reactive({})
const sessionScore = ref(0)
const solvedTotal = ref(0)
const feedback = ref('')
const ok = ref(false)
const hover = ref(null)
const mapBox = ref(null)
const hunt = computed(() => (mode.value === 'click' ? points.value[0] : null))

const ae = reactive(Object.fromEntries(POINTS_AE.map((p) => [p.id, { lat: '', lon: '' }])))
const aeFb = reactive({})
const aeOk = reactive({})

const visiblePins = computed(() => {
  if (mode.value === 'click') {
    return points.value.filter((p) => p.solved).map(withPct)
  }
  return points.value.map(withPct)
})

function withPct(pt) {
  const latS = signedLat(pt.lat, pt.latDir)
  const lonS = signedLon(pt.lon, pt.lonDir)
  const { x, y } = gridLonLatToPct(latS, lonS)
  return { ...pt, xPct: x, yPct: y }
}

function setMode(m) {
  mode.value = m
  generate()
}

function generate() {
  feedback.value = ''
  const step = difficulty.value === 'easy' ? 20 : 10
  const count = mode.value === 'coords' ? 3 : 1
  const used = new Set()
  const next = []
  for (let i = 0; i < count; i++) {
    let lat = 0
    let latDir = 'N'
    let lon = 0
    let lonDir = 'E'
    for (let attempt = 0; attempt < 50; attempt++) {
      lat = Math.floor(Math.random() * (70 / step)) * step
      latDir = lat === 0 ? 'N' : (Math.random() > 0.5 ? 'N' : 'S')
      lon = Math.floor(Math.random() * (160 / step)) * step
      lonDir = lon === 0 ? 'E' : (Math.random() > 0.5 ? 'E' : 'O')
      if (difficulty.value === 'hard' && i === 0 && Math.random() > 0.5) {
        if (Math.random() > 0.5) { lat = 0; latDir = 'N' }
        else { lon = 0; lonDir = 'E' }
      }
      const key = `${lat}${latDir}_${lon}${lonDir}`
      if (!used.has(key)) {
        used.add(key)
        break
      }
    }
    const iconData = RANDOM_POINT_ICONS[i % RANDOM_POINT_ICONS.length]
    const id = String.fromCharCode(65 + i)
    next.push({
      id, lat, latDir, lon, lonDir,
      icon: iconData.icon, color: iconData.color, name: iconData.name, solved: false,
    })
    answers[id] = { lat: null, latDir: 'N', lon: null, lonDir: 'E' }
    fb[id] = ''
  }
  points.value = next
}

function checkCoords(pt) {
  const a = answers[pt.id]
  const latOk = Number(a.lat) === pt.lat && a.latDir === pt.latDir
  const lonOk = Number(a.lon) === pt.lon && (pt.lon === 0 || a.lonDir === pt.lonDir)
  if (latOk && lonOk) {
    pt.solved = true
    fb[pt.id] = '✅ Correcte!'
    sessionScore.value += 10
    solvedTotal.value += 1
    maybeComplete()
  } else {
    fb[pt.id] = `❌ Era ${pt.lat}° ${pt.latDir}, ${pt.lon}° ${pt.lonDir}`
  }
}

function onMapClick(e) {
  if (mode.value !== 'click' || !hunt.value || hunt.value.solved) return
  const el = mapBox.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const xPct = ((e.clientX - r.left) / r.width) * 100
  const yPct = ((e.clientY - r.top) / r.height) * 100
  const { latSigned, lonSigned } = gridPctToLonLat(xPct, yPct)
  const targetLat = signedLat(hunt.value.lat, hunt.value.latDir)
  const targetLon = signedLon(hunt.value.lon, hunt.value.lonDir)
  const latOk = Math.abs(latSigned - targetLat) <= 8
  const lonOk = Math.abs(lonSigned - targetLon) <= 12
  if (latOk && lonOk) {
    hunt.value.solved = true
    ok.value = true
    feedback.value = `🏴 ¡Tresor trobat! ${hunt.value.lat}° ${hunt.value.latDir}, ${hunt.value.lon}° ${hunt.value.lonDir}`
    sessionScore.value += 15
    solvedTotal.value += 1
    maybeComplete()
  } else {
    ok.value = false
    feedback.value = `❌ Has marcat ~${formatSigned(latSigned, 'N', 'S')}, ${formatSigned(lonSigned, 'E', 'O')}. Prova una altra vegada.`
  }
}

function onMove(e) {
  const el = mapBox.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const xPct = ((e.clientX - r.left) / r.width) * 100
  const yPct = ((e.clientY - r.top) / r.height) * 100
  hover.value = gridPctToLonLat(xPct, yPct)
}

function formatSigned(v, pos, neg) {
  const a = Math.abs(v)
  return `${a}° ${v >= 0 ? pos : neg}`
}

function checkAE(pt) {
  const latOk = checkPointCoordString(ae[pt.id].lat, pt.expLat)
  const lonOk = checkPointCoordString(ae[pt.id].lon, pt.expLon)
  aeOk[pt.id] = latOk && lonOk
  aeFb[pt.id] = aeOk[pt.id] ? '✅' : `❌ ${pt.expLat} / ${pt.expLon}`
  if (Object.values(aeOk).filter(Boolean).length === POINTS_AE.length) {
    maybeComplete(true)
  }
}

function maybeComplete(force) {
  const max = props.exercise?.maxScore || 10
  emit('update:modelValue', { sessionScore: sessionScore.value, solvedTotal: solvedTotal.value })
  if (force || solvedTotal.value >= max) {
    emit('complete', {
      sessionScore: sessionScore.value,
      _grade: { score: Math.min(max, solvedTotal.value), maxScore: max, feedback: `Generador: ${solvedTotal.value} punts` },
    })
  }
}

generate()
</script>

<style scoped>
.gen-lab { display: grid; gap: 0.85rem; }
.gen-toolbar { display: flex; flex-wrap: wrap; gap: 0.75rem; justify-content: space-between; align-items: center; }
.gen-modes, .gen-controls { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.gen-score { font-size: 0.82rem; font-weight: 700; color: var(--text-muted); }
.gen-map {
  position: relative; border-radius: 12px; overflow: hidden;
  border: 1px solid var(--border-color); cursor: crosshair; background: #0b1220;
}
.gen-map-img { width: 100%; display: block; pointer-events: none; }
.gen-pin {
  position: absolute; width: 34px; height: 34px; margin: -17px 0 0 -17px;
  border-radius: 50%; display: grid; place-items: center; border: 2px solid #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.35); font-size: 1rem; z-index: 2;
}
.gen-pin.solved { outline: 3px solid #10b981; }
.gen-live {
  position: absolute; top: 0.5rem; left: 0.5rem; z-index: 3;
  background: rgba(15,23,42,0.85); color: #e2e8f0; font-size: 0.75rem;
  font-weight: 700; padding: 0.2rem 0.45rem; border-radius: 6px;
}
.gen-hunt {
  padding: 0.75rem 1rem; border-radius: 10px; border: 1px solid var(--border-color);
  background: var(--bg-card);
}
.gen-hunt-coord { color: #2563eb; font-weight: 900; margin-left: 0.35rem; }
.gen-cards { display: grid; gap: 0.65rem; }
.gen-card {
  border: 1px solid var(--border-color); border-radius: 10px; padding: 0.75rem;
  background: var(--bg-card);
}
.gen-card.solved { border-color: #10b981; }
.gen-card-head { display: flex; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.45rem; }
.gen-card-row { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.concept-badge {
  font-size: 0.72rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 999px;
  background: rgba(245,158,11,0.15); color: #b45309;
}
.select-styled {
  padding: 0.35rem 0.45rem; border-radius: 8px; border: 1px solid var(--border-color);
  background: var(--bg-main); color: inherit; font-weight: 700;
}
.gen-sep { border: none; border-top: 1px dashed var(--border-color); margin: 0.5rem 0; }
.ae-wrap { display: grid; grid-template-columns: 1.2fr 1fr; gap: 1rem; }
@media (max-width: 900px) { .ae-wrap { grid-template-columns: 1fr; } }
.ae-img { width: 100%; border-radius: 10px; border: 1px solid var(--border-color); }
.ae-forms { display: grid; gap: 0.5rem; align-content: start; }
.ae-row { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.esfera-panel { display: grid; grid-template-columns: 1.4fr 1fr; gap: 1rem; align-items: start; }
@media (max-width: 900px) { .esfera-panel { grid-template-columns: 1fr; } }
.esfera-img { width: 100%; border-radius: 10px; border: 1px solid var(--border-color); }
.esfera-legend { margin: 0; padding-left: 1.1rem; line-height: 1.7; font-size: 0.9rem; }
</style>
