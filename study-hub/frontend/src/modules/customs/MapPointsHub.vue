<template>
  <div class="mph-lab">
    <div class="mph-switcher">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        type="button"
        class="ex-btn"
        :class="{ 'ex-btn-primary': active === tab.id }"
        @click="active = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <CoordGridGenerator
      v-if="active === 'generator' || active === 'ae' || active === 'esfera'"
      :exercise="exercise"
      @complete="onComplete"
      @update:modelValue="(v) => emit('update:modelValue', v)"
    />
    <ContinentsOceansLab
      v-else-if="active === 'continents'"
      :exercise="exercise"
      @complete="onComplete"
      @update:modelValue="(v) => emit('update:modelValue', v)"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CoordGridGenerator from './CoordGridGenerator.vue'
import ContinentsOceansLab from './ContinentsOceansLab.vue'

defineProps({ exercise: Object, modelValue: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const tabs = [
  { id: 'generator', label: '🎲 Generador' },
  { id: 'ae', label: '📍 Punts A–E' },
  { id: 'continents', label: '🌍 Continents' },
  { id: 'esfera', label: '🌐 Esfera' },
]
const active = ref('generator')

function onComplete(payload) {
  emit('complete', payload)
}
</script>

<style scoped>
.mph-lab { display: grid; gap: 0.85rem; }
.mph-switcher { display: flex; flex-wrap: wrap; gap: 0.4rem; }
</style>
