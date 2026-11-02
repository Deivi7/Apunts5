<template>
  <div class="radar-lab">
    <div class="radar-toolbar">
      <p class="match-hint" style="margin: 0;">
        Selecciona un Pokémon a la llista o al mapa. Després escriu latitud, longitud i ubicació (±6°) i captura.
      </p>
      <span class="coord-badge">✅ {{ caughtCount }}/{{ pokemons.length }}</span>
    </div>

    <div class="radar-layout">
      <div
        ref="mapBox"
        class="radar-map"
        @mousemove="onMove"
        @mouseleave="hover = null"
      >
        <img
          :src="`${IMG_BASE}/mapa_pokemon_team_rocket_fixed.png`"
          class="radar-map-img"
          alt="Mapa Team Rocket"
          draggable="false"
        >
        <div v-if="showLive && hover" class="radar-live">
          Lat {{ formatLat(hover.lat) }} · Lon {{ formatLng(hover.lng) }}
        </div>
        <div v-if="crosshair" class="radar-cross-h" :style="{ top: crosshair.y + '%' }" />
        <div v-if="crosshair" class="radar-cross-v" :style="{ left: crosshair.x + '%' }" />

        <!-- Hitboxes invisibles: només seleccionen -->
        <button
          v-for="p in pokemons"
          :key="'hb-' + p.id"
          type="button"
          class="radar-hitbox"
          :class="{ active: p.id === selectedId, caught: !!caught[p.id] }"
          :style="{ top: p.topPct + '%', left: p.leftPct + '%' }"
          :title="p.name"
          :aria-label="'Seleccionar ' + p.name"
          @click="selectPokemon(p.id)"
        />

        <div
          v-if="selected && !caught[selected.id]"
          class="radar-arrow"
          :style="{ top: selected.topPct + '%', left: selected.leftPct + '%' }"
        >
          ⬇️
        </div>
      </div>

      <aside class="radar-side">
        <h4 class="radar-side-title">Pokémon segrestats</h4>
        <button
          v-for="p in pokemons"
          :key="p.id"
          type="button"
          class="radar-side-item"
          :class="{ active: p.id === selectedId, caught: !!caught[p.id] }"
          @click="selectPokemon(p.id)"
        >
          <span class="radar-side-ico">{{ p.sprite }}</span>
          <span class="radar-side-text">
            <strong>{{ p.name }}</strong>
            <small>{{ p.locName }}</small>
          </span>
          <span>{{ caught[p.id] ? '✅' : '⏳' }}</span>
        </button>
        <label class="radar-toggle">
          <input v-model="showLive" type="checkbox">
          Coordenades en viu
        </label>
      </aside>
    </div>

    <div v-if="selected" class="radar-form card-like">
      <h4 style="margin: 0 0 0.5rem;">
        {{ selected.sprite }} Missió: {{ selected.name }}
      </h4>
      <p class="match-hint" style="margin: 0 0 0.75rem;">
        Escriu les coordenades (marge ±6°) i el continent/oceà. El clic al mapa només selecciona.
      </p>
      <div class="radar-form-row">
        <label>
          Latitud
          <input v-model.number="form.latDeg" type="number" min="0" max="90" step="0.5" class="input-hub" placeholder="ex. 45">
        </label>
        <select v-model="form.latDir" class="select-styled">
          <option value="N">° N</option>
          <option value="S">° S</option>
        </select>
        <label>
          Longitud
          <input v-model.number="form.lonDeg" type="number" min="0" max="180" step="0.5" class="input-hub" placeholder="ex. 105">
        </label>
        <select v-model="form.lonDir" class="select-styled">
          <option value="E">° E</option>
          <option value="O">° O</option>
        </select>
        <label class="radar-loc">
          Ubicació
          <select v-model="form.loc" class="select-styled">
            <option value="">— Tria —</option>
            <option v-for="o in LOCATION_OPTIONS" :key="o.value" :value="o.value">{{ o.label }}</option>
          </select>
        </label>
        <button type="button" class="ex-btn ex-btn-primary" :disabled="!!caught[selected.id]" @click="capture">
          🎯 Verificar i capturar
        </button>
      </div>
      <p v-if="feedback" class="feedback-msg" :class="ok ? 'feedback-ok' : 'feedback-bad'">{{ feedback }}</p>
    </div>

    <div v-if="modalOpen" class="radar-modal" @click.self="modalOpen = false">
      <div class="radar-modal-card">
        <div style="font-size: 2.5rem;">{{ lastCaught?.sprite }}</div>
        <h3 style="margin: 0.25rem 0;">¡Capturat!</h3>
        <p style="margin: 0;">{{ lastCaught?.name }} — +50 XP</p>
        <button type="button" class="ex-btn ex-btn-primary" style="margin-top: 0.75rem;" @click="modalOpen = false">
          Continuar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import {
  IMG_BASE,
  LOCATION_OPTIONS,
  POKEMONS,
  validatePokemonCapture,
} from '@/modules/projecte/coordenadasData.js'

const props = defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['update:modelValue', 'complete'])

const pokemons = POKEMONS
const caught = reactive({})
const selectedId = ref(pokemons[0]?.id || null)
const form = reactive({ latDeg: null, latDir: 'N', lonDeg: null, lonDir: 'E', loc: '' })
const feedback = ref('')
const ok = ref(false)
const showLive = ref(true)
const hover = ref(null)
const crosshair = ref(null)
const mapBox = ref(null)
const modalOpen = ref(false)
const lastCaught = ref(null)

const selected = computed(() => pokemons.find((p) => p.id === selectedId.value) || null)
const caughtCount = computed(() => Object.keys(caught).filter((k) => caught[k]).length)

function selectPokemon(id) {
  selectedId.value = id
  feedback.value = ''
  ok.value = false
  form.latDeg = null
  form.lonDeg = null
  form.loc = ''
}

function pctToLatLng(xPct, yPct) {
  // Proyección aproximada Robinson → equirectangular del mapa Team Rocket
  const lat = 90 - (yPct / 100) * 180
  const lng = (xPct / 100) * 360 - 180
  return { lat, lng }
}

function onMove(e) {
  const el = mapBox.value
  if (!el) return
  const r = el.getBoundingClientRect()
  const x = ((e.clientX - r.left) / r.width) * 100
  const y = ((e.clientY - r.top) / r.height) * 100
  crosshair.value = { x, y }
  hover.value = pctToLatLng(x, y)
}

function formatLat(lat) {
  const a = Math.abs(lat).toFixed(1)
  return `${a}° ${lat >= 0 ? 'N' : 'S'}`
}
function formatLng(lng) {
  const a = Math.abs(lng).toFixed(1)
  return `${a}° ${lng >= 0 ? 'E' : 'O'}`
}

function capture() {
  const poke = selected.value
  if (!poke || caught[poke.id]) return
  const result = validatePokemonCapture(poke, {
    latDeg: Number(form.latDeg),
    latDir: form.latDir,
    lonDeg: Number(form.lonDeg),
    lonDir: form.lonDir,
    loc: form.loc,
  })
  ok.value = result.ok
  if (!result.ok) {
    feedback.value = result.hint
    return
  }
  caught[poke.id] = true
  feedback.value = `✅ ¡${poke.name} capturat!`
  lastCaught.value = poke
  modalOpen.value = true
  emit('update:modelValue', { caught: { ...caught }, count: caughtCount.value })
  if (caughtCount.value >= pokemons.length) {
    const max = props.exercise?.maxScore || 10
    emit('complete', {
      caught: { ...caught },
      _grade: { score: max, maxScore: max, feedback: `Radar: ${caughtCount.value}/10 Pokémon` },
    })
  } else {
    const next = pokemons.find((p) => !caught[p.id])
    if (next) selectPokemon(next.id)
  }
}

watch(selectedId, () => {
  form.latDeg = null
  form.lonDeg = null
  form.loc = ''
})
</script>

<style scoped>
.radar-lab { display: grid; gap: 1rem; }
.radar-toolbar { display: flex; justify-content: space-between; gap: 1rem; align-items: center; flex-wrap: wrap; }
.radar-layout { display: grid; grid-template-columns: 1fr minmax(200px, 260px); gap: 1rem; }
@media (max-width: 900px) { .radar-layout { grid-template-columns: 1fr; } }
.radar-map {
  position: relative; border-radius: 12px; overflow: hidden;
  border: 1px solid var(--border-color); background: #0f172a; aspect-ratio: 16/10;
  cursor: crosshair; user-select: none;
}
.radar-map-img { width: 100%; height: 100%; object-fit: fill; display: block; pointer-events: none; }
.radar-live {
  position: absolute; top: 0.5rem; left: 0.5rem; z-index: 4;
  background: rgba(15, 23, 42, 0.85); color: #e2e8f0; font-size: 0.78rem;
  font-weight: 700; padding: 0.25rem 0.5rem; border-radius: 6px;
}
.radar-cross-h, .radar-cross-v {
  position: absolute; pointer-events: none; z-index: 2;
  background: rgba(56, 189, 248, 0.45);
}
.radar-cross-h { left: 0; right: 0; height: 1px; transform: translateY(-50%); }
.radar-cross-v { top: 0; bottom: 0; width: 1px; transform: translateX(-50%); }
.radar-hitbox {
  position: absolute; width: 44px; height: 44px; margin: -22px 0 0 -22px;
  border: 2px solid transparent; border-radius: 50%; background: transparent;
  cursor: pointer; z-index: 3; padding: 0;
}
.radar-hitbox.active { border-color: #fbbf24; box-shadow: 0 0 0 3px rgba(251, 191, 36, 0.35); }
.radar-hitbox.caught { border-color: #10b981; opacity: 0.5; }
.radar-arrow {
  position: absolute; z-index: 5; transform: translate(-50%, -140%);
  font-size: 1.4rem; animation: bounce 0.9s ease-in-out infinite; pointer-events: none;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.5));
}
@keyframes bounce {
  0%, 100% { transform: translate(-50%, -140%); }
  50% { transform: translate(-50%, -110%); }
}
.radar-side {
  display: flex; flex-direction: column; gap: 0.4rem;
  max-height: 420px; overflow: auto; padding-right: 0.25rem;
}
.radar-side-title { margin: 0 0 0.35rem; font-size: 0.95rem; }
.radar-side-item {
  display: flex; align-items: center; gap: 0.5rem; text-align: left;
  padding: 0.45rem 0.55rem; border-radius: 8px; border: 1px solid var(--border-color);
  background: var(--bg-card); cursor: pointer; color: inherit;
}
.radar-side-item.active { border-color: #f59e0b; background: rgba(245, 158, 11, 0.08); }
.radar-side-item.caught { opacity: 0.65; }
.radar-side-ico { font-size: 1.2rem; }
.radar-side-text { flex: 1; display: flex; flex-direction: column; gap: 0.1rem; }
.radar-side-text small { color: var(--text-muted); font-size: 0.72rem; }
.radar-toggle { display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; margin-top: 0.5rem; }
.radar-form.card-like {
  border: 1px solid var(--border-color); border-radius: 12px; padding: 1rem;
  background: var(--bg-card);
}
.radar-form-row {
  display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: flex-end;
}
.radar-form-row label { display: grid; gap: 0.25rem; font-size: 0.78rem; font-weight: 700; }
.radar-form-row .input-hub { width: 80px; }
.radar-loc { min-width: 220px; flex: 1; }
.radar-loc .select-styled { width: 100%; }
.select-styled {
  padding: 0.4rem 0.5rem; border-radius: 8px; border: 1px solid var(--border-color);
  background: var(--bg-main); color: inherit; font-weight: 700;
}
.radar-modal {
  position: fixed; inset: 0; z-index: 80; background: rgba(0,0,0,0.45);
  display: grid; place-items: center; padding: 1rem;
}
.radar-modal-card {
  background: var(--bg-card); border-radius: 16px; padding: 1.5rem 2rem;
  text-align: center; border: 2px solid #f59e0b; max-width: 360px;
}
.coord-badge {
  display: inline-flex; padding: 0.25rem 0.65rem; border-radius: 999px;
  background: rgba(16, 185, 129, 0.15); color: #059669; font-weight: 800; font-size: 0.85rem;
}
</style>
