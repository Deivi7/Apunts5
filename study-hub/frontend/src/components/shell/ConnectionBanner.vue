<template>
  <div v-if="visible" class="connection-banner" :class="bannerClass">
    <div class="connection-banner-inner">
      <div>
        <strong>{{ title }}</strong>
        <p>{{ message }}</p>
      </div>
      <div class="connection-banner-actions">
        <button
          v-if="connection.offerLocalContinue"
          type="button"
          class="btn-check-answer"
          @click="connection.acceptLocalContinue()"
        >
          Continuar en modo local
        </button>
        <button type="button" class="btn-secondary-quiet" @click="connection.checkHealth()">
          Reintentar
        </button>
        <button
          v-if="connection.offerLocalContinue"
          type="button"
          class="btn-secondary-quiet"
          @click="connection.dismissLocalOffer()"
        >
          Cerrar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useConnectionStore } from '@/stores/connection'
import { useSessionModeStore } from '@/stores/sessionMode'

const connection = useConnectionStore()
const sessionMode = useSessionModeStore()

const visible = computed(
  () => connection.offerLocalContinue || (connection.isOffline && sessionMode.isOnline),
)

const bannerClass = computed(() =>
  connection.offerLocalContinue ? 'connection-banner--warn' : 'connection-banner--info',
)

const title = computed(() =>
  connection.offerLocalContinue
    ? 'Modo online no disponible'
    : 'Sin conexión con el backend',
)

const message = computed(() =>
  connection.offerLocalContinue
    ? 'Los resultados de esta sesión online no se han guardado como oficiales. Puedes seguir estudiando en modo local (sin guardar notas).'
    : 'El backend no responde. El contenido ya cargado sigue disponible.',
)
</script>
