<template>
  <div class="space-terminal-mockup" style="border: 1px solid var(--border-color); border-radius: var(--radius-lg); overflow: hidden; background: #0f172a; color: #e2e8f0;">
    <div class="terminal-header" style="display: flex; justify-content: space-between; align-items: center; padding: 0.65rem 1rem; background: #1e293b; border-bottom: 1px solid #334155;">
      <div style="font-weight: 800; font-size: 0.9rem;">
        🛰️ TERMINAL DE ASTRONÁUTICA — ESTACIÓN ESPACIAL ALFA-9
      </div>
      <div style="display: flex; gap: 0.35rem;">
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;" />
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #eab308;" />
        <span style="width: 10px; height: 10px; border-radius: 50%; background: #22c55e;" />
      </div>
    </div>

    <div style="padding: 1rem;">
      <div style="background: rgba(15, 23, 42, 0.85); border: 1px solid #475569; border-radius: var(--radius-md); padding: 0.75rem; margin-bottom: 0.85rem; font-size: 0.88rem; line-height: 1.45;">
        <strong>Instrucciones oficiales de la misión:</strong><br>
        Imagina que eres un/a científico/a en una estación espacial. Escribe un informe de
        <strong>5 a 6 líneas</strong> explicando qué ha ocurrido hoy con los ordenadores o los instrumentos del laboratorio.<br>
        💡 <strong>Requisito:</strong> incluye al menos <strong>2 tecnicismos</strong>
        (procesador, software, microchip, algoritmo, batería, órbita, telemetría, circuito…).
      </div>

      <textarea
        v-model="text"
        class="input-hub"
        rows="9"
        placeholder="[Registro estelar]
Hoy a las 08:00 detectamos una anomalía en el laboratorio principal…"
        style="width: 100%; resize: vertical; font-family: ui-monospace, monospace; background: #020617; color: #e2e8f0; border-color: #475569;"
        @input="sync"
      />

      <div style="margin-top: 0.75rem; font-size: 0.82rem;">
        <span style="color: #94a3b8;">Tecnicismos detectados:</span>
        <span v-if="!found.length" style="color: #64748b; font-size: 0.8rem; margin-left: 0.35rem;">
          (escribe palabras como procesador, software, microchip…)
        </span>
        <span v-for="t in found" :key="t" style="display: inline-block; margin: 0.25rem 0.25rem 0 0; padding: 0.15rem 0.45rem; border-radius: 999px; background: rgba(34, 197, 94, 0.2); color: #86efac; font-size: 0.78rem;">
          ✓ {{ t }}
        </span>
      </div>

      <button type="button" class="ex-btn ex-btn-primary" style="margin-top: 0.85rem;" @click="send">
        📡 Enviar informe científico
      </button>
      <p v-if="feedback" class="match-hint" :class="ok ? 'feedback-ok' : 'feedback-bad'" style="margin-top: 0.65rem;">
        {{ feedback }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { VALID_TECNICISMOS } from '@/modules/castellano/tema2Data.js'

const props = defineProps({ exercise: Object })
const emit = defineEmits(['complete', 'update:modelValue'])

const minChars = computed(() => props.exercise?.content?.minChars ?? 80)
const minLines = computed(() => props.exercise?.content?.minLines ?? 3)
const minTec = computed(() => props.exercise?.content?.minTecnicismos ?? 2)
const tecList = computed(() => props.exercise?.content?.tecnicismos || VALID_TECNICISMOS)

const text = ref('')
const feedback = ref('')
const ok = ref(false)

watch(() => props.exercise?.id, () => {
  text.value = ''
  feedback.value = ''
  ok.value = false
})

const found = computed(() => {
  const low = text.value.toLowerCase()
  return tecList.value.filter((t) => low.includes(t.toLowerCase()))
})

function sync() {
  emit('update:modelValue', { text: text.value, tecnicismos: found.value })
}

function send() {
  const raw = text.value.trim()
  sync()
  const lines = raw.split('\n').filter((l) => l.trim().length > 0)

  if (raw.length < minChars.value || lines.length < minLines.value) {
    ok.value = false
    feedback.value = '⚠️ El informe es demasiado corto. Escribe al menos 4-5 líneas explicando qué ha ocurrido en la estación.'
    return
  }

  if (found.value.length < minTec.value) {
    ok.value = false
    feedback.value = `⚠️ Has utilizado ${found.value.length} tecnicismo(s). Debes incluir al menos ${minTec.value} (procesador, software, microchip, algoritmo, batería…).`
    return
  }

  ok.value = true
  feedback.value = `🛰️ ¡Informe transmitido con éxito! ${found.value.length} tecnicismo(s) detectados.`
  const max = props.exercise?.maxScore || 25
  emit('complete', {
    text: raw,
    tecnicismos: found.value,
    _grade: {
      score: max,
      maxScore: max,
      feedback: 'Informe espacial válido',
    },
  })
}
</script>
