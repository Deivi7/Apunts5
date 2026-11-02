<template>
  <div class="const-lab">
    <div class="const-hud">
      <div>
        <span class="match-hint">Coordenada actual</span>
        <div class="const-target">{{ targetLabel }}</div>
      </div>
      <div class="const-progress">
        Punt <strong>{{ step }}</strong> de {{ total }}
      </div>
    </div>

    <div class="const-canvas-wrap">
      <canvas
        ref="canvasEl"
        width="1000"
        height="500"
        @click="onClick"
      />
    </div>

    <p class="const-status" :style="{ color: statusColor }" v-html="statusHtml" />

    <div class="const-actions">
      <button type="button" class="ex-btn" @click="showHint">💡 Pista radar</button>
      <button type="button" class="ex-btn" @click="stepNext">⏭ Auto punt</button>
      <button type="button" class="ex-btn" @click="autoPlay">▶ Auto contínuo</button>
      <button type="button" class="ex-btn" @click="reset">↺ Reiniciar</button>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { PIKACHU_COORDS, signedLat, signedLon } from '@/modules/projecte/coordenadasData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const M = { left: 60, right: 45, top: 40, bottom: 40 }
const total = PIKACHU_COORDS.length
const step = ref(0)
const canvasEl = ref(null)
const showRadarHint = ref(false)
const statusHtml = ref('🎮 Mou el cursor i fes clic a la coordenada indicada (múltiples de 10°).')
const statusColor = ref('var(--text-main)')
let hintTimer = null
let autoTimer = null

const targetLabel = computed(() => {
  if (step.value >= total) return '✅ Traç complet!'
  const p = PIKACHU_COORDS[step.value]
  return `${p.id}: ${p.lat}° ${p.latDir}, ${p.lon}° ${p.lonDir}`
})

function gridBox(w, h) {
  return {
    x: M.left,
    y: M.top,
    width: w - M.left - M.right,
    height: h - M.top - M.bottom,
  }
}

function coordToCanvas(c, w, h) {
  const grid = gridBox(w, h)
  const lonS = signedLon(c.lon, c.lonDir)
  const latS = signedLat(c.lat, c.latDir)
  return {
    x: grid.x + ((lonS + 180) / 360) * grid.width,
    y: grid.y + ((90 - latS) / 180) * grid.height,
  }
}

function canvasToCoord(px, py, w, h) {
  const grid = gridBox(w, h)
  const cx = Math.max(grid.x, Math.min(grid.x + grid.width, px))
  const cy = Math.max(grid.y, Math.min(grid.y + grid.height, py))
  const lonSigned = ((cx - grid.x) / grid.width) * 360 - 180
  const latSigned = 90 - ((cy - grid.y) / grid.height) * 180
  return {
    lat: Math.round(latSigned),
    lon: Math.round(lonSigned),
    latSigned,
    lonSigned,
  }
}

function draw() {
  const canvas = canvasEl.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const w = canvas.width
  const h = canvas.height
  const grid = gridBox(w, h)

  ctx.fillStyle = '#060a14'
  ctx.fillRect(0, 0, w, h)

  // faint continents
  ctx.fillStyle = 'rgba(56, 189, 248, 0.05)'
  ;[
    [0.22, 0.28, 0.12, 0.16],
    [0.30, 0.62, 0.08, 0.18],
    [0.55, 0.28, 0.08, 0.10],
    [0.72, 0.32, 0.16, 0.18],
    [0.55, 0.52, 0.10, 0.16],
    [0.85, 0.62, 0.08, 0.08],
    [0.50, 0.88, 0.28, 0.05],
  ].forEach(([fx, fy, rw, rh]) => {
    ctx.beginPath()
    ctx.ellipse(grid.x + grid.width * fx, grid.y + grid.height * fy, grid.width * rw, grid.height * rh, 0, 0, Math.PI * 2)
    ctx.fill()
  })

  for (let lon = -180; lon <= 180; lon += 10) {
    const x = grid.x + ((lon + 180) / 360) * grid.width
    const major = lon % 20 === 0
    ctx.lineWidth = major ? 1.2 : 0.6
    ctx.strokeStyle = major ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.12)'
    ctx.beginPath()
    ctx.moveTo(x, grid.y)
    ctx.lineTo(x, grid.y + grid.height)
    ctx.stroke()
    if (major) {
      ctx.fillStyle = 'rgba(226,232,240,0.7)'
      ctx.font = '10px monospace'
      ctx.textAlign = 'center'
      ctx.fillText(String(lon), x, grid.y + grid.height + 14)
    }
  }
  for (let lat = -90; lat <= 90; lat += 10) {
    const y = grid.y + ((90 - lat) / 180) * grid.height
    const major = lat % 20 === 0
    ctx.lineWidth = major ? 1.2 : 0.6
    ctx.strokeStyle = major ? 'rgba(148,163,184,0.35)' : 'rgba(148,163,184,0.12)'
    ctx.beginPath()
    ctx.moveTo(grid.x, y)
    ctx.lineTo(grid.x + grid.width, y)
    ctx.stroke()
    if (major) {
      ctx.fillStyle = 'rgba(226,232,240,0.7)'
      ctx.font = '10px monospace'
      ctx.textAlign = 'right'
      ctx.fillText(String(lat), grid.x - 6, y + 3)
    }
  }

  // Equator / Greenwich
  const eqY = grid.y + ((90 - 0) / 180) * grid.height
  const grX = grid.x + ((0 + 180) / 360) * grid.width
  ctx.strokeStyle = '#38bdf8'
  ctx.lineWidth = 1.5
  ctx.beginPath(); ctx.moveTo(grid.x, eqY); ctx.lineTo(grid.x + grid.width, eqY); ctx.stroke()
  ctx.strokeStyle = '#f87171'
  ctx.beginPath(); ctx.moveTo(grX, grid.y); ctx.lineTo(grX, grid.y + grid.height); ctx.stroke()

  // lines + points
  if (step.value > 0) {
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2.5
    ctx.shadowColor = '#f59e0b'
    ctx.shadowBlur = 8
    ctx.beginPath()
    for (let i = 0; i < step.value; i++) {
      const pt = coordToCanvas(PIKACHU_COORDS[i], w, h)
      if (i === 0 || PIKACHU_COORDS[i].id === 'B01') {
        ctx.stroke()
        ctx.beginPath()
        ctx.moveTo(pt.x, pt.y)
      } else {
        ctx.lineTo(pt.x, pt.y)
      }
    }
    ctx.stroke()
    ctx.shadowBlur = 0

    for (let i = 0; i < step.value; i++) {
      const pt = coordToCanvas(PIKACHU_COORDS[i], w, h)
      const isLast = i === step.value - 1
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, isLast ? 7 : 4.5, 0, Math.PI * 2)
      ctx.fillStyle = isLast ? '#ef4444' : '#fbbf24'
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.fillStyle = '#f8fafc'
      ctx.font = 'bold 9px monospace'
      ctx.textAlign = 'left'
      ctx.fillText(PIKACHU_COORDS[i].id, pt.x + 8, pt.y - 4)
    }
  }

  if (showRadarHint.value && step.value < total) {
    const targetPt = coordToCanvas(PIKACHU_COORDS[step.value], w, h)
    ctx.strokeStyle = '#fbbf24'
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(targetPt.x, targetPt.y, 28, 0, Math.PI * 2)
    ctx.stroke()
    ctx.fillStyle = 'rgba(251,191,36,0.15)'
    ctx.fill()
    ctx.fillStyle = '#fbbf24'
    ctx.font = 'bold 11px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('🎯 FES CLIC AQUÍ', targetPt.x, targetPt.y - 34)
  }
}

function onClick(e) {
  if (step.value >= total) return
  const canvas = canvasEl.value
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const px = (e.clientX - rect.left) * scaleX
  const py = (e.clientY - rect.top) * scaleY
  const clicked = canvasToCoord(px, py, canvas.width, canvas.height)
  const target = PIKACHU_COORDS[step.value]
  const targetLat = signedLat(target.lat, target.latDir)
  const targetLon = signedLon(target.lon, target.lonDir)
  const distLat = Math.abs(clicked.latSigned - targetLat)
  const distLon = Math.abs(clicked.lonSigned - targetLon)
  const snappedLat = Math.round(clicked.latSigned / 10) * 10
  const snappedLon = Math.round(clicked.lonSigned / 10) * 10
  const isMatch = (snappedLat === targetLat && snappedLon === targetLon)
    || (distLat <= 6.5 && distLon <= 7.5)

  if (isMatch) {
    step.value += 1
    showRadarHint.value = false
    statusColor.value = '#10b981'
    statusHtml.value = `🌟 ¡Excel·lent! Has situat <strong>${target.id} (${target.lat}° ${target.latDir}, ${target.lon}° ${target.lonDir})</strong>!`
    emit('update:modelValue', { step: step.value })
    if (step.value >= total) {
      statusColor.value = '#fbbf24'
      statusHtml.value = '⚡ <strong>¡INCREÏBLE!</strong> Has revelat el rostre de Pikachu amb 23 coordenades!'
      const max = props.exercise?.maxScore || 23
      emit('complete', {
        step: step.value,
        _grade: { score: max, maxScore: max, feedback: 'Constel·lació Pikachu completa' },
      })
    }
    draw()
  } else {
    const latStr = clicked.lat >= 0 ? `${clicked.lat}° N` : `${Math.abs(clicked.lat)}° S`
    const lonStr = clicked.lon >= 0 ? `${clicked.lon}° E` : `${Math.abs(clicked.lon)}° O`
    let advice = `Has clicat a (${latStr}, ${lonStr}). Cap a ${target.id}: `
    if (targetLat > clicked.latSigned + 3) advice += 'Més NORD ⬆️. '
    else if (targetLat < clicked.latSigned - 3) advice += 'Més SUD ⬇️. '
    if (targetLon > clicked.lonSigned + 3) advice += 'Més EST ➡️.'
    else if (targetLon < clicked.lonSigned - 3) advice += 'Més OEST ⬅️.'
    statusColor.value = '#ef4444'
    statusHtml.value = `❌ ${advice}`
  }
}

function showHint() {
  showRadarHint.value = true
  draw()
  clearTimeout(hintTimer)
  hintTimer = setTimeout(() => {
    showRadarHint.value = false
    draw()
  }, 6000)
}

function stepNext() {
  if (step.value >= total) return
  step.value += 1
  draw()
  if (step.value >= total) {
    const max = props.exercise?.maxScore || 23
    emit('complete', {
      step: step.value,
      _grade: { score: max, maxScore: max, feedback: 'Constel·lació completa (auto)' },
    })
  }
}

function reset() {
  clearInterval(autoTimer)
  showRadarHint.value = false
  step.value = 0
  statusHtml.value = '⚡ Traça els punts fent clic sobre el mapa!'
  statusColor.value = 'var(--text-main)'
  draw()
}

function autoPlay() {
  reset()
  autoTimer = setInterval(() => {
    if (step.value < total) stepNext()
    else clearInterval(autoTimer)
  }, 300)
}

onMounted(() => {
  draw()
  window.addEventListener('resize', draw)
})
onUnmounted(() => {
  clearTimeout(hintTimer)
  clearInterval(autoTimer)
  window.removeEventListener('resize', draw)
})
watch(step, draw)
</script>

<style scoped>
.const-lab { display: grid; gap: 0.75rem; }
.const-hud {
  display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; align-items: end;
}
.const-target {
  font-size: 1.15rem; font-weight: 900; color: #fbbf24;
  background: #0f172a; padding: 0.35rem 0.85rem; border-radius: 8px;
  border: 2px solid #f59e0b; display: inline-block; margin-top: 0.2rem;
}
.const-progress { font-size: 1.05rem; font-weight: 800; }
.const-canvas-wrap {
  border-radius: 12px; overflow: hidden; border: 1px solid #1e293b;
  background: #060a14;
}
.const-canvas-wrap canvas {
  width: 100%; height: auto; display: block; cursor: crosshair;
}
.const-status { margin: 0; font-size: 0.92rem; font-weight: 700; min-height: 1.4em; }
.const-actions { display: flex; flex-wrap: wrap; gap: 0.4rem; }
</style>
