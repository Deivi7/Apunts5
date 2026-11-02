<template>
  <button type="button" class="mode-pill" :title="title" @click="onClick">
    <span>{{ icon }}</span>
    <span>{{ label }}</span>
  </button>
  <LoginPanel :open="showLogin" @close="showLogin = false" />
</template>

<script setup>
import { computed, ref } from 'vue'
import { useConnectionStore } from '@/stores/connection'
import { useSessionModeStore } from '@/stores/sessionMode'
import { useAuthStore } from '@/stores/auth'
import LoginPanel from './LoginPanel.vue'

const connection = useConnectionStore()
const sessionMode = useSessionModeStore()
const auth = useAuthStore()
const showLogin = ref(false)

const label = computed(() => {
  if (connection.status === 'checking') return 'Comprobando…'
  if (sessionMode.isLocal) return 'Modo local'
  if (auth.user) return auth.user.displayName || 'Online'
  return 'Modo online'
})

const icon = computed(() => {
  if (connection.status === 'checking') return '⏳'
  if (sessionMode.isLocal) return '📴'
  return '☁️'
})

const title = computed(() =>
  sessionMode.isLocal
    ? 'Clic para pasar a online (login)'
    : 'Clic para volver a modo local',
)

function onClick() {
  if (sessionMode.isLocal) {
    if (!connection.isOnline) {
      connection.checkHealth()
      return
    }
    if (!auth.isAuthenticated) {
      showLogin.value = true
      return
    }
    sessionMode.setOnline()
  } else {
    auth.logout()
  }
}
</script>
