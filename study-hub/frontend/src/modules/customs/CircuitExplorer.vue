<template>
  <div class="comm-circuit" style="margin: 0;">
    <div style="text-align: center; max-width: 650px; margin: 0 auto 1.5rem;">
      <span class="badge-pill">💡 Haz clic en cada elemento para explorar su rol</span>
      <h3 style="font-size: 1.3rem; margin-top: 0.5rem;">Los 6 Elementos Imprescindibles</h3>
    </div>

    <div class="circuit-grid">
      <button
        v-for="(item, key) in details"
        :key="key"
        type="button"
        class="circuit-node"
        :class="{ active: active === key }"
        @click="select(key)"
      >
        <div class="circuit-icon">{{ item.icon }}</div>
        <div class="circuit-title">{{ item.label }}</div>
        <div class="circuit-desc">{{ shortDesc(key) }}</div>
      </button>
    </div>

    <div class="comm-interactive-box">
      <div>
        <span style="font-weight: 800; color: var(--primary); font-size: 0.85rem;">{{ current.tag }}</span>
        <h4 style="font-size: 1.15rem; margin-top: 0.2rem;">{{ current.title }}</h4>
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-top: 0.3rem;">{{ current.desc }}</p>
      </div>
      <button type="button" class="btn-primary" @click="exploredAll && emitComplete()">
        {{ exploredAll ? '✅ Circuito explorado' : `Explorados ${explored.size}/6` }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { CIRCUIT_DETAILS } from '@/modules/castellano/comunicacionData.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const details = CIRCUIT_DETAILS
const active = ref('emisor')
const explored = reactive(new Set(['emisor']))
const done = ref(false)

const current = computed(() => details[active.value])
const exploredAll = computed(() => explored.size >= 6)

const SHORT = {
  emisor: 'Es quien transmite la información o elabora el mensaje.',
  receptor: 'Es quien recibe y descodifica la información.',
  mensaje: 'Es el contenido o información concreta que se transmite.',
  codigo: 'Sistema de signos y reglas conocido por ambos.',
  canal: 'Medio físico por el que viaja el mensaje.',
  contexto: 'Circunstancias de lugar y tiempo que rodean el acto.',
}

function shortDesc(key) {
  return SHORT[key] || ''
}

function select(key) {
  active.value = key
  explored.add(key)
  emit('update:modelValue', { active: key, explored: [...explored] })
  if (exploredAll.value) emitComplete()
}

function emitComplete() {
  if (done.value) return
  done.value = true
  const max = props.exercise?.maxScore || 6
  emit('complete', {
    explored: [...explored],
    _grade: { score: max, maxScore: max, feedback: 'Has explorado los 6 elementos del circuito' },
  })
}
</script>
