<template>
  <div class="wind-lab">
    <h4 style="margin: 0 0 0.5rem;">🧭 Rosa dels vents (escolta)</h4>
    <p class="match-hint" style="margin: 0 0 0.65rem;">Fes clic a cada punt cardinal per sentir-ne el nom en veu alta.</p>
    <div class="wind-grid">
      <button
        v-for="d in WIND_ROSE"
        :key="d.id"
        type="button"
        class="btn-tf wind-btn"
        @click="speak(d.speak)"
      >
        {{ d.label }}
      </button>
    </div>

    <h4 style="margin: 1rem 0 0.5rem;">📏 Línies clau</h4>
    <div class="lines-grid">
      <button
        v-for="line in KEY_LINES"
        :key="line.id"
        type="button"
        class="line-btn"
        @click="speak(line.speak)"
      >
        <span>{{ line.label }}</span>
        <span class="line-badge">{{ line.badge }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { KEY_LINES, WIND_ROSE } from '@/modules/projecte/coordenadasData.js'
import { speakText, warmSpeechVoices } from '@/composables/useSpeech.js'

defineProps({ exercise: Object })

onMounted(() => warmSpeechVoices())

function speak(text) {
  speakText(text, { lang: 'ca-ES', rate: 0.92 })
}
</script>

<style scoped>
.wind-lab { display: grid; gap: 0.35rem; }
.wind-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 0.4rem;
}
.wind-btn {
  padding: 0.55rem 0.7rem; border-radius: 10px; border: 1px solid var(--border-color);
  background: var(--bg-card); font-weight: 700; cursor: pointer; text-align: left; color: inherit;
}
.wind-btn:hover { border-color: var(--primary, #2563eb); }
.lines-grid { display: grid; gap: 0.35rem; }
.line-btn {
  display: flex; justify-content: space-between; align-items: center; gap: 0.5rem;
  padding: 0.55rem 0.75rem; border-radius: 10px; border: 1px solid var(--border-color);
  background: var(--bg-card); cursor: pointer; color: inherit; font-weight: 700; text-align: left;
}
.line-badge {
  font-size: 0.75rem; font-weight: 800; padding: 0.15rem 0.45rem; border-radius: 999px;
  background: rgba(37, 99, 235, 0.12); color: #2563eb; white-space: nowrap;
}
</style>
